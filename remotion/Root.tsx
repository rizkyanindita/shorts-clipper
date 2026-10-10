import { Composition, type CalculateMetadataFunction } from "remotion";
import { CLIPS } from "./clips";
import { parseTime, ShortClip, shortClipSchema, type ShortClipProps } from "./ShortClip";

const FPS = 30;

// Durasi tiap klip dihitung dari `start` dan `end`, jadi tidak perlu diisi manual.
const calculateMetadata: CalculateMetadataFunction<ShortClipProps> = ({ props }) => {
  const seconds = parseTime(props.end) - parseTime(props.start);

  if (!(seconds > 0)) {
    throw new Error(
      `Waktu potong tidak valid: start "${props.start}", end "${props.end}". Pakai format "mm:ss" dan pastikan end lebih besar dari start.`,
    );
  }

  return { durationInFrames: Math.round(seconds * FPS) };
};

export function RemotionRoot() {
  return (
    <>
      {CLIPS.map(({ id, ...props }) => (
        <Composition
          key={id}
          id={id}
          component={ShortClip}
          schema={shortClipSchema}
          defaultProps={props}
          calculateMetadata={calculateMetadata}
          width={1080}
          height={1920}
          fps={FPS}
        />
      ))}
    </>
  );
}
