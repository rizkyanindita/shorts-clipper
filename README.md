# shorts-clipper

Memotong video landscape YouTube menjadi klip 9:16 untuk YouTube Shorts dan TikTok. Videonya dirender dengan [Remotion](https://www.remotion.dev), dan teks unggahannya ditulis oleh skill Claude Code.

## Persiapan

Butuh Node.js 22 ke atas, `yt-dlp`, dan `ffmpeg`.

```bash
brew install yt-dlp ffmpeg
npm install
```

Render pertama akan mengunduh Chrome Headless Shell bawaan Remotion (sekitar 90 MB).

## Alur kerja

| Langkah | Yang dikerjakan | Di mana |
|---|---|---|
| 1 | Unduh video dan caption-nya | `remotion/public/` |
| 2 | Catat asal videonya | `SOURCES` di `remotion/clips.ts` |
| 3 | Tentukan potongannya | `CLIPS` di `remotion/clips.ts` |
| 4 | Lihat pratinjau, atur crop | `npm run studio` |
| 5 | Render jadi MP4 | `npm run render:all` |
| 6 | Buat teks unggahan | `/upload-caption` |

Langkah 1 sampai 3 dan 6 bisa diserahkan ke Claude Code: lihat [Bekerja dengan Claude Code](#bekerja-dengan-claude-code).

### 1. Unduh video

```bash
yt-dlp -f "bv*[vcodec^=avc1][height<=1080]+ba[ext=m4a]/b[ext=mp4]/b" --merge-output-format mp4 --write-subs --write-auto-subs --sub-langs "id,id-orig" --sub-format json3 -o "remotion/public/%(id)s.%(ext)s" "https://www.youtube.com/watch?v=ID_VIDEO"
```

Hasilnya `remotion/public/ID_VIDEO.mp4` dan file caption `.json3`. File caption `id-orig` memuat waktu per kata, berguna untuk menentukan titik potong.

### 2. Catat asal videonya

Tambahkan satu entri di `SOURCES`, dengan nama file sebagai kuncinya. Kredit di teks unggahan dibaca dari sini.

```ts
"ID_VIDEO.mp4": {
  title: "judul video aslinya",
  channel: "Nama Channel",
  handle: "@handlechannel",
  url: "https://www.youtube.com/watch?v=ID_VIDEO",
},
```

### 3. Tentukan potongannya

Satu entri di `CLIPS` sama dengan satu Short.

```ts
{
  id: "pleci-jeruk",
  src: "ID_VIDEO.mp4",
  start: "5:10.1",
  end: "5:31.0",
  title: "Kapan pleci boleh dikasih jeruk?",
  zoom: 1.35,
  focusX: 0.8,
  captions: [
    { start: "5:10.4", end: "5:16.0", text: "Biasanya saya pakai jeruk" },
  ],
},
```

| Kolom | Isi |
|---|---|
| `id` | Nama klip sekaligus nama file hasil. Hanya huruf, angka, dan `-`. |
| `src` | Nama file video di `remotion/public/`. |
| `start`, `end` | Titik potong pada video sumber: `"mm:ss"`, `"mm:ss.d"`, atau `"h:mm:ss"`. Durasi klip dihitung otomatis. |
| `title` | Teks di bagian atas layar. Isi `""` kalau tidak perlu. |
| `zoom` | `1` menampilkan seluruh frame landscape dengan latar buram; makin besar makin dekat; `3.2` memenuhi layar. |
| `focusX` | Bagian yang dipertahankan saat sisi kiri-kanan terpotong: `0` kiri, `0.5` tengah, `1` kanan. |
| `captions` | Subtitle di bawah video. Boleh tidak diisi. Waktunya mengacu ke video sumber, bukan ke awal klip. |

### 4. Pratinjau

```bash
npm run studio
```

Pilih klip di daftar kiri. Panel kanan punya slider `zoom` dan `focusX` untuk mencoba-coba. Slider tidak menyimpan otomatis: salin nilai yang cocok ke `clips.ts`.

Periksa dua hal di sini: logo channel pemilik video dan banner teks bawaan video jangan sampai terpotong separuh.

### 5. Render

```bash
npm run render:all
```

Hasilnya `out/<id>.mp4`, ukuran 1080×1920. Kecepatannya kira-kira 10 frame per detik, jadi klip 60 detik butuh sekitar 3 menit.

## Daftar perintah

| Perintah | Fungsi |
|---|---|
| `npm run studio` | Buka Remotion Studio untuk pratinjau dan mengatur crop. |
| `npm run render -- <id>` | Render satu klip, misalnya `npm run render -- pleci-jeruk`. |
| `npm run render:all` | Render semua klip di `clips.ts`. |
| `npx remotion compositions` | Tampilkan daftar `id` klip yang terdaftar. |
| `npx tsc --noEmit` | Cek salah ketik di `clips.ts` sebelum render. |

## Bekerja dengan Claude Code

Buka folder ini di Claude Code. `CLAUDE.md` sudah memuat alur kerjanya, jadi cukup beri perintah dengan bahasa biasa.

### Skill `upload-caption`

Menulis teks unggahan untuk YouTube Shorts dan TikTok, lalu menyimpannya sebagai `out/<id>.txt` di samping videonya.

| Perintah | Hasil |
|---|---|
| `/upload-caption` | Teks unggahan untuk semua klip. |
| `/upload-caption pleci-jeruk` | Teks unggahan untuk satu klip. |
| "buatkan caption upload" | Sama seperti di atas; skill terpanggil sendiri. |

Isi tiap file:

- **YouTube Shorts**: judul, deskripsi satu-dua kalimat, kredit ke pemilik video, dan hashtag.
- **TikTok**: satu blok caption dengan kredit dan hashtag.

Aturan yang dipegang skill ini: kredit ke pemilik video selalu ada, hanya menyatakan yang memang ada di klip, tidak memberi kesan videonya rekaman sendiri, dan 3 sampai 5 hashtag yang tetap di niche. Aturannya bisa diubah di `.claude/skills/upload-caption/SKILL.md`.

### Contoh perintah lain

| Yang diketik | Yang dikerjakan Claude |
|---|---|
| "buat 6 klip dari https://youtube.com/watch?v=..." | Unduh, pilih potongan dari transcript, isi `clips.ts`, render. |
| "revisi klip pleci-jeruk, tambahkan subtitle dari transcript" | Isi `captions` klip itu, lalu render ulang. |
| "geser crop klip pleci-jeruk ke kiri" | Ubah `focusX`, lalu render ulang. |
| "potong klip pleci-jeruk mulai 5:12" | Ubah `start`, lalu render ulang. |

Claude memilih potongan dari teks transcript, bukan dari gambar, dan caption otomatis YouTube sering salah dengar. Tonton hasilnya dan periksa subtitle sebelum mengunggah.

## Struktur folder

```
remotion/
  clips.ts         daftar klip (CLIPS) dan asal video (SOURCES)
  ShortClip.tsx    tata letak klip: video, latar buram, judul, subtitle
  Root.tsx         mendaftarkan tiap klip ke Remotion
  render-all.mjs   skrip render semua klip
  public/          video sumber dan caption (tidak masuk git)
out/               hasil render dan teks unggahan (tidak masuk git)
.claude/skills/    skill upload-caption
```

## Catatan

- **Hak cipta.** Pakai video milik sendiri atau yang pemiliknya mengizinkan, dan selalu cantumkan kredit. YouTube tidak memonetisasi konten yang diambil dari sumber lain tanpa tambahan orisinal yang berarti.
- **Panjang klip.** YouTube Shorts menerima video sampai 3 menit; klip 20 sampai 60 detik biasanya paling aman.
- **Versi Remotion.** Semua paket `remotion` dan `@remotion/*` harus berada di versi yang sama persis.
- **Lisensi Remotion.** Gratis untuk perorangan dan tim kecil; perusahaan di atas ukuran tertentu perlu lisensi berbayar.
