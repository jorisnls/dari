import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit14: Unit = {
  id: 'u14',
  num: 14,
  title: 'Smalltalk',
  emoji: '💬',
  description: 'Arbeit, Wetter, Hobbys – worüber man beim Tee so redet.',
  lessons: [
    {
      id: 'u14-l1',
      title: 'Arbeit & Studium',
      phrases: [
        p('kār-e shumā chi as?', 'کار شما چی است؟', 'Was arbeiten Sie?'),
        p('kār-et chi as?', 'کارت چی است؟', 'Was arbeitest du?'),
        p('man muhandis astum', 'من مهندس استم', 'Ich bin Ingenieur'),
        p('man dāneshjō astum', 'من دانشجو استم', 'Ich bin Student'),
        p('man dar yak shirkat kār mēkunum', 'من در یک شرکت کار میکنم', 'Ich arbeite in einer Firma'),
        p('dāktar', 'داکتر', 'Arzt / Ärztin'),
        p('mu‘allim', 'معلم', 'Lehrer(in)'),
        p('kār-e man ra dōst dārum', 'کار من را دوست دارم', 'Ich mag meine Arbeit'),
        p('kār-e ziyād dārum', 'کار زیاد دارم', 'Ich habe viel Arbeit'),
      ],
    },
    {
      id: 'u14-l2',
      title: 'Das Wetter',
      phrases: [
        p('hawā', 'هوا', 'Wetter / Luft'),
        p('hawā khub as', 'هوا خوب است', 'Das Wetter ist schön'),
        p('hawā sard as', 'هوا سرد است', 'Es ist kalt'),
        p('hawā garm as', 'هوا گرم است', 'Es ist warm / heiß'),
        p('bārān mēbāra', 'باران میباره', 'Es regnet'),
        p('barf mēbāra', 'برف میباره', 'Es schneit'),
        p('āftāb', 'آفتاب', 'Sonne / Sonnenschein'),
        p('dar Almān hawā khēli sard as', 'در آلمان هوا خیلی سرد است', 'In Deutschland ist es sehr kalt', 'Ein garantierter Gesprächsstarter mit afghanischen Verwandten 😄'),
      ],
    },
    {
      id: 'u14-l3',
      title: 'Hobbys & Freizeit',
      phrases: [
        p('dar waqt-e fārigh chi mēkunēn?', 'در وقت فارغ چی میکنین؟', 'Was machen Sie in Ihrer Freizeit?'),
        p('fūtbāl bāzi mēkunum', 'فوتبال بازی میکنم', 'Ich spiele Fußball'),
        p('kriket', 'کرکت', 'Cricket', 'Afghanistans Lieblingssport! Frag nach der Nationalmannschaft und du hast ein Gesprächsthema für Stunden.'),
        p('musiqi gōsh mēkunum', 'موسیقی گوش میکنم', 'Ich höre Musik'),
        p('ashpazi ra dōst dārum', 'آشپزی را دوست دارم', 'Ich koche gern'),
        p('sayl', 'سیل', 'Ausflug ins Grüne / Picknick'),
        p('safar', 'سفر', 'Reise'),
        p('shumā chi dōst dārēn?', 'شما چی دوست دارین؟', 'Was mögen Sie gern?'),
      ],
      culture: {
        title: 'Worüber man gern redet – und worüber lieber nicht',
        body: [
          'Gute Themen: **Essen, Familie, Kinder, Cricket, Wetter, Erinnerungen an früher** und dein Dari-Lernen. Das bringt alle zum Lachen.',
          'Vorsichtig sein bei: **Politik, Religion, Krieg und Flucht**. Viele Familien haben Schweres erlebt. Lass die Älteren entscheiden, ob sie darüber reden wollen, und hör dann einfach zu.',
          'Wenn du nicht weiterweißt: **qissa kunēn** (erzählen Sie!) und ein ehrliches **khēli jālib as** (sehr interessant) halten jedes Gespräch am Laufen.',
        ],
      },
      dialog: {
        title: 'Beim Tee mit dem Onkel',
        setting: 'Der Onkel (māmā) deiner Freundin setzt sich zu dir. Er spricht gern über Sport.',
        lines: [
          say('Māmā', 'kār-et chi as, bachēm?', 'کارت چی است، بچیم؟', 'Was arbeitest du, mein Junge?'),
          you('man dar yak shirkat kār mēkunum', 'من در یک شرکت کار میکنم', 'Ich arbeite in einer Firma'),
          say('Māmā', 'khub as. dar waqt-e fārigh chi mēkuni?', 'خوب است. در وقت فارغ چی میکنی؟', 'Gut. Was machst du in deiner Freizeit?'),
          you('fūtbāl bāzi mēkunum', 'فوتبال بازی میکنم', 'Ich spiele Fußball'),
          say('Māmā', 'kriket ra mēfāmi?', 'کرکت را میفامی؟', 'Kennst du dich mit Cricket aus?'),
          you('nē, lutfan qissa kunēn!', 'نی، لطفاً قصه کنین!', 'Nein, erzählen Sie bitte!'),
          say('Māmā', 'hā, gōsh kō…', 'ها، گوش کو…', 'Ha, also hör zu …'),
        ],
      },
    },
  ],
}
