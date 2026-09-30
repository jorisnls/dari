// Pronunciation feedback: the learner's take (16 kHz mono WAV, base64) goes to an
// audio-capable OpenAI model together with the target phrase; it returns a JSON verdict.
//
// Secrets: OPENAI_API_KEY (required), FEEDBACK_MODEL (optional, default gpt-audio-mini).
// Deploy:  npx supabase functions deploy pronunciation

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY')
const MODEL = Deno.env.get('FEEDBACK_MODEL') ?? 'gpt-audio-mini'
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

// ~45 s of 16 kHz mono PCM16 as base64. Anything longer is not a single phrase.
const MAX_AUDIO_CHARS = 2_000_000

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const SYSTEM = `Du bist ein geduldiger Aussprache-Coach für Kabuli-Dari (Dari wie in Kabul gesprochen, nicht iranisches Farsi).
Der Lernende ist deutschsprachiger Anfänger und liest nur lateinische Umschrift, keine persische Schrift.

Du bekommst den Zielsatz (Umschrift, persische Schrift, deutsche Bedeutung) und eine Aufnahme des Lernenden.
Höre genau hin und bewerte die Aussprache.

Regeln:
- Kabuli-Aussprache ist richtig, auch wenn sie von Teheran abweicht (z. B. "ē"/"ō" wie in shēr, rōz; "ay" statt "ey").
- Schreibe zuerst ehrlich auf, was du tatsächlich gehört hast. Erfinde nichts. Wenn die Aufnahme leer, zu leise oder ein ganz anderer Satz ist, sag das und gib 1 Stern.
- Tipps konkret und für Deutsche verständlich: Welches Wort, welcher Laut, wie mit dem Mund, Vergleich mit deutschen Lauten (z. B. "kh wie ch in Bach", "q weiter hinten im Hals als k", "gh wie ein geriebenes Zäpfchen-R").
- Höchstens 2 Tipps, nur die wichtigsten. Wenn alles gut war, gib keine Tipps.
- Wörter aus dem Dari immer in Umschrift, nie in persischer Schrift (außer im Feld heardFa).
- Sterne: 5 = klingt wie Muttersprachler, 4 = gut verständlich mit kleinen Fehlern, 3 = verständlich aber deutlich fehlerhaft, 2 = schwer verständlich, 1 = nicht erkennbar.

Antworte NUR mit JSON, ohne Markdown, genau in dieser Form:
{"heardLatin": string, "heardFa": string, "stars": 1-5, "summary": string, "tips": string[]}
"summary" ist ein kurzer, freundlicher Satz auf Deutsch.`

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return json({ error: 'Nur POST' }, 405)
  if (!OPENAI_API_KEY) return json({ error: 'OPENAI_API_KEY fehlt auf dem Server' }, 500)

  // Only signed-in users: the anon key alone must not be able to spend the OpenAI credit.
  const auth = req.headers.get('Authorization') ?? ''
  const user = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers: { Authorization: auth, apikey: SUPABASE_ANON_KEY } })
  if (!user.ok) return json({ error: 'Bitte einloggen' }, 401)

  let body: { audio?: string; latin?: string; fa?: string; de?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'Ungültige Anfrage' }, 400)
  }
  const { audio, latin, fa, de } = body
  if (!audio || !latin || !fa || !de) return json({ error: 'Unvollständige Anfrage' }, 400)
  if (audio.length > MAX_AUDIO_CHARS) return json({ error: 'Aufnahme zu lang' }, 413)
  if (latin.length + fa.length + de.length > 1000) return json({ error: 'Text zu lang' }, 400)

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: MODEL,
      modalities: ['text'],
      messages: [
        { role: 'system', content: SYSTEM },
        {
          role: 'user',
          content: [
            { type: 'text', text: `Zielsatz\nUmschrift: ${latin}\nPersisch: ${fa}\nDeutsch: ${de}\n\nHier ist meine Aufnahme:` },
            { type: 'input_audio', input_audio: { data: audio, format: 'wav' } },
          ],
        },
      ],
    }),
  })
  if (!res.ok) {
    const detail = await res.text()
    console.error('OpenAI error', res.status, detail)
    return json({ error: res.status === 429 ? 'OpenAI-Guthaben aufgebraucht oder Limit erreicht' : 'Feedback-Dienst nicht erreichbar' }, 502)
  }

  const data = await res.json()
  const text: string = data.choices?.[0]?.message?.content ?? ''
  const match = text.match(/\{[\s\S]*\}/)
  try {
    const parsed = JSON.parse(match ? match[0] : text)
    return json({
      heardLatin: String(parsed.heardLatin ?? ''),
      heardFa: String(parsed.heardFa ?? ''),
      stars: Math.min(5, Math.max(1, Math.round(Number(parsed.stars) || 1))),
      summary: String(parsed.summary ?? ''),
      tips: Array.isArray(parsed.tips) ? parsed.tips.slice(0, 3).map(String) : [],
    })
  } catch {
    console.error('Unparseable model output', text)
    return json({ error: 'Antwort nicht lesbar, bitte nochmal versuchen' }, 502)
  }
})
