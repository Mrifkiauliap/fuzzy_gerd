<script setup lang="ts">
import type { PersonalData, SurveyAnswer } from '@/types/gerd'
import { QUESTIONS } from '@/types/gerd'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const personalData = ref<PersonalData | null>(null)
const answers = ref<SurveyAnswer[]>([])
const isLoading = ref(true)

// Calculate GERD Risk
const calculateGERDRisk = () => {
  if (answers.value.length === 0) {
    return {
      nilai: 0,
      kategori: 'rendah' as const,
      riskScore: 0,
      riskLevel: 'low' as const,
    }
  }

  const total = answers.value.reduce((sum, ans) => sum + ans.value, 0)
  const average = total / answers.value.length
  const riskScore = Math.round((average / 10) * 100)

  let kategori: 'rendah' | 'sedang' | 'tinggi' = 'rendah'
  let riskLevel: 'low' | 'medium' | 'high' = 'low'

  if (average >= 7) {
    kategori = 'tinggi'
    riskLevel = 'high'
  } else if (average >= 4) {
    kategori = 'sedang'
    riskLevel = 'medium'
  }

  return {
    nilai: Number(average.toFixed(2)),
    kategori,
    riskScore,
    riskLevel,
  }
}

const result = computed(() => calculateGERDRisk())

const getRiskColor = (level: string) => {
  switch (level) {
    case 'low':
      return 'text-success'
    case 'medium':
      return 'text-warning'
    case 'high':
      return 'text-error'
    default:
      return 'text-base-content'
  }
}

const getRiskBg = (level: string) => {
  switch (level) {
    case 'low':
      return 'bg-success/10 border-success'
    case 'medium':
      return 'bg-warning/10 border-warning'
    case 'high':
      return 'bg-error/10 border-error'
    default:
      return 'bg-base-200'
  }
}

const getRiskLabel = (level: string) => {
  switch (level) {
    case 'low':
      return 'Risiko Rendah'
    case 'medium':
      return 'Risiko Sedang'
    case 'high':
      return 'Risiko Tinggi'
    default:
      return ''
  }
}

const getRiskDescription = (level: string) => {
  switch (level) {
    case 'low':
      return 'Hasil menunjukkan risiko rendah GERD. Tetap jaga pola hidup sehat untuk mencegah gejala.'
    case 'medium':
      return 'Hasil menunjukkan risiko sedang GERD. Disarankan untuk berkonsultasi dengan dokter dan mengikuti rekomendasi di bawah.'
    case 'high':
      return 'Hasil menunjukkan risiko tinggi GERD. Sangat disarankan untuk segera berkonsultasi dengan dokter spesialis.'
    default:
      return ''
  }
}

const recommendations = computed(() => {
  const baseRecommendations = [
    'Hindari makanan yang memicu asam lambung (pedas, berlemak, asam)',
    'Makan dalam porsi kecil tapi sering',
    'Hindari berbaring segera setelah makan',
    'Tidur dengan posisi kepala lebih tinggi',
    'Kurangi konsumsi kafein dan alkohol',
    'Jaga berat badan ideal',
    'Kelola stress dengan baik',
  ]

  if (result.value.riskLevel === 'high') {
    return [
      'Segera konsultasi dengan dokter spesialis gastroenterologi',
      ...baseRecommendations,
      'Pertimbangkan pemeriksaan endoskopi',
      'Hindari merokok',
    ]
  } else if (result.value.riskLevel === 'medium') {
    return [
      'Konsultasi dengan dokter umum atau spesialis',
      ...baseRecommendations,
      'Monitor gejala secara berkala',
    ]
  }

  return baseRecommendations
})

const getAnswerDetail = (questionId: number) => {
  const answer = answers.value.find((a) => a.questionId === questionId)
  const question = QUESTIONS.find((q) => q.id === questionId)

  if (!answer || !question) return null

  const selectedOption = question.values.find((v) => v.value === answer.value)

  return {
    question: question.question,
    answer: selectedOption?.label || 'Tidak dijawab',
    value: answer.value,
  }
}

const handleStartOver = () => {
  sessionStorage.clear()
  router.push({ name: 'home' })
}

const handleDownload = () => {
  if (!personalData.value) return

  const resultText = `
HASIL ASSESSMENT GERD
=====================

Data Diri:
- Nama: ${personalData.value.name}
- Usia: ${personalData.value.age} tahun
- Jenis Kelamin: ${personalData.value.gender === 'male' ? 'Laki-laki' : 'Perempuan'}
${personalData.value.email ? `- Email: ${personalData.value.email}` : ''}

Hasil:
- Tingkat Risiko: ${getRiskLabel(result.value.riskLevel)}
- Skor Risiko: ${result.value.riskScore}%
- Nilai Fuzzy: ${result.value.nilai}

Rekomendasi:
${recommendations.value.map((rec, idx) => `${idx + 1}. ${rec}`).join('\n')}

Tanggal Assessment: ${new Date().toLocaleDateString('id-ID')}
  `.trim()

  const blob = new Blob([resultText], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `hasil-gerd-${personalData.value.name.replace(/\s+/g, '-')}.txt`
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  const storedPersonalData = sessionStorage.getItem('personalData')
  const storedAnswers = sessionStorage.getItem('surveyAnswers')

  if (!storedPersonalData || !storedAnswers) {
    router.push({ name: 'home' })
    return
  }

  personalData.value = JSON.parse(storedPersonalData)
  answers.value = JSON.parse(storedAnswers)
  isLoading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 py-12 px-4">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <span class="loading loading-spinner loading-lg text-primary"></span>
        <p class="mt-4 text-base-content/70">Memuat hasil...</p>
      </div>
    </div>

    <!-- Content -->
    <div v-else class="container max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <div
          class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary mb-4 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8 text-primary-content"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h1
          class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Hasil Assessment GERD
        </h1>
        <p class="text-base-content/70">Analisis berdasarkan fuzzy logic</p>
      </div>

      <!-- Progress Steps -->
      <div class="mb-8">
        <ul class="steps steps-horizontal w-full">
          <li class="step step-primary">Data Diri</li>
          <li class="step step-primary">Survey</li>
          <li class="step step-primary">Hasil</li>
        </ul>
      </div>

      <div class="space-y-6">
        <!-- Personal Info Card -->
        <div class="card bg-gray-50 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Informasi Peserta</h2>
            <div class="grid md:grid-cols-3 gap-4 mt-4">
              <div>
                <p class="text-sm text-gray-800/70">Nama</p>
                <p class="font-semibold">{{ personalData?.name }}</p>
              </div>
              <div>
                <p class="text-sm text-gray-800/70">Usia</p>
                <p class="font-semibold">{{ personalData?.age }} tahun</p>
              </div>
              <div>
                <p class="text-sm text-gray-800/70">Jenis Kelamin</p>
                <p class="font-semibold">
                  {{ personalData?.gender === 'male' ? 'Laki-laki' : 'Perempuan' }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Risk Level Card -->
        <div :class="`card shadow-xl border-2 ${getRiskBg(result.riskLevel)}`">
          <div class="card-body">
            <h2 class="card-title text-2xl">Tingkat Risiko GERD</h2>

            <div class="flex items-center justify-center my-6">
              <div :class="getRiskColor(result.riskLevel)">
                <svg
                  v-if="result.riskLevel === 'low'"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-12 h-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <p :class="`text-3xl font-bold ${getRiskColor(result.riskLevel)}`">
                  {{ getRiskLabel(result.riskLevel) }}
                </p>
                <p class="text-base-content/70">Skor: {{ result.riskScore }}%</p>
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Tingkat Risiko</span>
                <span class="font-semibold">{{ result.riskScore }}%</span>
              </div>
              <progress
                class="progress progress-primary h-3"
                :value="result.riskScore"
                max="100"
              ></progress>
            </div>

            <div class="mt-6 p-4 bg-gray-50/50 rounded-lg">
              <p class="text-sm text-base-content/70">
                {{ getRiskDescription(result.riskLevel) }}
              </p>
            </div>
          </div>
        </div>

        <!-- Recommendations Card -->
        <div class="card bg-gray-50 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Rekomendasi & Saran</h2>
            <p class="text-base-content/70 mb-4">Ikuti saran berikut untuk mengelola gejala GERD</p>

            <ul class="space-y-3">
              <li
                v-for="(recommendation, index) in recommendations"
                :key="index"
                class="flex gap-3"
              >
                <span
                  class="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold"
                >
                  {{ index + 1 }}
                </span>
                <span class="flex-1">{{ recommendation }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Answer Details Card -->
        <div class="card bg-gray-50 shadow-xl">
          <div class="card-body">
            <h2 class="card-title">Detail Jawaban Survey</h2>

            <div class="overflow-x-auto mt-4">
              <table class="table border text-gray-800">
                <thead>
                  <tr>
                    <th class="w-12 text-gray-800">No</th>
                    <th class="text-left text-gray-800">Pertanyaan</th>
                    <th class="text-left text-gray-800">Jawaban</th>
                    <th class="text-center text-gray-800">Nilai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="question in QUESTIONS" :key="question.id">
                    <td>{{ question.id }}</td>
                    <td class="font-medium">{{ question.question }}</td>
                    <td>
                      <span class="badge badge-lg">
                        {{ getAnswerDetail(question.id)?.answer }}
                      </span>
                    </td>
                    <td class="text-center">
                      <span class="badge badge-primary">
                        {{ getAnswerDetail(question.id)?.value }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4">
          <button @click="handleDownload" class="btn btn-outline flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Unduh Hasil
          </button>
          <button @click="handleStartOver" class="btn btn-primary flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Mulai Assessment Baru
          </button>
        </div>

        <!-- Disclaimer -->
        <div class="card bg-base-200/50 shadow">
          <div class="card-body">
            <p class="text-sm text-base-content/70 text-center">
              <strong>Disclaimer:</strong> Hasil ini hanya sebagai indikasi awal dan tidak
              menggantikan diagnosis medis profesional. Selalu konsultasikan dengan dokter untuk
              diagnosis dan perawatan yang tepat.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  .btn,
  button {
    display: none !important;
  }
}
</style>
