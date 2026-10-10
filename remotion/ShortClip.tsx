import {
  AbsoluteFill,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";

// Video sumber diasumsikan landscape 16:9 (standar YouTube).
const SOURCE_ASPECT = 16 / 9;

const captionSchema = z.object({
  /** Waktu pada video sumber (bukan dihitung dari awal klip), formatnya sama dengan `start`/`end` klip. */
  start: z.string(),
  end: z.string(),
  text: z.string(),
});

export const shortClipSchema = z.object({
  /** Nama file di `remotion/public`, atau URL langsung ke file video. */
  src: z.string(),
  /** Titik potong pada video sumber: "mm:ss" atau "h:mm:ss". */
  start: z.string(),
  end: z.string(),
  /** Teks di bagian atas. Kosongkan kalau tidak perlu. */
  title: z.string(),
  /** 1 = seluruh frame landscape terlihat; makin besar makin dekat, 3.2 = layar penuh. */
  zoom: z.number().min(1).max(3.2).step(0.05),
  /** Bagian yang dipertahankan saat sisi kiri-kanan terpotong: 0 = kiri, 1 = kanan. */
  focusX: z.number().min(0).max(1).step(0.01),
  /** Subtitle di bawah video. Boleh tidak diisi. */
  captions: z.array(captionSchema).optional(),
});

export type ShortClipProps = z.infer<typeof shortClipSchema>;

/** "1:23" → 83, "1:02:03" → 3723, "45" → 45. */
export function parseTime(value: string): number {
  return value.split(":").reduce((total, part) => total * 60 + Number(part), 0);
}

export function ShortClip({ src, start, title, zoom, focusX, captions }: ShortClipProps) {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const video = src.startsWith("http") ? src : staticFile(src);
  const trimBefore = Math.round(parseTime(start) * fps);

  const frameHeight = Math.min(height, (width / SOURCE_ASPECT) * zoom);
  const bandHeight = (height - frameHeight) / 2;

  const sourceTime = parseTime(start) + frame / fps;
  const caption = captions?.find(
    (c) => sourceTime >= parseTime(c.start) && sourceTime < parseTime(c.end),
  );

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {/* Pengisi area atas-bawah: video yang sama, diperbesar lalu diburamkan. */}
      {bandHeight > 0 ? (
        <OffthreadVideo
          muted
          src={video}
          trimBefore={trimBefore}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "blur(40px) brightness(0.55)",
            transform: "scale(1.15)",
          }}
        />
      ) : null}

      <AbsoluteFill style={{ justifyContent: "center" }}>
        <OffthreadVideo
          src={video}
          trimBefore={trimBefore}
          style={{
            width: "100%",
            height: frameHeight,
            objectFit: "cover",
            objectPosition: `${focusX * 100}% 50%`,
          }}
        />
      </AbsoluteFill>

      {title ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            // Saat layar penuh tidak ada area buram, jadi judul menumpang di atas video.
            height: Math.max(bandHeight, 420),
            padding: "0 70px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            color: "white",
            fontFamily: "system-ui, sans-serif",
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.15,
            textShadow: "0 4px 24px rgba(0, 0, 0, 0.8)",
          }}
        >
          {title}
        </div>
      ) : null}

      {caption ? (
        <div
          style={{
            position: "absolute",
            // Tepat di bawah video, tapi tidak lebih rendah dari 74% tinggi layar:
            // di bawah itu tertutup judul dan nama channel pada tampilan Shorts.
            top: Math.min(height - bandHeight + 40, height * 0.74),
            left: 0,
            right: 0,
            // Sisi kanan Shorts dipakai deretan tombol like/komentar.
            padding: "0 120px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              padding: "14px 30px",
              borderRadius: 18,
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              color: "white",
              fontFamily: "system-ui, sans-serif",
              fontSize: 54,
              fontWeight: 700,
              lineHeight: 1.25,
              textAlign: "center",
              textWrap: "balance",
            }}
          >
            {caption.text}
          </span>
        </div>
      ) : null}
    </AbsoluteFill>
  );
}
