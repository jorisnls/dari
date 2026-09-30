import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit10: Unit = {
  id: 'u10',
  num: 10,
  title: 'Vergangenheit erzählen',
  emoji: '📖',
  description: 'Was du gestern gemacht hast – die Vergangenheitsform.',
  lessons: [
    {
      id: 'u10-l1',
      title: 'Ich ging, ich aß, ich sah',
      phrases: [
        p('raftum', 'رفتم', 'Ich ging / bin gegangen'),
        p('āmadum', 'آمدم', 'Ich kam / bin gekommen'),
        p('khordum', 'خوردم', 'Ich aß / habe gegessen'),
        p('kardum', 'کردم', 'Ich machte / habe gemacht'),
        p('dēdum', 'دیدم', 'Ich sah / habe gesehen'),
        p('guftum', 'گفتم', 'Ich sagte / habe gesagt'),
        p('budum', 'بودم', 'Ich war'),
        p('naraftum', 'نرفتم', 'Ich ging nicht / bin nicht gegangen'),
        p('yād-em raft', 'یادم رفت', 'Ich habe es vergessen'),
        p('fahmēdi?', 'فهمیدی؟', 'Hast du verstanden?'),
      ],
      grammar: {
        title: 'Vergangenheit: Stamm + Endung (ohne mē-)',
        body: [
          'Die Vergangenheit ist einfacher als die Gegenwart: **Vergangenheitsstamm + Endung**, ohne mē-.',
          'Die Endungen sind fast gleich, nur in der 3. Person Einzahl gibt es **keine Endung**: ō raft (er/sie ging).',
          'Den Vergangenheitsstamm lernst du am besten mit dem Infinitiv: raft**an** (gehen) → **raft**, khord**an** (essen) → **khord**.',
        ],
        table: [
          ['Person', 'gehen (raft)', 'essen (khord)'],
          ['man', 'raftum', 'khordum'],
          ['tu', 'rafti', 'khordi'],
          ['ō', 'raft', 'khord'],
          ['mā', 'raftēm', 'khordēm'],
          ['shumā', 'raftēn', 'khordēn'],
          ['ōnā', 'raftan', 'khordan'],
        ],
      },
    },
    {
      id: 'u10-l2',
      title: 'Gestern & früher',
      phrases: [
        p('dirōz ba bāzār raftum', 'دیروز به بازار رفتم', 'Gestern war ich einkaufen'),
        p('dirōz chi kardi?', 'دیروز چی کردی؟', 'Was hast du gestern gemacht?'),
        p('hafta-ye gozashta', 'هفتهٔ گذشته', 'letzte Woche'),
        p('pārsāl', 'پارسال', 'letztes Jahr'),
        p('chand sāl pēsh', 'چند سال پیش', 'vor ein paar Jahren'),
        p('pēsh az ēn', 'پیش از این', 'früher / davor'),
        p('yak film dēdum', 'یک فلم دیدم', 'Ich habe einen Film gesehen'),
        p('khēli khosh gozasht', 'خیلی خوش گذشت', 'Es war sehr schön (wörtl. es verging angenehm)'),
        p('kay ba Almān āmadēn?', 'کی به آلمان آمدین؟', 'Wann sind Sie nach Deutschland gekommen?'),
        p('dar Kābul budēn?', 'در کابل بودین؟', 'Waren Sie in Kabul?'),
      ],
    },
    {
      id: 'u10-l3',
      title: 'Vom Wochenende erzählen',
      phrases: [
        p('ākhir-e hafta chi kardēn?', 'آخر هفته چی کردین؟', 'Was haben Sie am Wochenende gemacht?'),
        p('ba sayl raftēm', 'به سیل رفتیم', 'Wir waren draußen (Ausflug/Picknick)', 'sayl = Ausflug ins Grüne, ein afghanisches Lieblingshobby.'),
        p('dōst-hā-yem ra dēdum', 'دوست‌هایم را دیدم', 'Ich habe meine Freunde getroffen'),
        p('dar khāna budum', 'در خانه بودم', 'Ich war zu Hause'),
        p('kami kār kardum', 'کمی کار کردم', 'Ich habe ein bisschen gearbeitet'),
        p('khub khābēdum', 'خوب خوابیدم', 'Ich habe gut geschlafen'),
      ],
      dialog: {
        title: 'Montagmorgen mit deiner Freundin',
        setting: 'Deine Freundin ruft an. Sie will auf Dari wissen, wie dein Wochenende war.',
        lines: [
          say('Freundin', 'ākhir-e hafta chi kardi?', 'آخر هفته چی کردی؟', 'Was hast du am Wochenende gemacht?'),
          you('dōst-hā-yem ra dēdum', 'دوست‌هایم را دیدم', 'Ich habe meine Freunde getroffen'),
          say('Freundin', 'kujā raftēn?', 'کجا رفتین؟', 'Wo wart ihr?'),
          you('ba sayl raftēm', 'به سیل رفتیم', 'Wir haben einen Ausflug gemacht'),
          say('Freundin', 'khosh gozasht?', 'خوش گذشت؟', 'War es schön?'),
          you('khēli khosh gozasht', 'خیلی خوش گذشت', 'Es war sehr schön'),
          say('Freundin', 'āfarin! Dari-yet khēli khub shoda', 'آفرین! دری‌ات خیلی خوب شده', 'Bravo! Dein Dari ist richtig gut geworden.'),
        ],
      },
    },
  ],
}
