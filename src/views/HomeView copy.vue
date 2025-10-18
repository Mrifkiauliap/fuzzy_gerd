<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-white p-6">
    <div class="w-full max-w-4xl bg-white shadow-2xl rounded-2xl p-6 md:p-10">
      <header class="flex items-center gap-4 mb-6">
        <div class="avatar">
          <div class="w-16 rounded-full bg-gradient-to-tr from-rose-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">GD</div>
        </div>
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">GERD Risk Assessment</h1>
          <p class="text-sm text-gray-600">Fuzzy logic Mamdani — penilaian risiko GERD berdasarkan gejala dan perilaku</p>
        </div>
      </header>

      <main class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section class="space-y-4">
          <label class="block">
            <span class="label text-gray-800 font-medium">1. Nyeri Ulu Hati</span>
            <p class="text-xs text-gray-600 mb-2">Seberapa sering Anda merasakan nyeri atau rasa terbakar di dada bagian atas?</p>
            <select v-model="inputs.nyeriUluHati" class="select select-bordered w-full bg-white text-gray-800">
              <option value="Jarang">Jarang</option>
              <option value="Kadang">Kadang</option>
              <option value="Sering">Sering</option>
            </select>
          </label>

          <label class="block">
            <span class="label text-gray-800 font-medium">2. Rasa Asam di Mulut</span>
            <p class="text-xs text-gray-600 mb-2">Apakah Anda sering merasakan rasa asam atau pahit di mulut/tenggorokan?</p>
            <select v-model="inputs.rasaAsamMulut" class="select select-bordered w-full bg-white text-gray-800">
              <option value="Tidak Pernah">Tidak Pernah</option>
              <option value="Kadang">Kadang</option>
              <option value="Sering">Sering</option>
            </select>
          </label>

          <label class="block">
            <span class="label text-gray-800 font-medium">3. Sendawa & Kembung</span>
            <p class="text-xs text-gray-600 mb-2">Seberapa sering Anda merasa kembung atau sering bersendawa setelah makan?</p>
            <select v-model="inputs.sendawaKembung" class="select select-bordered w-full bg-white text-gray-800">
              <option value="Jarang">Jarang</option>
              <option value="Kadang">Kadang</option>
              <option value="Sering">Sering</option>
            </select>
          </label>

          <label class="block">
            <span class="label text-gray-800 font-medium">4. Mual/Muntah</span>
            <p class="text-xs text-gray-600 mb-2">Apakah Anda sering merasa mual atau muntah setelah makan?</p>
            <select v-model="inputs.mualMuntah" class="select select-bordered w-full bg-white text-gray-800">
              <option value="Tidak Pernah">Tidak Pernah</option>
              <option value="Kadang">Kadang</option>
              <option value="Sering">Sering</option>
            </select>
          </label>

          <label class="block">
            <span class="label text-gray-800 font-medium">5. Tidur Setelah Makan</span>
            <p class="text-xs text-gray-600 mb-2">Apakah Anda sering langsung berbaring atau tidur setelah makan?</p>
            <select v-model="inputs.tidurSetelahMakan" class="select select-bordered w-full bg-white text-gray-800">
              <option value="Jarang">Jarang</option>
              <option value="Kadang">Kadang</option>
              <option value="Sering">Sering</option>
            </select>
          </label>
        </section>

        <section class="space-y-4">
          <label class="block">
            <span class="label text-gray-800 font-medium">6. Pola Makan</span>
            <p class="text-xs text-gray-600 mb-2">Bagaimana pola makan Anda sehari-hari?</p>
            <select v-model="inputs.polaMakan" class="select select-bordered w-full bg-white text-gray-800">
              <option value="Teratur">Teratur</option>
              <option value="Kadang Telat">Kadang Telat</option>
              <option value="Tidak Teratur">Tidak Teratur</option>
            </select>
          </label>

          <label class="block">
            <span class="label text-gray-800 font-medium">7. Konsumsi Makanan Pemicu</span>
            <p class="text-xs text-gray-600 mb-2">Seberapa sering Anda mengonsumsi makanan pedas, asam, kopi, atau soda?</p>
            <select v-model="inputs.konsumsiPemicu" class="select select-bordered w-full bg-white text-gray-800">
              <option value="Jarang">Jarang</option>
              <option value="Kadang">Kadang</option>
              <option value="Sering">Sering</option>
            </select>
          </label>

          <label class="block">
            <span class="label text-gray-800 font-medium">8. Kesulitan Menelan</span>
            <p class="text-xs text-gray-600 mb-2">Apakah Anda sering merasa sulit menelan makanan atau minuman?</p>
            <select v-model="inputs.kesulitanMenelan" class="select select-bordered w-full bg-white text-gray-800">
              <option value="Tidak Pernah">Tidak Pernah</option>
              <option value="Kadang">Kadang</option>
              <option value="Sering">Sering</option>
            </select>
          </label>

          <label class="block">
            <span class="label text-gray-800 font-medium">9. Tingkat Stres</span>
            <p class="text-xs text-gray-600 mb-2">Bagaimana tingkat stres Anda dalam keseharian?</p>
            <select v-model="inputs.tingkatStres" class="select select-bordered w-full bg-white text-gray-800">
              <option value="Rendah">Rendah</option>
              <option value="Sedang">Sedang</option>
              <option value="Tinggi">Tinggi</option>
            </select>
          </label>

          <label class="block">
            <span class="label text-gray-800 font-medium">10. Berat Badan Berlebih</span>
            <p class="text-xs text-gray-600 mb-2">Apakah Anda mengalami kelebihan berat badan (IMT > 25)?</p>
            <select v-model="inputs.beratBadanBerlebih" class="select select-bordered w-full bg-white text-gray-800">
              <option value="Tidak">Tidak</option>
              <option value="Sedikit">Sedikit</option>
              <option value="Ya">Ya</option>
            </select>
          </label>
        </section>
      </main>

      <div class="flex gap-3 mt-6 justify-center">
        <button
          @click="showConfirmModal = true"
          class="btn btn-primary text-gray-800 px-8 py-2 rounded-lg font-semibold tracking-wide"
        >
          Calculate Risk
        </button>

        <button
          @click="reset"
          class="btn btn-outline text-gray-700 border-gray-400 px-8 py-2 rounded-lg font-semibold"
        >
          Reset
        </button>
      </div>

      <!-- Confirmation Modal -->
      <div v-if="showConfirmModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
          <h3 class="text-xl font-bold text-gray-800 mb-4">Konfirmasi Perhitungan</h3>
          <p class="text-gray-600 mb-6">Apakah Anda yakin data yang Anda masukkan sudah benar dan ingin melanjutkan perhitungan risiko GERD?</p>
          <div class="flex gap-3 justify-end">
            <button
              @click="showConfirmModal = false"
              class="btn btn-outline text-gray-700 px-6"
            >
              Batal
            </button>
            <button
              @click="confirmCalculate"
              class="btn btn-primary text-black px-6"
            >
              Ya, Hitung
            </button>
          </div>
        </div>
      </div>

      <!-- Result Modal -->
      <div v-if="showResultModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-2xl p-6 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold text-gray-800">Hasil Penilaian Risiko GERD</h3>
            <button @click="showResultModal = false" class="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
          </div>

          <div class="space-y-4">
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
              <p class="text-sm text-gray-600 mb-2">Skor Risiko (0–10):</p>
              <div class="text-5xl font-extrabold text-gray-800">{{ result.score.toFixed(2) }}</div>
              <div class="mt-3">
                <span class="badge badge-lg px-4 py-3 text-base" :class="badgeClass">{{ result.category }}</span>
              </div>
            </div>

            <div class="bg-gray-50 p-4 rounded-xl">
              <h4 class="font-semibold text-gray-800 mb-3">Fuzzy Details (Membership Degrees)</h4>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex justify-between">
                  <span>Risiko Rendah:</span>
                  <strong>{{ fuzzyOutput.rendah.toFixed(3) }}</strong>
                </li>
                <li class="flex justify-between">
                  <span>Risiko Sedang:</span>
                  <strong>{{ fuzzyOutput.sedang.toFixed(3) }}</strong>
                </li>
                <li class="flex justify-between">
                  <span>Risiko Tinggi:</span>
                  <strong>{{ fuzzyOutput.tinggi.toFixed(3) }}</strong>
                </li>
              </ul>
            </div>

            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p class="text-sm text-gray-700">
                <strong>Catatan:</strong> Ini adalah hasil penilaian menggunakan sistem fuzzy logic untuk tujuan edukasi. 
                Untuk diagnosis dan pengobatan yang akurat, konsultasikan dengan dokter atau tenaga medis profesional.
              </p>
            </div>

            <details class="rounded-lg border border-gray-200 p-4">
              <summary class="cursor-pointer text-gray-700 font-medium">Aturan Fuzzy yang Digunakan</summary>
              <ul class="mt-3 list-disc ml-5 text-sm text-gray-700 space-y-1">
                <li>IF gejala utama TINGGI → risiko GERD TINGGI</li>
                <li>IF gejala utama SEDANG AND faktor risiko ada → risiko GERD SEDANG</li>
                <li>IF semua indikator RENDAH → risiko GERD RENDAH</li>
              </ul>
            </details>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              @click="showResultModal = false"
              class="btn btn-primary text-white px-8"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>

      <footer class="mt-6 text-center text-sm text-gray-500">
        Kategori: Rendah (0-4) | Sedang (4-7) | Tinggi (7-10)
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from 'vue'

// Input state with new variables
const inputs = reactive({
  nyeriUluHati: 'Kadang',
  rasaAsamMulut: 'Kadang',
  sendawaKembung: 'Kadang',
  mualMuntah: 'Kadang',
  tidurSetelahMakan: 'Kadang',
  polaMakan: 'Teratur',
  konsumsiPemicu: 'Kadang',
  kesulitanMenelan: 'Tidak Pernah',
  tingkatStres: 'Sedang',
  beratBadanBerlebih: 'Tidak',
})

// Modal states
const showConfirmModal = ref(false)
const showResultModal = ref(false)

// Output
const result = reactive({ score: 0, category: '' })
const fuzzyOutput = reactive({ rendah: 0, sedang: 0, tinggi: 0 })

// Convert linguistic values to numeric scores
function toNumeric(value: string, type: string): number {
  const maps: Record<string, Record<string, number>> = {
    frequency3: { 'Jarang': 2, 'Kadang': 5, 'Sering': 8 },
    frequency2: { 'Tidak Pernah': 0, 'Kadang': 5, 'Sering': 9 },
    polaMakan: { 'Teratur': 2, 'Kadang Telat': 5, 'Tidak Teratur': 8 },
    stres: { 'Rendah': 2, 'Sedang': 5, 'Tinggi': 8 },
    beratBadan: { 'Tidak': 0, 'Sedikit': 5, 'Ya': 8 },
  }
  return maps[type]?.[value] ?? 5
}

// Membership functions
function trapezoid(x: number, a: number, b: number, c: number, d: number) {
  if (x <= a) return 0
  if (x >= d) return 0
  if (x >= b && x <= c) return 1
  if (x > a && x < b) return (x - a) / (b - a)
  return (d - x) / (d - c)
}

function triangle(x: number, a: number, b: number, c: number) {
  if (x <= a || x >= c) return 0
  if (x === b) return 1
  if (x > a && x < b) return (x - a) / (b - a)
  return (c - x) / (c - b)
}

function memLow(x: number) {
  return trapezoid(x, -1, 0, 2.5, 4)
}
function memMedium(x: number) {
  return triangle(x, 3, 5, 7)
}
function memHigh(x: number) {
  return trapezoid(x, 6, 7.5, 10, 11)
}

function outRendah(x: number) {
  return trapezoid(x, -1, 0, 2, 4)
}
function outSedang(x: number) {
  return triangle(x, 3, 5, 7)
}
function outTinggi(x: number) {
  return trapezoid(x, 6, 8, 10, 11)
}

function compute() {
  // Convert all inputs to numeric
  const numericInputs = [
    toNumeric(inputs.nyeriUluHati, 'frequency3'),
    toNumeric(inputs.rasaAsamMulut, 'frequency2'),
    toNumeric(inputs.sendawaKembung, 'frequency3'),
    toNumeric(inputs.mualMuntah, 'frequency2'),
    toNumeric(inputs.tidurSetelahMakan, 'frequency3'),
    toNumeric(inputs.polaMakan, 'polaMakan'),
    toNumeric(inputs.konsumsiPemicu, 'frequency3'),
    toNumeric(inputs.kesulitanMenelan, 'frequency2'),
    toNumeric(inputs.tingkatStres, 'stres'),
    toNumeric(inputs.beratBadanBerlebih, 'beratBadan'),
  ]

  // Calculate average input
  const avgInput = numericInputs.reduce((a, b) => a + b, 0) / numericInputs.length

  const mems = numericInputs.map(v => ({ 
    low: memLow(v), 
    med: memMedium(v), 
    high: memHigh(v) 
  }))

  const anyHigh = Math.max(...mems.map(m => m.high))
  const anyMed = Math.max(...mems.map(m => m.med))
  const medActivated = Math.max(0, anyMed - anyHigh)
  const allLow = Math.min(...mems.map(m => m.low))

  fuzzyOutput.tinggi = anyHigh
  fuzzyOutput.sedang = Math.max(fuzzyOutput.sedang, medActivated)
  fuzzyOutput.rendah = Math.max(fuzzyOutput.rendah, allLow)

  const aggregated = (x: number) => Math.max(
    Math.min(fuzzyOutput.rendah, outRendah(x)),
    Math.min(fuzzyOutput.sedang, outSedang(x)),
    Math.min(fuzzyOutput.tinggi, outTinggi(x))
  )

  const samples = 200
  let num = 0
  let den = 0
  for (let i = 0; i <= samples; i++) {
    const x = (i / samples) * 10
    const mu = aggregated(x)
    num += x * mu
    den += mu
  }
  const crisp = den === 0 ? 0 : num / den
  result.score = crisp

  if (crisp < 4) result.category = 'Rendah'
  else if (crisp < 7) result.category = 'Sedang'
  else result.category = 'Tinggi'
}

function confirmCalculate() {
  showConfirmModal.value = false
  compute()
  showResultModal.value = true
}

function reset() {
  inputs.nyeriUluHati = 'Kadang'
  inputs.rasaAsamMulut = 'Kadang'
  inputs.sendawaKembung = 'Kadang'
  inputs.mualMuntah = 'Kadang'
  inputs.tidurSetelahMakan = 'Kadang'
  inputs.polaMakan = 'Teratur'
  inputs.konsumsiPemicu = 'Kadang'
  inputs.kesulitanMenelan = 'Tidak Pernah'
  inputs.tingkatStres = 'Sedang'
  inputs.beratBadanBerlebih = 'Tidak'
  result.score = 0
  result.category = ''
  fuzzyOutput.rendah = 0
  fuzzyOutput.sedang = 0
  fuzzyOutput.tinggi = 0
  showResultModal.value = false
}

const badgeClass = computed(() => {
  if (result.category === 'Rendah') return 'badge-success'
  if (result.category === 'Sedang') return 'badge-warning'
  return 'badge-error'
})
</script>

<style scoped>
/* Smooth modal animations */
</style>