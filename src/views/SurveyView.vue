<script setup lang="ts">
import type { SurveyAnswer } from '@/types/gerd'
import { QUESTIONS } from '@/types/gerd'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentQuestionIndex = ref(0)
const answers = ref<SurveyAnswer[]>(QUESTIONS.map((q) => ({ questionId: q.id, value: 0 })))

const currentQuestion = computed(() => QUESTIONS[currentQuestionIndex.value])
const progress = computed(() => ((currentQuestionIndex.value + 1) / QUESTIONS.length) * 100)
const isLastQuestion = computed(() => currentQuestionIndex.value === QUESTIONS.length - 1)
const isFirstQuestion = computed(() => currentQuestionIndex.value === 0)

const currentAnswer = computed({
  get: () => {
    const answer = answers.value.find((a) => a.questionId === currentQuestion.value.id)
    return answer ? answer.value : 0
  },
  set: (value: number) => {
    const index = answers.value.findIndex((a) => a.questionId === currentQuestion.value.id)
    if (index >= 0) {
      answers.value[index].value = value
    }
  },
})

const getValueLabel = (value: number): string => {
  if (value >= 0 && value <= 3) return 'Tidak Pernah'
  if (value > 3 && value <= 6) return 'Kadang-kadang'
  if (value > 6 && value <= 8) return 'Sering'
  return 'Selalu'
}

const getValueColor = (value: number): string => {
  if (value >= 0 && value <= 3) return 'text-success'
  if (value > 3 && value <= 6) return 'text-warning'
  return 'text-error'
}

const nextQuestion = () => {
  if (isLastQuestion.value) {
    handleSubmit()
  } else {
    currentQuestionIndex.value++
  }
}

const previousQuestion = () => {
  if (!isFirstQuestion.value) {
    currentQuestionIndex.value--
  }
}

const handleSubmit = () => {
  sessionStorage.setItem('surveyAnswers', JSON.stringify(answers.value))
  router.push({ name: 'hasil' })
}

const navigateToQuestion = (index: number) => {
  currentQuestionIndex.value = index
}

onMounted(() => {
  const personalData = sessionStorage.getItem('personalData')
  if (!personalData) {
    router.push({ name: 'personal-data' })
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900 py-12 px-4">
    <div class="container max-w-4xl mx-auto">
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        </div>
        <h1
          class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Survey Gejala GERD
        </h1>
        <p class="text-base-content/70">
          Pertanyaan {{ currentQuestionIndex + 1 }} dari {{ QUESTIONS.length }}
        </p>
      </div>

      <!-- Progress Steps -->
      <div class="mb-8 text-gray-200">
        <ul class="steps steps-horizontal w-full">
          <li class="step step-primary">Data Diri</li>
          <li class="step step-primary">Survey</li>
          <li class="step">Hasil</li>
        </ul>
      </div>

      <!-- Survey Card -->
      <div class="card bg-gray-50 shadow-2xl">
        <div class="card-body">
          <h2 class="card-title text-xl md:text-2xl mb-2">
            {{ currentQuestion.question }}
          </h2>
          <p class="text-base-content/70 mb-6">
            Geser slider untuk menentukan seberapa sering Anda mengalami gejala ini
          </p>

          <div class="space-y-8">
            <!-- Slider Section -->
            <div class="space-y-4">
              <div class="flex justify-between items-center">
                <span class="text-base font-semibold">Tingkat Frekuensi:</span>
                <span :class="`text-2xl font-bold ${getValueColor(currentAnswer)}`">
                  {{ currentAnswer }}
                </span>
              </div>

              <!-- Slider -->
              <input
                v-model.number="currentAnswer"
                type="range"
                min="0"
                max="10"
                class="w-full h-2 bg-gray-200 rounded-lg cursor-pointer"
                step="1"
              />

              <!-- Range Labels -->
              <div class="flex justify-between text-xs px-2">
                <span class="text-success font-bold">0</span>
                <span class="text-warning font-bold">5</span>
                <span class="text-error font-bold">10</span>
              </div>

              <div class="flex justify-between text-sm">
                <span class="text-success font-bold">Tidak Pernah</span>
                <span class="text-warning font-bold">Sering</span>
                <span class="text-error font-bold">Selalu</span>
              </div>

              <!-- Current Value Display -->
              <div class="text-center p-4 bg-gray-100 rounded-lg">
                <p :class="`text-lg font-semibold ${getValueColor(currentAnswer)}`">
                  {{ getValueLabel(currentAnswer) }}
                </p>
              </div>
            </div>

            <!-- Navigation Buttons -->
            <div class="flex gap-4">
              <button
                type="button"
                @click="previousQuestion"
                :disabled="isFirstQuestion"
                class="btn btn-outline flex-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Sebelumnya
              </button>

              <button type="button" @click="nextQuestion" class="btn btn-primary flex-1">
                {{ isLastQuestion ? 'Selesai' : 'Selanjutnya' }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            <!-- Question Navigator -->
            <div class="flex gap-2 justify-center flex-wrap">
              <button
                v-for="(q, index) in QUESTIONS"
                :key="q.id"
                type="button"
                @click="navigateToQuestion(index)"
                class="w-10 h-10 rounded-full text-xs font-medium transition-all"
                :class="{
                  'btn-primary': index === currentQuestionIndex,
                  'btn-success': answers[index].value > 0 && index !== currentQuestionIndex,
                  'btn-ghost': answers[index].value === 0 && index !== currentQuestionIndex,
                }"
              >
                {{ index + 1 }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.range {
  height: 1rem;
}
</style>
