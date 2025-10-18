<script setup lang="ts">
import {
  ArrowRightIcon,
  ChartBarIcon,
  ClipboardIcon,
  HeartIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'
import { useRouter } from 'vue-router'

const router = useRouter()

const startSurvey = () => {
  router.push({ name: 'personal-data' })
}

const features = [
  {
    icon: ClipboardIcon,
    title: 'Survey Komprehensif',
    description: '10 pertanyaan tervalidasi untuk mendeteksi gejala GERD.',
  },
  {
    icon: ChartBarIcon,
    title: 'Fuzzy Logic',
    description: 'Analisis berbasis logika fuzzy untuk hasil yang lebih akurat.',
  },
  {
    icon: HeartIcon,
    title: 'Hasil Instan',
    description: 'Lihat hasil dan rekomendasi langsung setelah survey.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Data Aman',
    description: 'Semua data disimpan secara lokal dan terenkripsi.',
  },
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 text-gray-900">
    <!-- Hero Section -->
    <section class="container mx-auto px-4 py-16 md:py-24 text-center">
      <div class="flex justify-center mb-8">
        <div
          class="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-lg"
        >
          <HeartIcon class="w-10 h-10 text-primary-content" />
        </div>
      </div>

      <h1
        class="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent mb-6"
      >
        Sistem Pakar Deteksi Dini GERD
      </h1>

      <p class="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
        Deteksi risiko penyakit asam lambung (GERD) dengan analisis fuzzy logic yang akurat dan
        cepat.
      </p>

      <button class="btn btn-primary btn-lg gap-2" @click="startSurvey">
        Mulai Assessment
        <ArrowRightIcon class="w-5 h-5" />
      </button>

      <p class="text-sm opacity-70 mt-4">Gratis • 5 Menit • Hasil Langsung</p>
    </section>

    <!-- Features -->
    <section class="container mx-auto px-4 py-16">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">
        Mengapa Menggunakan Sistem Ini?
      </h2>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(feature, i) in features"
          :key="i"
          class="card bg-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div class="card-body items-center text-center">
            <component :is="feature.icon" class="w-10 h-10 text-primary mb-4" />
            <h3 class="font-semibold text-lg mb-2">{{ feature.title }}</h3>
            <p class="text-gray-700">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works -->
    <section
      class="container mx-auto px-4 py-16 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl my-16"
    >
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-12">Cara Kerja</h2>

      <div class="max-w-3xl mx-auto space-y-8">
        <div
          class="flex items-start gap-4"
          v-for="(step, index) in [
            { title: 'Isi Data Diri', desc: 'Masukkan nama, usia, dan jenis kelamin Anda.' },
            {
              title: 'Jawab Pertanyaan',
              desc: 'Isi 10 pertanyaan terkait gejala yang Anda alami.',
            },
            { title: 'Lihat Hasil', desc: 'Dapatkan hasil deteksi dan rekomendasi penanganan.' },
          ]"
          :key="index"
        >
          <div
            class="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-content flex items-center justify-center font-bold text-xl shadow-md"
          >
            {{ index + 1 }}
          </div>
          <div>
            <h3 class="text-xl font-semibold mb-1">{{ step.title }}</h3>
            <p class="text-gray-700">{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About GERD -->
    <section class="container mx-auto px-4 py-16">
      <div class="card bg-gray-100 shadow-lg max-w-4xl mx-auto">
        <div class="card-body">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">Apa itu GERD?</h2>
          <p class="text-gray-700 mb-3">
            GERD (Gastroesophageal Reflux Disease) adalah kondisi kronis ketika asam lambung naik ke
            kerongkongan dan menyebabkan iritasi.
          </p>
          <p class="text-gray-700 mb-3">
            Gejalanya meliputi heartburn (rasa terbakar di dada), regurgitasi, kesulitan menelan,
            dan batuk kering yang berulang.
          </p>
          <p class="text-gray-700">
            Deteksi dini penting untuk mencegah komplikasi seperti esofagitis, striktur, atau bahkan
            kanker esofagus.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="container mx-auto px-4 py-16 mb-16">
      <div
        class="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 shadow-xl"
      >
        <h2 class="text-3xl md:text-4xl font-bold text-primary-content mb-4">
          Mulai Deteksi Dini Sekarang
        </h2>
        <p class="text-primary-content mb-8 text-lg">
          Proses cepat, hasil akurat, dan sepenuhnya gratis.
        </p>
        <button class="btn btn-secondary text-white btn-lg gap-2" @click="startSurvey">
          Mulai Assessment Gratis
          <ArrowRightIcon class="w-5 h-5" />
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="border-t border-gray-300 py-8 text-center text-gray-700 text-sm">
      <p>
        © 2025 Sistem Pakar GERD — Untuk tujuan edukasi & skrining awal.
        <br />
        Hasil tidak menggantikan konsultasi medis profesional.
      </p>
    </footer>
  </div>
</template>
