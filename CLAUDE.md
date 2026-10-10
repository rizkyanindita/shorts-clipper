# shorts-clipper

Memotong video landscape YouTube menjadi klip 9:16 untuk YouTube Shorts dan TikTok, dirender dengan Remotion. Jawab user dalam Bahasa Indonesia.

## Perintah

- `npm run studio` — pratinjau klip dan geser `zoom`/`focusX` lewat slider.
- `npm run render -- <id>` — render satu klip ke `out/<id>.mp4`.
- `npm run render:all` — render semua klip di `remotion/clips.ts`.

## Alur menambah video baru

1. Cek dulu judul, channel, durasi, dan ukuran dengan `yt-dlp --skip-download`, lalu unduh video beserta caption-nya:
   `yt-dlp -f "bv*[vcodec^=avc1][height<=1080]+ba[ext=m4a]/b[ext=mp4]/b" --merge-output-format mp4 --write-subs --write-auto-subs --sub-langs "id,id-orig" --sub-format json3 -o "remotion/public/%(id)s.%(ext)s" <url>`
2. Tambahkan entri `SOURCES` di `remotion/clips.ts` (judul, nama channel, handle, URL). Kredit di caption upload dibaca dari sini.
3. Baca caption ber-timestamp (`*.id-orig.json3` punya waktu per kata), pilih potongan 20–60 detik yang maknanya utuh, lalu tambahkan ke `CLIPS`.
4. Periksa beberapa frame tiap klip dan atur `zoom`/`focusX` supaya logo channel pemilik video dan banner teks bawaan tidak terpotong separuh.
5. Isi `captions` dari transcript yang sudah dirapikan. Caption otomatis YouTube sering salah dengar, jadi sebutkan ke user bagian mana yang meragukan.
6. Render, lalu jalankan skill `upload-caption` untuk teks unggahannya.

## Catatan

- `remotion/public/` dan `out/` tidak masuk git: isinya video sumber dan hasil render.
- Semua paket `remotion` dan `@remotion/*` harus berada di versi yang sama persis, karena itu versinya ditulis tanpa `^`.
- Render memakai dua salinan video per frame (latar buram dan video utama), kira-kira 10 frame per detik di mesin ini.
