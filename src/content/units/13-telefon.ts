import { p, say, you } from '../helpers'
import type { Unit } from '../types'

export const unit13: Unit = {
  id: 'u13',
  num: 13,
  title: 'Telefon & Videoanruf',
  emoji: '📱',
  description: 'Mit der Familie telefonieren, auch wenn die Verbindung wackelt.',
  lessons: [
    {
      id: 'u13-l1',
      title: 'Anrufen',
      phrases: [
        p('alō?', 'الو؟', 'Hallo? (am Telefon)'),
        p('salām, Joris astum', 'سلام، یوریس استم', 'Hallo, hier ist Joris'),
        p('zang mēzanum', 'زنگ میزنم', 'Ich rufe an'),
        p('ba‘dan zang mēzanum', 'بعداً زنگ میزنم', 'Ich rufe später an'),
        p('zang bezan', 'زنگ بزن', 'Ruf (mich) an'),
        p('mobāyl', 'موبایل', 'Handy'),
        p('paygham', 'پیغام', 'Nachricht'),
        p('waqt dārēn gap bezanēm?', 'وقت دارین گپ بزنیم؟', 'Haben Sie Zeit zum Reden?'),
      ],
    },
    {
      id: 'u13-l2',
      title: 'Die Verbindung ist schlecht',
      phrases: [
        p('mēshnawēn?', 'میشنوین؟', 'Hören Sie mich?'),
        p('āwāz-etān namēya', 'آوازتان نمیایه', 'Ich höre Sie nicht (wörtl. Ihre Stimme kommt nicht)'),
        p('kami baland-tar gap bezanēn', 'کمی بلندتر گپ بزنین', 'Sprechen Sie bitte etwas lauter'),
        p('internet kharāb as', 'انترنت خراب است', 'Das Internet ist schlecht'),
        p('qat shod', 'قطع شد', 'Die Verbindung ist abgebrochen'),
        p('bāz zang mēzanum', 'باز زنگ میزنم', 'Ich rufe nochmal an'),
        p('tasvir-etān band as', 'تصویرتان بند است', 'Ihr Bild ist eingefroren / aus'),
        p('hālā mēshnawum', 'حالا میشنوم', 'Jetzt höre ich Sie'),
      ],
    },
    {
      id: 'u13-l3',
      title: 'Videoanruf nach Afghanistan',
      phrases: [
        p('hawā dar Kābul chetor as?', 'هوا در کابل چطور است؟', 'Wie ist das Wetter in Kabul?'),
        p('ēnjā shab as', 'اینجا شب است', 'Hier ist es Nacht'),
        p('ba hama salām bugēn', 'به همه سلام بگین', 'Grüßen Sie alle von mir'),
        p('khosh bāshēn', 'خوش باشین', 'Machen Sie’s gut / Bleiben Sie fröhlich'),
        p('bāz gap mēzanēm', 'باز گپ میزنیم', 'Wir sprechen wieder'),
        p('khodā hāfiz-etān', 'خدا حافظ‌تان', 'Gott schütze Sie – Tschüss'),
      ],
      culture: {
        title: 'Videoanrufe mit der Großfamilie',
        body: [
          'Bei Videoanrufen nach Afghanistan oder in andere Länder wird das Handy oft **von Person zu Person weitergereicht**. Du wirst also vielen Leuten kurz „salām“ sagen.',
          'Das Standardprogramm pro Person: **salām alaykum → chetor astēn? → fāmil khub as? → zinda bāshēn**. Damit bist du bestens vorbereitet.',
          'Zeitverschiebung: Afghanistan ist Deutschland im Sommer **2,5 Stunden**, im Winter **3,5 Stunden voraus**.',
        ],
      },
      dialog: {
        title: 'Die Tante in Kabul',
        setting: 'Deine Freundin gibt dir das Handy. Ihre Tante aus Kabul ist im Videoanruf.',
        lines: [
          say('Khāla', 'alō? salām! mēshnawi?', 'الو؟ سلام! میشنوی؟', 'Hallo? Hörst du mich?'),
          you('salām alaykum, khāla-jān. bale, mēshnawum', 'سلام علیکم، خاله جان. بلی، میشنوم', 'Guten Tag, Tantchen. Ja, ich höre Sie.'),
          say('Khāla', 'chetor asti? fāmil-et khub as?', 'چطور استی؟ فامیلت خوب است؟', 'Wie geht’s dir? Geht es deiner Familie gut?'),
          you('shukr, hama khub astan. shumā chetor astēn?', 'شکر، همه خوب استن. شما چطور استین؟', 'Gott sei Dank, allen geht es gut. Wie geht es Ihnen?'),
          say('Khāla', 'khub astum… alō? alō?', 'خوب استم… الو؟ الو؟', 'Mir geht’s gut … Hallo? Hallo?'),
          you('internet kharāb as. bāz zang mēzanum', 'انترنت خراب است. باز زنگ میزنم', 'Das Internet ist schlecht. Ich rufe nochmal an.'),
        ],
      },
    },
  ],
}
