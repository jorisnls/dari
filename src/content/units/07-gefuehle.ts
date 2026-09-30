import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit07: Unit = {
  id: 'u07',
  num: 7,
  title: 'Gefühle & Komplimente',
  emoji: '💚',
  description: 'Sagen, wie es dir geht – und anderen etwas Schönes sagen.',
  lessons: [
    {
      id: 'u07-l1',
      title: 'Wie fühlst du dich?',
      phrases: [
        p('khoshāl astum', 'خوشحال استم', 'Ich bin froh / glücklich'),
        p('khafa astum', 'خفه استم', 'Ich bin traurig / verstimmt'),
        p('manda astum', 'مانده استم', 'Ich bin müde'),
        p('mariz astum', 'مریض استم', 'Ich bin krank'),
        p('parēshān astum', 'پریشان استم', 'Ich mache mir Sorgen'),
        p('chi shoda?', 'چی شده؟', 'Was ist los? / Was ist passiert?'),
        p('hēch gap nēs', 'هیچ گپ نیست', 'Nichts, alles okay'),
        p('khodā nakuna', 'خدا نکنه', 'Gott bewahre!'),
        p('jōr shawēn', 'جور شوین', 'Gute Besserung (wörtl. werden Sie gesund)'),
        p('afsōs', 'افسوس', 'Wie schade'),
      ],
      grammar: {
        title: 'Nein sagen: nēs und na-',
        body: [
          '„Ist nicht“ heißt in Kabul **nēs** (geschrieben nist): khub **nēs** – ist nicht gut.',
          'Für „ich bin nicht“ hängst du die Endungen an: man manda **nēstum** (ich bin nicht müde), tu **nēsti**, shumā **nēstēn**.',
          'Andere Verben verneinst du mit **na-** am Anfang: dārum → **na**dārum, mērum → **na**mērum.',
        ],
        examples: [
          ['man mariz nēstum', 'Ich bin nicht krank'],
          ['khafa nēstum, manda astum', 'Ich bin nicht traurig, nur müde'],
        ],
      },
    },
    {
      id: 'u07-l2',
      title: 'Komplimente',
      phrases: [
        p('khēli khub', 'خیلی خوب', 'Sehr gut'),
        p('khēli qashang', 'خیلی قشنگ', 'Sehr schön'),
        p('māshallāh', 'ماشاءالله', 'Wie schön! (wörtl. was Gott gewollt hat)', 'Sag es immer, wenn du Kinder, ein Haus oder Erfolge lobst. Es schützt vor dem bösen Blick.'),
        p('shumā khēli mehrabān astēn', 'شما خیلی مهربان استین', 'Sie sind sehr freundlich'),
        p('dukhtar-e shumā khēli mehrabān as', 'دختر شما خیلی مهربان است', 'Ihre Tochter ist sehr liebevoll'),
        p('fāmil-e shumā ra khēli dōst dārum', 'فامیل شما را خیلی دوست دارم', 'Ich mag Ihre Familie sehr'),
        p('lebās-etān khēli qashang as', 'لباس‌تان خیلی قشنگ است', 'Ihre Kleidung ist sehr schön'),
        p('shumā hēch taghyir nakardēn', 'شما هیچ تغییر نکردین', 'Sie haben sich gar nicht verändert'),
        p('lutf-e shumā as', 'لطف شما است', 'Das ist lieb von Ihnen (Antwort auf ein Kompliment)'),
      ],
      culture: {
        title: 'Loben mit Gott im Satz',
        body: [
          'Viele Afghanen glauben an den **bösen Blick** (nazar): Zu viel Lob, vor allem für Kinder oder Schönheit, kann Unglück bringen. Deshalb gehört zu jedem Kompliment ein **māshallāh**.',
          'Wenn dich jemand lobt, weise das Lob bescheiden zurück: **lutf-e shumā as** (das ist Ihre Güte). Das kommt besser an als ein einfaches „Danke“.',
        ],
      },
    },
    {
      id: 'u07-l3',
      title: 'Gern haben & vermissen',
      phrases: [
        p('dōst dārum', 'دوست دارم', 'Ich mag / ich liebe'),
        p('ēn ra dōst dārum', 'این را دوست دارم', 'Das mag ich'),
        p('khosh-em mēya', 'خوشم میایه', 'Das gefällt mir'),
        p('khosh-em namēya', 'خوشم نمیایه', 'Das gefällt mir nicht'),
        p('dil-em barāyet tang shoda', 'دلم برایت تنگ شده', 'Ich vermisse dich'),
        p('dil-em barāyetān tang shoda', 'دلم برای‌تان تنگ شده', 'Ich habe Sie vermisst'),
        p('jān-em', 'جانم', 'Mein Schatz / Liebes (wörtl. meine Seele)'),
        p('omēdwār astum', 'امیدوار استم', 'Ich hoffe es'),
        p('ma‘lum as', 'معلوم است', 'Na klar / natürlich'),
      ],
      dialog: {
        title: 'Die Oma am Telefon',
        setting: 'Die Großmutter deiner Freundin (bibi) ist am Telefon und möchte kurz mit dir sprechen.',
        lines: [
          you('salām, bibi-jān. chetor astēn?', 'سلام، بی‌بی جان. چطور استین؟', 'Hallo, liebe Oma. Wie geht es Ihnen?'),
          say('Bibi', 'shukr, bachēm. tu chetor asti?', 'شکر، بچیم. تو چطور استی؟', 'Gott sei Dank, mein Junge. Wie geht es dir?'),
          you('khub astum. dil-em barāyetān tang shoda', 'خوب استم. دلم برای‌تان تنگ شده', 'Mir geht’s gut. Ich habe Sie vermisst.'),
          say('Bibi', 'qurbānet shawum! māshallāh, Dari yād gerefti!', 'قربانت شوم! ماشاءالله، دری یاد گرفتی!', 'Ach, du Lieber! Māshallāh, du hast Dari gelernt!'),
          you('lutf-e shumā as', 'لطف شما است', 'Das ist lieb von Ihnen'),
        ],
      },
    },
  ],
}
