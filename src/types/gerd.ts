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

export interface FuzzyResult {
  riskLevel: 'low' | 'medium' | 'high'
  riskScore: number
  recommendations: string[]
}

export const QUESTIONS = [
  'Seberapa sering Anda merasakan sensasi terbakar di dada (heartburn)?',
  'Seberapa sering Anda mengalami naiknya asam lambung ke kerongkongan?',
  'Seberapa sering Anda merasakan rasa asam atau pahit di mulut?',
  'Seberapa sering Anda mengalami kesulitan menelan makanan?',
  'Seberapa sering Anda merasakan nyeri atau ketidaknyamanan di ulu hati?',
  'Seberapa sering Anda mengalami mual atau muntah?',
  'Seberapa sering Anda merasakan kembung atau penuh di perut?',
  'Seberapa sering Anda mengalami batuk kering yang tidak kunjung sembuh?',
  'Seberapa sering gejala memburuk setelah makan atau berbaring?',
  'Seberapa sering Anda terbangun di malam hari karena gejala asam lambung?',
]
