<script setup lang="ts">
import type { PersonalData } from '@/types/gerd'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const formData = ref<PersonalData>({
  name: '',
  age: 0,
  gender: 'male',
  email: '',
})

const errors = ref({
  name: '',
  age: '',
  email: '',
})

const validateForm = () => {
  errors.value = { name: '', age: '', email: '' }
  let isValid = true

  if (!formData.value.name.trim()) {
    errors.value.name = 'Nama wajib diisi'
    isValid = false
  }

  if (!formData.value.age || formData.value.age < 1 || formData.value.age > 120) {
    errors.value.age = 'Usia harus antara 1-120 tahun'
    isValid = false
  }

  if (formData.value.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Format email tidak valid'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    sessionStorage.setItem('personalData', JSON.stringify(formData.value))
    router.push({ name: 'survey' })
  }
}
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
        <h1
          class="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Sistem Deteksi Dini GERD
        </h1>
        <p class="text-base-content/70">Identifikasi risiko asam lambung dengan fuzzy logic</p>
      </div>

      <!-- Progress Steps -->
      <div class="mb-8">
        <ul class="steps steps-horizontal w-full">
          <li class="step step-primary">Data Diri</li>
          <li class="step">Survey</li>
          <li class="step">Hasil</li>
        </ul>
      </div>

      <!-- Form Card -->
      <div class="card bg-gray-50 shadow-2xl">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-2">Data Diri</h2>
          <p class="text-base-content/70 mb-6">Mohon isi data diri Anda untuk memulai assessment</p>

          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Nama -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Nama Lengkap *</span>
              </label>
              <input
                v-model="formData.name"
                type="text"
                placeholder="Masukkan nama lengkap"
                class="pl-2 input input-bordered w-full bg-gray-100 border border-gray-300"
                :class="{ 'input-error': errors.name }"
              />
              <label v-if="errors.name" class="label">
                <span class="label-text-alt text-error">{{ errors.name }}</span>
              </label>
            </div>

            <!-- Usia -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Usia *</span>
              </label>
              <input
                v-model.number="formData.age"
                type="number"
                placeholder="Masukkan usia"
                class="pl-2 input input-bordered w-full bg-gray-100 border border-gray-300"
                :class="{ 'input-error': errors.age }"
                min="1"
                max="120"
              />
              <label v-if="errors.age" class="label">
                <span class="label-text-alt text-error">{{ errors.age }}</span>
              </label>
            </div>

            <!-- Jenis Kelamin -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Jenis Kelamin *</span>
              </label>
              <div class="space-y-2">
                <label
                  class="label cursor-pointer justify-start gap-3 p-4 border rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <input
                    v-model="formData.gender"
                    type="radio"
                    value="male"
                    class="radio radio-primary checked:bg-primary border border-gray-300"
                  />
                  <span class="label-text font-medium">Laki-laki</span>
                </label>
                <label
                  class="label cursor-pointer justify-start gap-3 p-4 border rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <input
                    v-model="formData.gender"
                    type="radio"
                    value="female"
                    class="radio radio-primary checked:bg-primary border border-gray-300"
                  />
                  <span class="label-text font-medium">Perempuan</span>
                </label>
              </div>
            </div>

            <!-- Email -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold">Email (opsional)</span>
              </label>
              <input
                v-model="formData.email"
                type="email"
                placeholder="nama@email.com"
                class="pl-2 input input-bordered w-full bg-gray-100 border border-gray-300"
                :class="{ 'input-error': errors.email }"
              />
              <label v-if="errors.email" class="label">
                <span class="label-text-alt text-error">{{ errors.email }}</span>
              </label>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary btn-lg w-full">
              Lanjut ke Survey
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
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
