export interface PersonalData {
  name: string
  age: number
  gender: 'male' | 'female'
  email?: string
}

export interface SurveyAnswer {
  questionId: number
  value: number
}

export interface Question {
  id: number
  variable: string
  question: string
  values: { label: string; value: number }[]
  note?: string
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    variable: 'NyeriUluHati',
    question:
      'Seberapa sering Anda merasakan nyeri atau rasa terbakar di dada bagian atas (ulu hati)?',
    values: [
      { label: 'Jarang', value: 3 },
      { label: 'Kadang', value: 5 },
      { label: 'Sering', value: 8 },
    ],
    note: 'Gejala utama GERD',
  },
  {
    id: 2,
    variable: 'RasaAsamMulut',
    question: 'Apakah Anda sering merasakan rasa asam atau pahit di mulut atau tenggorokan?',
    values: [
      { label: 'Tidak Pernah', value: 0 },
      { label: 'Kadang', value: 5 },
      { label: 'Sering', value: 8 },
    ],
    note: 'Refluks asam ke tenggorokan',
  },
  {
    id: 3,
    variable: 'SendawaKembung',
    question: 'Seberapa sering Anda merasa kembung atau sering bersendawa setelah makan?',
    values: [
      { label: 'Jarang', value: 3 },
      { label: 'Kadang', value: 5 },
      { label: 'Sering', value: 8 },
    ],
    note: 'Indikator gangguan pencernaan',
  },
  {
    id: 4,
    variable: 'MualMuntah',
    question: 'Apakah Anda sering merasa mual atau muntah setelah makan?',
    values: [
      { label: 'Tidak Pernah', value: 0 },
      { label: 'Kadang', value: 5 },
      { label: 'Sering', value: 8 },
    ],
    note: 'Refleks akibat asam lambung naik',
  },
  {
    id: 5,
    variable: 'TidurSetelahMakan',
    question: 'Apakah Anda sering langsung berbaring atau tidur setelah makan?',
    values: [
      { label: 'Jarang', value: 3 },
      { label: 'Kadang', value: 5 },
      { label: 'Sering', value: 8 },
    ],
    note: 'Faktor risiko memperparah GERD',
  },
  {
    id: 6,
    variable: 'PolaMakan',
    question: 'Bagaimana pola makan Anda sehari-hari?',
    values: [
      { label: 'Teratur', value: 3 },
      { label: 'Kadang Telat', value: 6 },
      { label: 'Tidak Teratur', value: 9 },
    ],
    note: 'Faktor perilaku penyebab GERD',
  },
  {
    id: 7,
    variable: 'KonsumsiPemicu',
    question: 'Seberapa sering Anda mengonsumsi makanan pedas, asam, kopi, atau soda?',
    values: [
      { label: 'Jarang', value: 3 },
      { label: 'Kadang', value: 6 },
      { label: 'Sering', value: 9 },
    ],
    note: 'Faktor pemicu langsung GERD',
  },
  {
    id: 8,
    variable: 'KesulitanMenelan',
    question: 'Apakah Anda sering merasa sulit menelan makanan atau minuman?',
    values: [
      { label: 'Tidak Pernah', value: 0 },
      { label: 'Kadang', value: 5 },
      { label: 'Sering', value: 8 },
    ],
    note: 'Gejala lanjutan GERD',
  },
  {
    id: 9,
    variable: 'TingkatStres',
    question: 'Bagaimana tingkat stres Anda dalam keseharian?',
    values: [
      { label: 'Rendah', value: 3 },
      { label: 'Sedang', value: 6 },
      { label: 'Tinggi', value: 9 },
    ],
    note: 'Faktor psikosomatik yang memperburuk GERD',
  },
  {
    id: 10,
    variable: 'BeratBadanBerlebih',
    question: 'Apakah Anda mengalami kelebihan berat badan (IMT > 25)?',
    values: [
      { label: 'Tidak', value: 0 },
      { label: 'Sedikit', value: 5 },
      { label: 'Ya', value: 9 },
    ],
    note: 'Tekanan perut tinggi → risiko naiknya asam',
  },
]
