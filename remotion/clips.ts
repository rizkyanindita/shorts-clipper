import type { ShortClipProps } from "./ShortClip";

export type Clip = ShortClipProps & {
  /** Nama composition sekaligus nama file hasil render. Hanya huruf, angka, dan "-". */
  id: string;
};

export type Source = {
  /** Judul video aslinya. */
  title: string;
  /** Nama channel pemilik video, persis seperti tertulis di YouTube. */
  channel: string;
  /** Handle YouTube pemiliknya, diawali "@". */
  handle: string;
  url: string;
};

// Asal tiap file di `remotion/public`. Dipakai untuk menulis kredit ke pemilik video
// di caption upload, jadi isi setiap kali menambah video sumber baru.
export const SOURCES: Record<string, Source> = {
  "v8qO0stlmws.mp4": {
    title: "perawatan harian pleci sahdu",
    channel: "OmAcuz Dextro87 channel",
    handle: "@Dextro87OmAcuzDX87",
    url: "https://www.youtube.com/watch?v=v8qO0stlmws",
  },
};

// Satu entri = satu Short. Tambah entri baru untuk tiap potongan yang mau dibuat.
export const CLIPS: Clip[] = [
  // zoom dan focusX diatur supaya logo channel di kanan atas video tetap utuh, dan pada
  // dua klip pertama banner "Step N" bawaan video tidak terpotong.
  {
    id: "pleci-air-mineral",
    src: "v8qO0stlmws.mp4",
    start: "0:51.3",
    end: "1:24.6",
    title: "Kenapa pleci mandi pakai air mineral?",
    zoom: 1.2,
    focusX: 0.69,
  },
  {
    id: "pleci-lama-jemur",
    src: "v8qO0stlmws.mp4",
    start: "1:48.6",
    end: "2:39.4",
    title: "Berapa lama jemur pleci?",
    zoom: 1.2,
    focusX: 0.69,
  },
  {
    id: "pleci-jeruk",
    src: "v8qO0stlmws.mp4",
    start: "5:10.1",
    end: "5:31.0",
    title: "Kapan pleci boleh dikasih jeruk?",
    zoom: 1.35,
    focusX: 0.8,
  },
  {
    id: "pleci-jangkrik-pinset",
    src: "v8qO0stlmws.mp4",
    start: "5:31.6",
    end: "6:27.9",
    title: "Kenapa jangkrik dikasih pakai pinset?",
    zoom: 1.35,
    focusX: 0.8,
    // Dirapikan dari caption otomatis YouTube, yang banyak salah dengar di bagian ini.
    captions: [
      { start: "5:31.9", end: "5:37.1", text: "Setelah itu, kasih EF (extra fooding)" },
      { start: "5:37.1", end: "5:41.4", text: "Bisa pakai jangkrik" },
      { start: "5:41.4", end: "5:48.1", text: "Saya pakai jangkrik, karena ada arwana juga" },
      { start: "5:48.1", end: "5:50.8", text: "Jadi saya jarang pakai ulat hongkong" },
      { start: "5:50.8", end: "5:59.3", text: "Ulat hongkong juga bisa, yang putih" },
      { start: "6:00.0", end: "6:08.6", text: "Jangkrik biasanya saya kasih 5 ekor" },
      { start: "6:09.2", end: "6:12.4", text: "Tergantung perawatan harian" },
      { start: "6:13.2", end: "6:18.1", text: "Usahakan kasih EF pakai pinset" },
      { start: "6:18.1", end: "6:20.8", text: "Biar burung tidak terlalu jinak" },
      { start: "6:20.8", end: "6:27.6", text: "Kalau pakai tangan, burung jadi jinak" },
    ],
  },
  {
    id: "pleci-burung-nembak",
    src: "v8qO0stlmws.mp4",
    start: "7:49.9",
    end: "8:49.1",
    title: "Burung tipe nembak, susah stabil",
    zoom: 1.35,
    focusX: 0.8,
  },
  {
    id: "pleci-mandi-cepuk-kecil",
    src: "v8qO0stlmws.mp4",
    start: "10:41.4",
    end: "11:05.6",
    title: "Mandi pakai cepuk kecil, ini alasannya",
    zoom: 1.1,
    focusX: 0.35,
  },
];
