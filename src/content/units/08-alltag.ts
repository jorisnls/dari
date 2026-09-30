import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit08: Unit = {
  id: 'u08',
  num: 8,
  title: 'Alltag & Tagesablauf',
  emoji: '☀️',
  description: 'Was du jeden Tag machst – die Gegenwartsform.',
  lessons: [
    {
      id: 'u08-l1',
      title: 'Wichtige Verben',
      phrases: [
        p('mērum', 'میرم', 'Ich gehe'),
        p('mēyāyum', 'میایم', 'Ich komme'),
        p('mēkhorum', 'میخورم', 'Ich esse / trinke'),
        p('mēkunum', 'میکنم', 'Ich mache'),
        p('mēbinum', 'میبینم', 'Ich sehe'),
        p('mēgum', 'میگم', 'Ich sage'),
        p('mēkhāyum', 'میخواهم', 'Ich will / möchte'),
        p('kār mēkunum', 'کار میکنم', 'Ich arbeite'),
        p('mēkhābum', 'میخوابم', 'Ich schlafe'),
        p('mēfāmum', 'میفامم', 'Ich verstehe / weiß'),
      ],
      grammar: {
        title: 'Gegenwart: mē- + Stamm + Endung',
        body: [
          'Fast jedes Verb in der Gegenwart ist so gebaut: **mē-** + Präsensstamm + **Personalendung**.',
          'Die Endungen kennst du schon von „sein“: **-um, -i, -a, -ēm, -ēn, -an**.',
          'Die Gegenwart drückt in Dari auch die **Zukunft** aus: fardā mērum = ich gehe morgen / werde morgen gehen.',
        ],
        table: [
          ['Person', 'gehen (r)', 'machen (kun)'],
          ['man', 'mērum', 'mēkunum'],
          ['tu', 'mēri', 'mēkuni'],
          ['ō', 'mēra', 'mēkuna'],
          ['mā', 'mērēm', 'mēkunēm'],
          ['shumā', 'mērēn', 'mēkunēn'],
          ['ōnā', 'mēran', 'mēkunan'],
        ],
      },
    },
    {
      id: 'u08-l2',
      title: 'Mein Tag',
      phrases: [
        p('sob', 'صبح', 'Morgen (Tageszeit)'),
        p('chāsht', 'چاشت', 'Mittag'),
        p('shām', 'شام', 'Abend / Abendessen'),
        p('shab', 'شب', 'Nacht'),
        p('har rōz', 'هر روز', 'jeden Tag'),
        p('sob sā‘at haft bēdār mēshum', 'صبح ساعت هفت بیدار میشم', 'Morgens um sieben wache ich auf'),
        p('ba kār mērum', 'به کار میرم', 'Ich gehe zur Arbeit'),
        p('shām khāna mēyāyum', 'شام خانه میایم', 'Abends komme ich nach Hause'),
        p('nān-e chāsht mēkhorum', 'نان چاشت میخورم', 'Ich esse zu Mittag'),
        p('shab-hā dēr mēkhābum', 'شب‌ها دیر میخوابم', 'Abends gehe ich spät schlafen'),
      ],
    },
    {
      id: 'u08-l3',
      title: 'Was machst du gerade?',
      phrases: [
        p('chi kār mēkuni?', 'چی کار میکنی؟', 'Was machst du (gerade)?'),
        p('chi kār mēkunēn?', 'چی کار میکنین؟', 'Was machen Sie (gerade)?'),
        p('hēch, dar khāna astum', 'هیچ، در خانه استم', 'Nichts, ich bin zu Hause'),
        p('kujā mēri?', 'کجا میری؟', 'Wohin gehst du?'),
        p('ba bāzār mērum', 'به بازار میرم', 'Ich gehe einkaufen (wörtl. zum Markt)'),
        p('pukht-o-paz mēkunum', 'پخت و پز میکنم', 'Ich koche gerade'),
        p('kitāb mēkhānum', 'کتاب میخوانم', 'Ich lese ein Buch'),
        p('mashghul astum', 'مشغول استم', 'Ich bin beschäftigt'),
        p('waqt dāri?', 'وقت داری؟', 'Hast du Zeit?'),
      ],
      dialog: {
        title: 'Anruf von der Schwester deiner Freundin',
        setting: 'Die jüngere Schwester deiner Freundin ruft an. Mit ihr darfst du „tu“ sagen.',
        lines: [
          say('Schwester', 'salām! chi kār mēkuni?', 'سلام! چی کار میکنی؟', 'Hallo! Was machst du gerade?'),
          you('salām! pukht-o-paz mēkunum', 'سلام! پخت و پز میکنم', 'Hallo! Ich koche gerade.'),
          say('Schwester', 'wāh! chi mēpazi?', 'واه! چی میپزی؟', 'Wow! Was kochst du?'),
          you('qābili palaw', 'قابلی پلو', 'Qabuli Palau'),
          say('Schwester', 'āfarin! shām waqt dāri?', 'آفرین! شام وقت داری؟', 'Super! Hast du heute Abend Zeit?'),
          you('bale, shām khāna astum', 'بلی، شام خانه استم', 'Ja, abends bin ich zu Hause'),
        ],
      },
    },
  ],
}
