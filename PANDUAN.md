# Contekan perintah

Perintah yang dipakai berulang. Semua perintah terminal dijalankan dari folder project:

```bash
cd /Users/64664/pribadi/shorts-clipper
```

## Di terminal

Lihat daftar id klip yang ada:

```bash
npx remotion compositions
```

Buka pratinjau untuk mengatur crop (`zoom`, `focusX`):

```bash
npm run studio
```

Render ulang satu klip (ganti `pleci-jeruk` dengan id klipnya):

```bash
npm run render -- pleci-jeruk
```

Render ulang semua klip:

```bash
npm run render:all
```

Buka folder hasil di Finder:

```bash
open out
```

Simpan perubahan ke GitHub:

```bash
git add -A && git commit -m "update klip" && git push
```

## Di chat Claude Code

Buka folder project ini di Claude Code, lalu ketik:

| Mau apa | Yang diketik |
|---|---|
| Klip baru dari video YouTube | `buat 6 klip dari https://www.youtube.com/watch?v=...` |
| Teks unggahan semua klip | `/upload-caption` |
| Teks unggahan satu klip | `/upload-caption pleci-jeruk` |
| Tambah subtitle ke satu klip | `revisi klip pleci-jeruk, tambahkan subtitle dari transcript` |
| Geser crop | `geser crop klip pleci-jeruk ke kiri` |
| Ubah titik potong | `klip pleci-jeruk mulai dari 5:12 sampai 5:30` |
| Ganti judul di video | `ganti judul klip pleci-jeruk jadi "..."` |

## Urutan tiap kali bikin konten

1. Chat Claude: kirim link dan jumlah klip.
2. Tonton hasilnya di folder `out` (`open out`).
3. Kalau ada yang kurang pas, minta revisi di chat, atau ubah sendiri di `remotion/clips.ts` lalu render ulang klip itu.
4. Chat Claude: `/upload-caption`.
5. Unggah `out/<id>.mp4`, salin teksnya dari `out/<id>.txt`.

## Kalau mengubah sendiri

Semua pengaturan klip ada di `remotion/clips.ts`. Setelah mengubah, render ulang klip yang diubah saja.

| Yang diubah | Kolomnya |
|---|---|
| Titik potong | `start`, `end` (format `"mm:ss"` atau `"mm:ss.d"`) |
| Judul di atas video | `title` |
| Besar video | `zoom` (`1` kecil dengan latar buram, `3.2` layar penuh) |
| Geser kiri atau kanan | `focusX` (`0` kiri, `1` kanan) |
| Subtitle | `captions` |
