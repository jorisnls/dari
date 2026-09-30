import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit04: Unit = {
  id: 'u04',
  num: 4,
  title: 'Zahlen, Alter & Zeit',
  emoji: '🔢',
  description: 'Zählen, sagen wie alt du bist, Uhrzeit und Wochentage.',
  lessons: [
    {
      id: 'u04-l1',
      title: 'Eins bis zehn',
      phrases: [
        p('yak', 'یک', '1 – eins'),
        p('du', 'دو', '2 – zwei'),
        p('sē', 'سه', '3 – drei'),
        p('chār', 'چار', '4 – vier'),
        p('panj', 'پنج', '5 – fünf'),
        p('shash', 'شش', '6 – sechs'),
        p('haft', 'هفت', '7 – sieben'),
        p('hasht', 'هشت', '8 – acht'),
        p('nō', 'نه', '9 – neun'),
        p('dah', 'ده', '10 – zehn'),
      ],
      grammar: {
        title: 'Zahlen + Nomen: kein Plural!',
        body: [
          'Nach einer Zahl bleibt das Nomen in der **Einzahl**: du khwār (zwei Schwestern), sē bacha (drei Kinder).',
          'Beim Zählen von Dingen schiebt man oft **tā** dazwischen: du-**tā** chāy (zwei Tees), sē-**tā** nān (drei Brote). Das ist sehr umgangssprachlich und typisch Kabul.',
        ],
        examples: [
          ['du-tā chāy lutfan', 'Zwei Tee, bitte'],
          ['man sē barādar dārum', 'Ich habe drei Brüder'],
        ],
      },
    },
    {
      id: 'u04-l2',
      title: 'Größere Zahlen & Alter',
      phrases: [
        p('yāzdah', 'یازده', '11 – elf'),
        p('dawāzdah', 'دوازده', '12 – zwölf'),
        p('pānzdah', 'پانزده', '15 – fünfzehn'),
        p('bist', 'بیست', '20 – zwanzig'),
        p('bist-o-yak', 'بیست و یک', '21 – einundzwanzig', 'Wie im Deutschen verbunden, aber Zehner zuerst: zwanzig-und-eins.'),
        p('sī', 'سی', '30 – dreißig'),
        p('chil', 'چهل', '40 – vierzig'),
        p('panjā', 'پنجاه', '50 – fünfzig'),
        p('sad', 'صد', '100 – hundert'),
        p('hazār', 'هزار', '1000 – tausend'),
        p('chand sāla astēn?', 'چند ساله استین؟', 'Wie alt sind Sie?'),
        p('man bist-o-hasht sāla astum', 'من بیست و هشت ساله استم', 'Ich bin 28 Jahre alt', 'Setz dein eigenes Alter ein!'),
      ],
      culture: {
        title: 'Nach dem Alter fragen ist normal',
        body: [
          'In afghanischen Familien ist die Frage nach dem Alter **nicht unhöflich**, im Gegenteil: Das Alter bestimmt, wer wem Respekt schuldet.',
          'Rechne auch mit Fragen wie „Was verdienst du?“ oder „Wann heiratet ihr?“. Das ist Interesse, keine Aufdringlichkeit. Du darfst ausweichend und mit Humor antworten: **inshallāh, ba zudi** (so Gott will, bald).',
        ],
      },
    },
    {
      id: 'u04-l3',
      title: 'Uhrzeit & Tage',
      phrases: [
        p('sā‘at chand as?', 'ساعت چند است؟', 'Wie spät ist es?'),
        p('sā‘at sē as', 'ساعت سه است', 'Es ist drei Uhr'),
        p('sā‘at chār-o-nim', 'ساعت چار و نیم', 'Halb fünf (vier und halb)'),
        p('imrōz', 'امروز', 'heute'),
        p('fardā', 'فردا', 'morgen'),
        p('dirōz', 'دیروز', 'gestern'),
        p('hafta', 'هفته', 'Woche'),
        p('juma', 'جمعه', 'Freitag – der freie Tag', 'In Afghanistan ist Freitag der Wochenend- und Familientag.'),
        p('shamba', 'شنبه', 'Samstag – erster Arbeitstag der Woche'),
        p('yakshamba', 'یکشنبه', 'Sonntag'),
        p('alān', 'الان', 'jetzt'),
        p('ba‘dan', 'بعداً', 'später'),
      ],
      grammar: {
        title: 'Die Wochentage zählen ab Samstag',
        body: [
          'Die Woche beginnt mit **shamba** (Samstag). Danach wird einfach durchgezählt: **yak**shamba (1 nach Samstag = Sonntag), **du**shamba (Montag), **sē**shamba (Dienstag), **chār**shamba (Mittwoch), **panj**shamba (Donnerstag).',
          'Freitag hat einen eigenen Namen: **juma**, der Tag des Freitagsgebets.',
        ],
        table: [
          ['Tag', 'Dari'],
          ['Samstag', 'shamba'],
          ['Sonntag', 'yakshamba'],
          ['Montag', 'dushamba'],
          ['Dienstag', 'sēshamba'],
          ['Mittwoch', 'chārshamba'],
          ['Donnerstag', 'panjshamba'],
          ['Freitag', 'juma'],
        ],
      },
      dialog: {
        title: 'Wann kommst du?',
        setting: 'Die Mutter deiner Freundin fragt am Telefon, wann du zum Essen kommst.',
        lines: [
          say('Mutter', 'fardā mēyāyi?', 'فردا میایی؟', 'Kommst du morgen?'),
          you('bale, fardā mēyāyum', 'بلی، فردا میایم', 'Ja, ich komme morgen'),
          say('Mutter', 'sā‘at chand?', 'ساعت چند؟', 'Um wie viel Uhr?'),
          you('sā‘at sē', 'ساعت سه', 'Um drei Uhr'),
          say('Mutter', 'khub as. khosh āmadi!', 'خوب است. خوش آمدی!', 'Gut. Du bist herzlich willkommen!'),
          you('tashakor, khāla-jān', 'تشکر، خاله جان', 'Danke, Tantchen'),
        ],
      },
    },
  ],
}
