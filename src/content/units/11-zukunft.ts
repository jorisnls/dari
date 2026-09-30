import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit11: Unit = {
  id: 'u11',
  num: 11,
  title: 'Pläne & Wünsche',
  emoji: '🗓️',
  description: 'Wollen, können, müssen und Pläne für die Zukunft.',
  lessons: [
    {
      id: 'u11-l1',
      title: 'Ich möchte …',
      phrases: [
        p('mēkhāyum Dari yād begirum', 'میخواهم دری یاد بگیرم', 'Ich möchte Dari lernen'),
        p('mēkhāyum Kābul ra bebinum', 'میخواهم کابل را ببینم', 'Ich möchte Kabul sehen'),
        p('chi mēkhāyi?', 'چی میخواهی؟', 'Was möchtest du?'),
        p('hēch chiz namēkhāyum', 'هیچ چیز نمیخواهم', 'Ich möchte nichts'),
        p('mētānum', 'میتانم', 'Ich kann'),
        p('namētānum', 'نمیتانم', 'Ich kann nicht'),
        p('mētānum komak kunum?', 'میتانم کمک کنم؟', 'Kann ich helfen?', 'Biete nach dem Essen an, beim Abräumen zu helfen. Das kommt gut an, auch wenn es abgelehnt wird.'),
        p('komak', 'کمک', 'Hilfe'),
      ],
      grammar: {
        title: 'Wollen & können + be-Form',
        body: [
          'Nach **mēkhāyum** (ich will) und **mētānum** (ich kann) kommt das zweite Verb in der **be-Form**, und zwar mit Personalendung: mēkhāyum **bebinum** (ich will, dass ich sehe).',
          'Bei zusammengesetzten Verben wie **yād giriftan** (lernen) oder **komak kardan** (helfen) steht das be- vor dem Verbteil oder fällt weg: yād **be**girum, komak kunum.',
        ],
        examples: [
          ['mēkhāyum borum', 'Ich will gehen'],
          ['mētāni biyāyi?', 'Kannst du kommen?'],
        ],
      },
    },
    {
      id: 'u11-l2',
      title: 'Pläne machen',
      phrases: [
        p('inshallāh', 'ان شاء الله', 'So Gott will', 'Gehört zu jeder Aussage über die Zukunft, auch bei nicht sehr religiösen Menschen.'),
        p('hafta-ye āyanda', 'هفتهٔ آینده', 'nächste Woche'),
        p('sāl-e āyanda', 'سال آینده', 'nächstes Jahr'),
        p('fardā mērum', 'فردا میرم', 'Ich gehe morgen'),
        p('barnāma-ye shumā chi as?', 'برنامهٔ شما چی است؟', 'Was haben Sie vor? (Was ist Ihr Plan?)'),
        p('biyā ke borēm', 'بیا که بریم', 'Komm, lass uns gehen'),
        p('fikr mēkunum', 'فکر میکنم', 'Ich glaube / denke'),
        p('shāyad', 'شاید', 'vielleicht'),
        p('omēd dārum', 'امید دارم', 'Ich hoffe'),
      ],
      dialog: {
        title: 'Pläne für den Sommer',
        setting: 'Die Tante deiner Freundin fragt, was ihr beide im Sommer vorhabt.',
        lines: [
          say('Khāla', 'tābistān barnāma-ye shumā chi as?', 'تابستان برنامهٔ شما چی است؟', 'Was habt ihr im Sommer vor?'),
          you('mēkhāyum Kābul ra bebinum', 'میخواهم کابل را ببینم', 'Ich möchte Kabul sehen'),
          say('Khāla', 'wāh! kay mērēn?', 'واه! کی میرین؟', 'Wow! Wann fahrt ihr?'),
          you('shāyad sāl-e āyanda', 'شاید سال آینده', 'Vielleicht nächstes Jahr'),
          say('Khāla', 'inshallāh!', 'ان شاء الله!', 'So Gott will!'),
          you('inshallāh', 'ان شاء الله', 'So Gott will'),
        ],
      },
    },
    {
      id: 'u11-l3',
      title: 'Lass uns …!',
      phrases: [
        p('biyā chāy bokhorēm', 'بیا چای بخوریم', 'Komm, lass uns Tee trinken'),
        p('bērūn borēm?', 'بیرون بریم؟', 'Wollen wir rausgehen?'),
        p('ēnjā beshin', 'اینجا بشین', 'Setz dich hierhin'),
        p('sabr kō', 'صبر کو', 'Warte mal'),
        p('zud shō', 'زود شو', 'Beeil dich'),
        p('āhesta', 'آهسته', 'langsam'),
        p('bāsha', 'باشه', 'Okay / einverstanden'),
      ],
      grammar: {
        title: 'Befehle & Vorschläge',
        body: [
          'Der **Imperativ** ist die be-Form ohne Endung (du) oder mit **-ēn** (Sie/ihr): **be**shin (setz dich) – **be**shinēn (setzen Sie sich).',
          'Bei **kardan** (machen) und **shodan** (werden) sagt man in Kabul **kō** und **shō**: sabr kō (warte), zud shō (beeil dich).',
          'Vorschläge „lass uns …“ = **biyā ke** + be-Form mit **-ēm**: biyā ke **bo**rēm (lass uns gehen).',
        ],
      },
    },
  ],
}
