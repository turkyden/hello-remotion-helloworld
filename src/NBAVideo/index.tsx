import {
  AbsoluteFill,
  CalculateMetadataFunction,
  OffthreadVideo,
} from 'remotion';
import { z } from 'zod';
import { getVideoMetadata } from '@remotion/media-utils';

export type SubtitleProp = {
  offsets: {
    from: number;
    to: number;
  };
  text: string;
};

export const NBAVideoSchema = z.object({
  src: z.string(),
});

export const calculateNBAVideoMetadata: CalculateMetadataFunction<
  z.infer<typeof NBAVideoSchema>
> = async ({ props }) => {
  const fps = 30;
  const metadata = await getVideoMetadata(props.src);

  return {
    fps,
    durationInFrames: Math.floor(metadata.durationInSeconds * fps),
  };
};

export const NBAVideo: React.FC<{
  src: string;
}> = ({ src }) => {

  return (
    <AbsoluteFill style={{
      backgroundColor: 'white', 
      position: 'absolute',
      top: 0, 
      left: -1600,
      width: '400%',
      height: '100%',
      objectFit: 'cover',
    }}>
      <OffthreadVideo
        style={{
          objectFit: 'cover',
        }}
        src={src}
      />
    </AbsoluteFill>
  );
};
