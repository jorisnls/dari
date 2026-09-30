import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit12: Unit = {
  id: 'u12',
  num: 12,
  title: 'Feste & Anlässe',
  emoji: '🎉',
  description: 'Eid, Nowruz, Hochzeit, Geburtstag – und was man bei Trauer sagt.',
  lessons: [
    {
      id: 'u12-l1',
      title: 'Eid & Ramazan',
      phrases: [
        p('Eid mubārak', 'عید مبارک', 'Frohes Eid (Fest)'),
        p('Eid-e shumā mubārak', 'عید شما مبارک', 'Frohes Fest (höflich)'),
        p('Ramazān', 'رمضان', 'Ramadan (Fastenmonat)'),
        p('Ramazān mubārak', 'رمضان مبارک', 'Gesegneten Ramadan'),
        p('rōza', 'روزه', 'das Fasten'),
        p('rōza astēn?', 'روزه استین؟', 'Fasten Sie?'),
        p('iftār', 'افطار', 'Fastenbrechen am Abend'),
        p('Eidi', 'عیدی', 'Eid-Geschenk (meist Geld für Kinder)'),
        p('Eid-e Qurbān', 'عید قربان', 'Opferfest'),
      ],
      culture: {
        title: 'Eid in der Familie',
        body: [
          'An Eid besucht man sich reihum. Zuerst die **Ältesten**. Es gibt Tee, Süßes, Nüsse und getrocknete Früchte.',
          'Kinder bekommen **Eidi**, meist frische Geldscheine. Wenn du Kinder in der Familie hast, bringst du damit viel Freude.',
          'Während Ramazan wird tagsüber nicht gegessen und getrunken. Iss und trink **nicht demonstrativ** vor Fastenden. Eine Einladung zum **iftār** ist eine große Ehre.',
        ],
      },
    },
    {
      id: 'u12-l2',
      title: 'Nowruz, Hochzeit, Geburtstag',
      phrases: [
        p('Nawrōz mubārak', 'نوروز مبارک', 'Frohes Neujahr (Nowruz, 21. März)'),
        p('sāl-e naw mubārak', 'سال نو مبارک', 'Frohes neues Jahr'),
        p('tabrik!', 'تبریک!', 'Glückwunsch!'),
        p('mubārak bāsha', 'مبارک باشه', 'Herzlichen Glückwunsch (z.B. zur Hochzeit, zum Kauf)'),
        p('tawalod-et mubārak', 'تولدت مبارک', 'Alles Gute zum Geburtstag'),
        p('arusi', 'عروسی', 'Hochzeit'),
        p('khoshbakht bāshēn', 'خوشبخت باشین', 'Werdet glücklich! (Wunsch an ein Brautpaar)'),
        p('haft-mēwa', 'هفت میوه', 'Haft Mewa – Nowruz-Getränk aus sieben Trockenfrüchten'),
      ],
    },
    {
      id: 'u12-l3',
      title: 'Religiöse Floskeln & Trauer',
      phrases: [
        p('alhamdulillāh', 'الحمد لله', 'Gott sei Dank / gelobt sei Gott'),
        p('khodā khayr bēta', 'خدا خیر بته', 'Möge Gott es dir vergelten (Dank)'),
        p('khodā hāfiz-etān bāsha', 'خدا حافظ‌تان باشه', 'Gott beschütze Sie'),
        p('khodā bēyāmurza', 'خدا بیامرزه', 'Gott habe ihn/sie selig', 'Sagt man, wenn von Verstorbenen die Rede ist.'),
        p('sar-e shumā salāmat bāsha', 'سر شما سلامت باشه', 'Mein Beileid (wörtl. möge Ihr Kopf gesund bleiben)'),
        p('khodā sabr bēta', 'خدا صبر بته', 'Gott gebe Ihnen Geduld/Kraft'),
        p('khodā ra shukr', 'خدا را شکر', 'Gott sei Dank'),
      ],
      culture: {
        title: 'Gott in fast jedem Satz',
        body: [
          'Religiöse Floskeln sind im Dari **Alltagssprache**, ähnlich wie „Grüß Gott“ oder „Gott sei Dank“ im Deutschen. Du musst nicht religiös sein, um sie zu benutzen. Sie klingen einfach **höflich und warm**.',
          'Bei einem Todesfall besucht man die Familie (**fātiha**). Man sagt wenig: **sar-e shumā salāmat bāsha** und **khodā bēyāmurza** reichen völlig. Lachen und laute Gespräche vermeidet man.',
        ],
      },
      dialog: {
        title: 'Eid-Besuch',
        setting: 'Es ist der erste Tag von Eid. Du besuchst mit deiner Freundin ihre Großeltern.',
        lines: [
          you('Eid-e shumā mubārak', 'عید شما مبارک', 'Frohes Fest'),
          say('Opa', 'Eid-e tu ham mubārak, bachēm!', 'عید تو هم مبارک، بچیم!', 'Dir auch ein frohes Fest, mein Junge!'),
          say('Opa', 'chetor asti? khub asti?', 'چطور استی؟ خوب استی؟', 'Wie geht’s dir? Alles gut?'),
          you('alhamdulillāh, khub astum', 'الحمد لله، خوب استم', 'Gott sei Dank, mir geht es gut'),
          say('Opa', 'befarmā, shīrini bokhor', 'بفرما، شیرینی بخور', 'Bitte, nimm dir Süßes.'),
          you('khodā khayr bēta', 'خدا خیر بته', 'Vergelt’s Gott'),
        ],
      },
    },
  ],
}
