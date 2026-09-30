import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit01: Unit = {
  id: 'u01',
  num: 1,
  title: 'Begrüßung & Höflichkeit',
  emoji: '👋',
  description: 'Hallo sagen, nach dem Befinden fragen, danke und tschüss.',
  lessons: [
    {
      id: 'u01-l1',
      title: 'Salām!',
      phrases: [
        p('salām', 'سلام', 'Hallo'),
        p('salām alaykum', 'سلام علیکم', 'Friede sei mit dir – die respektvolle Begrüßung', 'Immer richtig, vor allem gegenüber Älteren.'),
        p('wa alaykum salām', 'و علیکم سلام', 'Und mit dir sei Friede – die Antwort'),
        p('chetor asti?', 'چطور استی؟', 'Wie geht’s dir? (du)'),
        p('chetor astēn?', 'چطور استین؟', 'Wie geht es Ihnen? (höflich)', 'Die -ēn-Form benutzt du bei Älteren und bei der Familie deiner Freundin.'),
        p('khub astum', 'خوب استم', 'Mir geht es gut'),
        p('tashakor', 'تشکر', 'Danke'),
        p('shukr', 'شکر', 'Gott sei Dank (mir geht’s gut)', 'Sehr übliche Antwort auf „Wie geht’s?“'),
        p('shumā chetor astēn?', 'شما چطور استین؟', 'Und wie geht es Ihnen?'),
        p('jōr astēn?', 'جور استین؟', 'Sind Sie wohlauf? (gesund)', 'jōr = gesund, heil. Afghanen fragen gern mehrmals nach dem Befinden.'),
        p('jōr astum', 'جور استم', 'Mir geht’s gut, ich bin gesund'),
      ],
      grammar: {
        title: 'Du oder Sie? – tu und shumā',
        body: [
          'Dari unterscheidet wie das Deutsche zwischen **tu** (du) und **shumā** (Sie / ihr).',
          'Bei den Eltern, Tanten, Onkeln und allen Älteren deiner Freundin nimmst du **immer shumā**. Die Verben enden dann auf **-ēn**: chetor ast**ēn**?',
          'Mit Gleichaltrigen und Kindern darfst du **tu** sagen: chetor ast**i**?',
        ],
        table: [
          ['', 'du (tu)', 'Sie (shumā)'],
          ['Wie geht’s?', 'chetor asti?', 'chetor astēn?'],
          ['Bist du gesund?', 'jōr asti?', 'jōr astēn?'],
        ],
      },
      dialog: {
        title: 'Die Mutter deiner Freundin begrüßen',
        setting: 'Du betrittst das Wohnzimmer. Die Mutter deiner Freundin steht auf und kommt auf dich zu.',
        lines: [
          you('salām alaykum', 'سلام علیکم', 'Friede sei mit Ihnen'),
          say('Mutter', 'wa alaykum salām, bachēm. chetor asti?', 'و علیکم سلام، بچیم. چطور استی؟', 'Und mit dir sei Friede, mein Junge. Wie geht’s dir?'),
          you('khub astum, tashakor. shumā chetor astēn?', 'خوب استم، تشکر. شما چطور استین؟', 'Mir geht’s gut, danke. Wie geht es Ihnen?'),
          say('Mutter', 'shukr, khub astum', 'شکر، خوب استم', 'Gott sei Dank, gut.'),
          you('jōr astēn?', 'جور استین؟', 'Sind Sie wohlauf?'),
          say('Mutter', 'jōr astum, zinda bāshi', 'جور استم، زنده باشی', 'Mir geht’s gut, danke dir.'),
        ],
      },
    },
    {
      id: 'u01-l2',
      title: 'Danke, bitte, Entschuldigung',
      phrases: [
        p('tashakor-e ziyād', 'تشکر زیاد', 'Vielen Dank'),
        p('zinda bāshi', 'زنده باشی', 'Danke (wörtl. mögest du leben)', 'Sehr herzliches Danke, typisch afghanisch.'),
        p('zinda bāshēn', 'زنده باشین', 'Danke (höflich, wörtl. mögen Sie leben)'),
        p('lutfan', 'لطفاً', 'Bitte (als Bitte)'),
        p('bēbakhshēn', 'ببخشین', 'Entschuldigung / Verzeihung (höflich)'),
        p('bēbakhsh', 'ببخش', 'Entschuldigung (du)'),
        p('mushkil nēs', 'مشکل نیست', 'Kein Problem'),
        p('khayr as', 'خیر است', 'Macht nichts / alles gut'),
        p('bale', 'بلی', 'Ja'),
        p('nē', 'نی', 'Nein'),
        p('sar-e chashm', 'سر چشم', 'Sehr gern! (wörtl. auf meinen Augen)', 'Wenn dich Ältere um etwas bitten: freundlich und respektvoll.'),
        p('qurbānet shawum', 'قربانت شوم', 'Du bist so lieb / Danke von Herzen (wörtl. ich opfere mich für dich)', 'Sehr liebevoll. Hörst du oft von Müttern und Tanten.'),
      ],
      culture: {
        title: 'Die Hand aufs Herz',
        body: [
          'Beim Begrüßen legen viele Afghanen die **rechte Hand aufs Herz**. Das zeigt Respekt und Herzlichkeit.',
          'Frauen aus der Familie geben Männern oft **nicht die Hand**. Warte ab, ob dir jemand die Hand reicht. Im Zweifel ist die Hand aufs Herz plus ein leichtes Nicken perfekt.',
          'Begrüße immer **zuerst die Ältesten** im Raum, meist den Vater oder die Großeltern, und steh auf, wenn Ältere den Raum betreten.',
        ],
      },
    },
    {
      id: 'u01-l3',
      title: 'Tageszeiten & Abschied',
      phrases: [
        p('sob bakhayr', 'صبح بخیر', 'Guten Morgen'),
        p('rōz bakhayr', 'روز بخیر', 'Guten Tag'),
        p('shab bakhayr', 'شب بخیر', 'Gute Nacht'),
        p('khosh āmadēn', 'خوش آمدین', 'Willkommen'),
        p('khodā hāfiz', 'خدا حافظ', 'Auf Wiedersehen (wörtl. Gott schütze dich)'),
        p('ba amān-e khodā', 'به امان خدا', 'Mach’s gut (wörtl. in Gottes Schutz)'),
        p('bāz mēbinēmet', 'باز می‌بینیمت', 'Bis bald / wir sehen uns'),
        p('manda nabāshēn', 'مانده نباشین', 'Hallo! (wörtl. mögen Sie nicht müde sein)', 'Begrüßung für jemanden, der arbeitet oder gerade von der Arbeit kommt.'),
        p('salāmat bāshēn', 'سلامت باشین', 'Danke, bleiben Sie gesund', 'Antwort auf manda nabāshēn oder als Dank.'),
        p('safar bakhayr', 'سفر بخیر', 'Gute Reise'),
      ],
      dialog: {
        title: 'Verabschiedung nach dem Besuch',
        setting: 'Es ist spät, du verabschiedest dich vom Vater deiner Freundin.',
        lines: [
          you('tashakor-e ziyād', 'تشکر زیاد', 'Vielen Dank'),
          say('Vater', 'khosh āmadi, bachēm', 'خوش آمدی، بچیم', 'Schön, dass du da warst, mein Junge.'),
          you('zinda bāshēn', 'زنده باشین', 'Danke'),
          say('Vater', 'bāz biyā! ba amān-e khodā', 'باز بیا! به امان خدا', 'Komm wieder! Mach’s gut.'),
          you('khodā hāfiz', 'خدا حافظ', 'Auf Wiedersehen'),
        ],
      },
    },
  ],
}
