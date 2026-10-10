---
name: upload-caption
description: Tulis teks unggahan (judul, deskripsi, caption, hashtag) untuk YouTube Shorts dan TikTok dari klip di remotion/clips.ts, lengkap dengan kredit ke pemilik video asli, lalu simpan di samping file videonya. Pakai skill ini setiap kali user mau mengunggah klip, minta caption, judul, deskripsi, atau hashtag untuk Shorts atau TikTok, bilang "siap upload", "buatkan caption", "teks postingan", atau baru selesai merender klip dan belum punya teks unggahannya, walaupun user tidak menyebut kata "skill".
argument-hint: "[id-klip, kosongkan untuk semua klip]"
---

# Caption upload untuk YouTube Shorts dan TikTok

Klip di repo ini adalah potongan video milik kreator lain yang diberi judul dan subtitle, bukan rekaman user sendiri. User membangun akun di niche burung kicau dengan tujuan endorse dan afiliasi. Dua hal itu menentukan isi caption:

- **Kredit ke pemilik video ada di setiap unggahan.** Tanpa kredit, klip terlihat seperti mengaku-aku karya orang, dan pemilik video lebih mungkin meminta takedown. Kredit juga mengarahkan penonton ke video lengkapnya.
- **Tetap di niche burung.** Brand pakan, vitamin, dan sangkar mencari akun dengan penonton yang jelas. Kata kunci dan hashtag yang melompat-lompat mengaburkan itu.

## Langkah

1. **Tentukan klipnya.** Argumen: `$ARGUMENTS`. Kalau berisi id klip, kerjakan klip itu. Kalau kosong, kerjakan semua entri `CLIPS`. Kalau user menyebut nama file di `out/`, cocokkan dengan `id`.
2. **Baca bahannya** di `remotion/clips.ts`: `title`, `start`, `end`, `captions`, dan `src` klip, lalu `SOURCES[src]` untuk nama channel, handle, judul, dan URL video asli.
3. **Pahami isi klip.** `title` dan `captions` biasanya cukup. Kalau perlu lebih detail, baca transcript `remotion/public/<id-video>.id-orig.json3` pada rentang `start`–`end` (tiap `events[]` punya `tStartMs` dan `segs[].utf8`). Transcript otomatis sering salah dengar, jadi pakai untuk memahami topik, bukan untuk dikutip mentah.
4. **Kalau `SOURCES[src]` belum ada**, jangan menebak nama channel: salah kredit lebih buruk daripada kredit yang telat. Id video sama dengan nama file tanpa ekstensi, jadi ambil datanya dengan
   `yt-dlp --skip-download --print channel --print uploader_id --print title "https://www.youtube.com/watch?v=<id>"`,
   tambahkan ke `SOURCES`, baru lanjut.
5. **Tulis teksnya** mengikuti format di bawah.
6. **Simpan** ke `out/<id>.txt`, di samping `out/<id>.mp4`, supaya teks dan videonya ketemu di satu folder saat mengunggah. Tampilkan juga di chat dalam blok kode agar mudah disalin.
7. **Sebutkan bagian yang meragukan**: klaim yang kamu ambil dari transcript tapi tidak yakin benar, supaya user bisa memeriksanya sebelum mengunggah.

## Aturan isi

- **Hanya nyatakan yang memang ada di klip.** Penonton hobi cepat tahu kalau judulnya berlebihan, dan caption yang melenceng berarti memelintir ucapan pemilik video. Kalau tidak yakin apa yang diucapkan, tulis lebih umum, jangan mengarang detail.
- **Jangan memberi kesan ini rekaman user.** Tulis "menurut Om Acuz" atau "cara Om Acuz", bukan "burung saya" atau "cara saya".
- **Tidak menjanjikan hasil** seperti "pasti gacor". Ini saran perawatan dari satu orang, bukan jaminan.
- **Bahasa Indonesia santai** gaya komunitas kicau mania. Istilah hobi (EF, gacor, jemur, masteran, cepuk) dibiarkan apa adanya karena itu kata yang dicari penontonnya.
- **Hashtag 3 sampai 5**, dari yang paling spesifik (jenis burung, topik klip) ke yang umum (`#kicaumania`). Jangan menumpang hashtag trending yang tidak berhubungan.
- **Tanpa emoji dan tanpa promosi produk**, kecuali user memintanya.
- Boleh satu ajakan follow singkat di akhir caption TikTok. Lebih dari itu terasa memaksa.

## Format YouTube Shorts

- **Judul**: batas YouTube 100 karakter, tapi usahakan di bawah 60 supaya tidak terpotong di layar. Isinya pancingan ditambah jenis burungnya. Boleh berbeda dari judul di dalam video. Jangan huruf kapital semua.
- **Deskripsi**: satu atau dua kalimat ringkasan isi klip, lalu kredit, lalu hashtag.
- **Kredit**: tulis handle dan nama channel pemilik, judul video aslinya, dan URL-nya. Tautan di deskripsi Shorts tidak bisa diklik, jadi nama channel dan judul video harus cukup jelas untuk dicari manual; URL tetap ditulis sebagai rujukan.

## Format TikTok

- **Satu blok caption**: kalimat pembuka yang memancing, kira-kira di bawah 100 karakter karena TikTok memotong caption panjang; satu kalimat isi; kredit; hashtag.
- **Kredit**: tautan tidak bisa diklik di caption TikTok, jadi tulis "YouTube" diikuti nama channel pemilik, dan ajak menonton versi lengkapnya di sana.

## Templat `out/<id>.txt`

```
=== YOUTUBE SHORTS ===
Judul:
<judul>

Deskripsi:
<ringkasan 1-2 kalimat>

Sumber: <handle> (<nama channel>)
Video lengkap: "<judul video asli>"
<url>

<hashtag>

=== TIKTOK ===
<pembuka> <satu kalimat isi>

Sumber: YouTube <nama channel>, video "<judul video asli>". Tonton versi lengkapnya di sana.

<hashtag>
```

## Contoh

Klip `pleci-jangkrik-pinset`, sumber video "perawatan harian pleci sahdu" dari OmAcuz Dextro87 channel:

```
=== YOUTUBE SHORTS ===
Judul:
Kasih Jangkrik ke Pleci Pakai Pinset, Ini Alasannya

Deskripsi:
Om Acuz memberi EF jangkrik pakai pinset, bukan tangan, supaya pleci tidak terlalu jinak. Biasanya 5 ekor, tergantung perawatan harian.

Sumber: @Dextro87OmAcuzDX87 (OmAcuz Dextro87 channel)
Video lengkap: "perawatan harian pleci sahdu"
https://www.youtube.com/watch?v=v8qO0stlmws

#pleci #burungpleci #perawatanpleci #efburung #kicaumania

=== TIKTOK ===
Kenapa jangkrik buat pleci dikasih pakai pinset, bukan tangan? Menurut Om Acuz, supaya burungnya tidak terlalu jinak.

Sumber: YouTube OmAcuz Dextro87 channel, video "perawatan harian pleci sahdu". Tonton versi lengkapnya di sana.

#pleci #burungpleci #perawatanpleci #efburung #kicaumania
```
