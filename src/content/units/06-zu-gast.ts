import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit06: Unit = {
  id: 'u06',
  num: 6,
  title: 'Zu Gast sein',
  emoji: '🏠',
  description: 'Ankommen, Geschenke überreichen, sich wohlfühlen und gehen.',
  lessons: [
    {
      id: 'u06-l1',
      title: 'Ankommen',
      phrases: [
        p('befarmāyēn, dākhil shawēn', 'بفرمایین، داخل شوین', 'Bitte, kommen Sie herein'),
        p('khāna-ye khod-etān as', 'خانهٔ خودتان است', 'Fühlen Sie sich wie zu Hause (wörtl. es ist Ihr eigenes Haus)'),
        p('mehmān', 'مهمان', 'Gast'),
        p('khāna', 'خانه', 'Haus / Zuhause'),
        p('kujā beshinum?', 'کجا بشینم؟', 'Wo soll ich mich hinsetzen?'),
        p('ēnjā beshinēn', 'اینجا بشینین', 'Setzen Sie sich hierhin'),
        p('zahmat nakashēn', 'زحمت نکشین', 'Machen Sie sich keine Umstände'),
        p('bebakhshēn ke mazāhim shodum', 'ببخشین که مزاحم شدم', 'Entschuldigen Sie die Störung'),
        p('hēch zahmat nēs', 'هیچ زحمت نیست', 'Das ist überhaupt keine Mühe'),
        p('khāna-ye shumā khēli qashang as', 'خانهٔ شما خیلی قشنگ است', 'Ihr Zuhause ist sehr schön'),
      ],
      culture: {
        title: 'Schuhe, Sitzplatz, rechte Hand',
        body: [
          'Schuhe zieht man **an der Tür aus**. Oft sitzt man auf Sitzkissen (**toshak**) am Boden. Streck die Fußsohlen dabei nicht in Richtung anderer Leute.',
          'Den besten Platz bietet man dem Gast an. Lehn einmal höflich ab (**zahmat nakashēn**) und nimm ihn dann an.',
          'Essen, Tee und Geschenke gibt und nimmt man mit der **rechten Hand**, oder mit beiden Händen als Zeichen besonderen Respekts.',
        ],
      },
    },
    {
      id: 'u06-l2',
      title: 'Geschenke',
      phrases: [
        p('tuhfa', 'تحفه', 'Geschenk'),
        p('ēn barāye shumā as', 'این برای شما است', 'Das ist für Sie'),
        p('qābil-e shumā ra nadāra', 'قابل شما را نداره', 'Es ist nur eine Kleinigkeit (wörtl. es ist Ihrer nicht würdig)', 'Standardsatz beim Überreichen eines Geschenks.'),
        p('chirā zahmat kashēdēn?', 'چرا زحمت کشیدین؟', 'Warum haben Sie sich die Mühe gemacht?', 'Das sagt der Beschenkte, freu dich darüber!'),
        p('gul', 'گل', 'Blume'),
        p('shīrini āwardum', 'شیرینی آوردم', 'Ich habe Süßes mitgebracht'),
        p('khosh-etān bēyāya', 'خوش‌تان بیایه', 'Ich hoffe, es gefällt Ihnen'),
      ],
      dialog: {
        title: 'Mit Gebäck an der Tür',
        setting: 'Der Vater deiner Freundin öffnet die Tür. Du hast eine Schachtel Gebäck dabei.',
        lines: [
          you('salām alaykum', 'سلام علیکم', 'Friede sei mit Ihnen'),
          say('Vater', 'wa alaykum salām! khosh āmadi. befarmā, dākhil shō', 'و علیکم سلام! خوش آمدی. بفرما، داخل شو', 'Willkommen! Bitte, komm herein.'),
          you('ēn barāye shumā as', 'این برای شما است', 'Das ist für Sie'),
          say('Vater', 'wāy, chirā zahmat kashēdi?', 'وای، چرا زحمت کشیدی؟', 'Oh, warum hast du dir die Mühe gemacht?'),
          you('qābil-e shumā ra nadāra', 'قابل شما را نداره', 'Es ist nur eine Kleinigkeit'),
          say('Vater', 'zinda bāshi. khāna-ye khod-et as', 'زنده باشی. خانهٔ خودت است', 'Danke dir. Fühl dich wie zu Hause.'),
        ],
      },
    },
    {
      id: 'u06-l3',
      title: 'Sich verabschieden',
      phrases: [
        p('dēr shod', 'دیر شد', 'Es ist spät geworden'),
        p('man bāyad borum', 'من باید بروم', 'Ich muss gehen'),
        p('hanōz waqt as', 'هنوز وقت است', 'Es ist noch früh (wörtl. es ist noch Zeit)', 'Das sagen Gastgeber immer. Taarof!'),
        p('bāz biyā', 'باز بیا', 'Komm wieder!'),
        p('hatman', 'حتماً', 'Auf jeden Fall / bestimmt'),
        p('az mehmāndāri-ye shumā tashakor', 'از مهمانداری شما تشکر', 'Danke für Ihre Gastfreundschaft'),
        p('shab-e khub bugzarānēn', 'شب خوب بگذرانین', 'Einen schönen Abend noch'),
        p('ba hama salām bugēn', 'به همه سلام بگین', 'Grüßen Sie alle von mir'),
      ],
      grammar: {
        title: 'Müssen: bāyad',
        body: [
          '**bāyad** (müssen) ändert sich nie. Danach kommt das Verb in der **be-Form** (Konjunktiv): bāyad **bo**rum (ich muss gehen).',
          'Die be-Form bildest du, indem du **mē-** durch **be-** ersetzt: mē-khorum (ich esse) → **be**khorum (dass ich esse). Bei Verben mit o-Laut wird daraus oft **bo-**: mērum (ich gehe) → **bo**rum.',
        ],
        examples: [
          ['man bāyad borum', 'Ich muss gehen'],
          ['bāyad Dari yād begirum', 'Ich muss Dari lernen'],
        ],
      },
    },
  ],
}
