type FuzzyValue = 'rendah' | 'sedang' | 'tinggi'

interface GejalaInput {
  rasaTerbakarDada: number
  nyeriUluHati: number
  mual: number
  seringSendawa: number
  sulitMenelan: number
}

interface FuzzyResult {
  nilai: number
  kategori: FuzzyValue
}

// --- Helper: Membership Function ---
function trapezoid(x: number, a: number, b: number, c: number, d: number): number {
  if (x <= a || x >= d) return 0
  else if (x >= b && x <= c) return 1
  else if (x > a && x < b) return (x - a) / (b - a)
  else if (x > c && x < d) return (d - x) / (d - c)
  return 0
}

// --- Himpunan Fuzzy (0–10) ---
function fuzzyRendah(x: number) {
  return trapezoid(x, 0, 0, 3, 5)
}

function fuzzySedang(x: number) {
  return trapezoid(x, 3, 5, 5, 7)
}

function fuzzyTinggi(x: number) {
  return trapezoid(x, 6, 8, 10, 10)
}

// --- Inferensi Rules (aturan dasar) ---
// Semakin banyak gejala tinggi, semakin tinggi risiko GERD
function inferensi(input: GejalaInput): FuzzyResult {
  const values = Object.values(input)
  const rata2 = values.reduce((a, b) => a + b, 0) / values.length

  // Derajat keanggotaan untuk hasil akhir
  const μRendah = fuzzyRendah(rata2)
  const μSedang = fuzzySedang(rata2)
  const μTinggi = fuzzyTinggi(rata2)

  // Defuzzifikasi sederhana (metode centroid diskret)
  const crisp = (μRendah * 3 + μSedang * 6 + μTinggi * 9) / (μRendah + μSedang + μTinggi || 1)

  let kategori: FuzzyValue = 'rendah'
  if (crisp >= 7) kategori = 'tinggi'
  else if (crisp >= 4) kategori = 'sedang'

  return { nilai: Number(crisp.toFixed(2)), kategori }
}

// --- Fungsi Utama ---
export function deteksiGERD(input: GejalaInput): FuzzyResult {
  return inferensi(input)
}
