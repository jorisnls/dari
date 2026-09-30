/** Pronunciation key for the Latin transliteration used throughout the app. */
export const legend: { sign: string; sound: string; example: string }[] = [
  { sign: 'a', sound: 'kurzes, helles a – oft fast wie „ä“', example: 'bale (ja)' },
  { sign: 'ā', sound: 'langes, dunkles a – fast Richtung „o“ wie im engl. „father“', example: 'salām (hallo)' },
  { sign: 'e', sound: 'kurzes e wie in „Bett“', example: 'chetor (wie)' },
  { sign: 'ē', sound: 'langes, geschlossenes e wie in „See“', example: 'mērum (ich gehe)' },
  { sign: 'i', sound: 'i wie in „Liebe“', example: 'ki (wer)' },
  { sign: 'o', sound: 'kurzes o wie in „Sonne“', example: 'khob (gut)' },
  { sign: 'ō', sound: 'langes, geschlossenes o wie in „Boot“', example: 'dōst (Freund)' },
  { sign: 'u', sound: 'u wie in „Mut“', example: 'khub (gut)' },
  { sign: 'kh', sound: 'wie „ch“ in „Bach“', example: 'khāna (Haus)' },
  { sign: 'gh', sound: 'geriebenes Rachen-r, wie französisches „r“', example: 'ghazā (Essen)' },
  { sign: 'q', sound: 'tiefes k, weit hinten im Rachen', example: 'qand (Zucker)' },
  { sign: 'ch', sound: 'wie „tsch“ in „Deutsch“', example: 'chāy (Tee)' },
  { sign: 'sh', sound: 'wie „sch“', example: 'shab (Nacht)' },
  { sign: 'j', sound: 'wie „dsch“ in „Dschungel“', example: 'jān (Seele, Liebes)' },
  { sign: 'zh', sound: 'wie „j“ in „Journal“', example: 'zhāla (Hagel)' },
  { sign: 'y', sound: 'wie deutsches „j“', example: 'yak (eins)' },
  { sign: 'z', sound: 'stimmhaftes s wie in „Sonne“', example: 'zan (Frau)' },
  { sign: 's', sound: 'stimmloses s wie in „Haus“', example: 'sē (drei)' },
  { sign: 'w', sound: 'wie englisches „w“ in „water“', example: 'khwār (Schwester)' },
  { sign: 'r', sound: 'kurz gerolltes Zungen-r', example: 'rōz (Tag)' },
  { sign: "'", sound: 'kurzer Stimmabsatz, kleine Pause', example: "ma'lum (bekannt)" },
]

export const legendIntro = [
  'Die App zeigt Dari nur in lateinischer Umschrift. Die Umschrift folgt der **Kabuler Umgangssprache**, also so, wie in der Familie wirklich gesprochen wird, nicht der Schriftsprache.',
  'Die Betonung liegt meistens auf der **letzten Silbe**. Verben mit mē- (ich gehe: **mērum**) oder na- (ich gehe nicht: **namērum**) werden oft auf der Vorsilbe betont.',
  'Die Vorlese-Stimme ist iranisches Persisch (Farsi). Sie klingt anders als Dari: Wo die Stimme „ou“ oder „i“ sagt, sagt man in Kabul oft „ō“ bzw. „ē“. Im Zweifel gilt die Umschrift, und am besten fragst du deine Freundin.',
]
