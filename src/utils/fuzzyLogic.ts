import { FuzzyResult, SurveyAnswer } from '@/types/gerd'

// Membership functions for fuzzy sets
const membershipNever = (value: number): number => {
  if (value <= 0) return 1
  if (value >= 4) return 0
  return (4 - value) / 4
}

const membershipOften = (value: number): number => {
  if (value <= 4) return 0
  if (value >= 7) return 0
  if (value <= 5.5) return (value - 4) / 1.5
  return (7 - value) / 1.5
}

const membershipAlways = (value: number): number => {
  if (value <= 7) return 0
  if (value >= 10) return 1
  return (value - 7) / 3
}

// Calculate fuzzy logic result
export const calculateFuzzyResult = (answers: SurveyAnswer[]): FuzzyResult => {
  // Calculate average score
  const totalScore = answers.reduce((sum, answer) => sum + answer.value, 0)
  const averageScore = totalScore / answers.length

  // Calculate membership degrees
  const neverDegree = membershipNever(averageScore)
  const oftenDegree = membershipOften(averageScore)
  const alwaysDegree = membershipAlways(averageScore)

  // Determine risk level based on highest membership degree
  let riskLevel: 'low' | 'medium' | 'high'
  let riskScore: number

  if (neverDegree > oftenDegree && neverDegree > alwaysDegree) {
    riskLevel = 'low'
    riskScore = averageScore * 10
  } else if (alwaysDegree > oftenDegree && alwaysDegree > neverDegree) {
    riskLevel = 'high'
    riskScore = 70 + (averageScore - 7) * 10
  } else {
    riskLevel = 'medium'
    riskScore = 40 + (averageScore - 4) * 10
  }

  // Generate recommendations based on risk level
  const recommendations = generateRecommendations(riskLevel, answers)

  return {
    riskLevel,
    riskScore: Math.round(riskScore),
    recommendations,
  }
}

const generateRecommendations = (
  riskLevel: 'low' | 'medium' | 'high',
  answers: SurveyAnswer[],
): string[] => {
  const baseRecommendations = [
    'Hindari makanan pedas, asam, dan berlemak tinggi',
    'Makan dengan porsi kecil tapi lebih sering',
    'Hindari makan 2-3 jam sebelum tidur',
    'Tinggikan posisi kepala saat tidur',
    'Kurangi konsumsi kafein dan alkohol',
  ]

  if (riskLevel === 'high') {
    return [
      '⚠️ Segera konsultasikan dengan dokter spesialis gastroenterologi',
      'Pertimbangkan untuk melakukan endoskopi',
      'Mungkin diperlukan pengobatan dengan PPI (Proton Pump Inhibitor)',
      ...baseRecommendations,
      'Hindari pakaian ketat di area perut',
      'Kelola stres dengan baik',
    ]
  } else if (riskLevel === 'medium') {
    return [
      'Disarankan berkonsultasi dengan dokter',
      'Pertimbangkan penggunaan antasida atau H2 blocker',
      ...baseRecommendations,
      'Jaga berat badan ideal',
      'Hindari merokok',
    ]
  } else {
    return [
      'Terus jaga pola hidup sehat',
      'Monitor gejala secara berkala',
      ...baseRecommendations.slice(0, 3),
      'Olahraga teratur',
      'Kelola stres dengan baik',
    ]
  }
}
