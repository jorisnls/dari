import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit09: Unit = {
  id: 'u09',
  num: 9,
  title: 'Fragen stellen',
  emoji: '❓',
  description: 'Wer, was, wo, wann, warum – und wie viel?',
  lessons: [
    {
      id: 'u09-l1',
      title: 'Die Fragewörter',
      phrases: [
        p('ki', 'کی', 'wer'),
        p('chi', 'چی', 'was'),
        p('kujā', 'کجا', 'wo / wohin'),
        p('kay', 'کی', 'wann', 'Wird gleich geschrieben wie „ki“ (wer), klingt aber anders.'),
        p('chirā', 'چرا', 'warum'),
        p('chand', 'چند', 'wie viel / wie viele'),
        p('chetor', 'چطور', 'wie'),
        p('kudām', 'کدام', 'welche(r/s)'),
        p('az kujā?', 'از کجا؟', 'woher'),
        p('ba kujā?', 'به کجا؟', 'wohin'),
      ],
      grammar: {
        title: 'Fragen ohne Umstellung',
        body: [
          'Eine Ja/Nein-Frage bildest du nur durch die **Satzmelodie**: Stimme am Ende nach oben. **khub asti.** (Dir geht’s gut.) → **khub asti?** (Geht’s dir gut?)',
          'Das Fragewort steht meistens **dort, wo die Antwort stehen würde**, also oft direkt vor dem Verb: ō **kujā** as? (Wo ist er?) → ō **khāna** as (Er ist zu Hause).',
        ],
        examples: [
          ['ō ki as?', 'Wer ist das?'],
          ['kay mēyāyēn?', 'Wann kommen Sie?'],
          ['chirā khafa asti?', 'Warum bist du traurig?'],
        ],
      },
    },
    {
      id: 'u09-l2',
      title: 'Fragen im Alltag',
      phrases: [
        p('ēn chi as?', 'این چی است؟', 'Was ist das?'),
        p('ō ki as?', 'او کی است؟', 'Wer ist das?'),
        p('tashnāb kujā as?', 'تشناب کجا است؟', 'Wo ist die Toilette / das Bad?'),
        p('kay mēyāyēn?', 'کی میایین؟', 'Wann kommen Sie?'),
        p('chirā nē?', 'چرا نی؟', 'Warum nicht? / Klar, gern!'),
        p('chand as?', 'چند است؟', 'Wie viel kostet das?'),
        p('ēnjā', 'اینجا', 'hier'),
        p('ōnjā', 'اونجا', 'dort'),
        p('mētānum yak sawāl bupursum?', 'میتانم یک سوال بپرسم؟', 'Darf ich etwas fragen?'),
        p('chi gap as?', 'چی گپ است؟', 'Was gibt’s? / Was ist los?'),
      ],
    },
    {
      id: 'u09-l3',
      title: 'Die Familie ausfragen',
      phrases: [
        p('shumā dar kujā kalān shodēn?', 'شما در کجا کلان شدین؟', 'Wo sind Sie aufgewachsen?'),
        p('chand sāl dar Almān astēn?', 'چند سال در آلمان استین؟', 'Wie viele Jahre sind Sie schon in Deutschland?'),
        p('kudām shahr ra dōst dārēn?', 'کدام شهر را دوست دارین؟', 'Welche Stadt mögen Sie?'),
        p('ēn ra chetor mēpazēn?', 'این را چطور میپزین؟', 'Wie kochen Sie das?'),
        p('ma‘nā-ye nām-e shumā chi as?', 'معنای نام شما چی است؟', 'Was bedeutet Ihr Name?'),
        p('qissa kunēn', 'قصه کنین', 'Erzählen Sie (mal)!', 'Afghanische Ältere erzählen gern von früher. Diese Bitte macht sie glücklich.'),
      ],
      dialog: {
        title: 'Mit dem Vater über Kabul',
        setting: 'Nach dem Essen sitzt du mit dem Vater deiner Freundin beim Tee.',
        lines: [
          you('shumā dar kujā kalān shodēn?', 'شما در کجا کلان شدین؟', 'Wo sind Sie aufgewachsen?'),
          say('Vater', 'dar Kābul, dar Kārte Parwān', 'در کابل، در کارته پروان', 'In Kabul, im Viertel Karte Parwan.'),
          you('chand sāl dar Almān astēn?', 'چند سال در آلمان استین؟', 'Wie viele Jahre sind Sie schon in Deutschland?'),
          say('Vater', 'bist sāl mēsha', 'بیست سال میشه', 'Es sind jetzt zwanzig Jahre.'),
          you('qissa kunēn', 'قصه کنین', 'Erzählen Sie mal!'),
          say('Vater', 'Kābul khēli qashang bud…', 'کابل خیلی قشنگ بود…', 'Kabul war sehr schön …'),
        ],
      },
    },
  ],
}
