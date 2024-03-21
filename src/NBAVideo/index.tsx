import {
  AbsoluteFill,
  CalculateMetadataFunction,
  OffthreadVideo,
  Sequence,
  Img,
  Audio,
  interpolate, staticFile
} from 'remotion';
import { z } from 'zod';
import { getVideoMetadata } from '@remotion/media-utils';

export const NBAVideoSchema = z.object({
  src: z.string(),
  src_fire: z.string(),
  remotion: z.string()
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
  src_fire: string,
  remotion: string
}> = ({ src, src_fire, remotion }) => {
  // const videoStyle = {
  //   backgroundColor: 'white', 
  //   position: 'absolute',
  //   top: 0, 
  //   left: -1600, 
  //   width: '400%',
  //   height: '100%',
  //   objectFit: 'cover',
  // };
  return (
    <AbsoluteFill style={{backgroundColor: 'white'}}>
      <Sequence from={0}>
        <AbsoluteFill style={{ 
          position: 'absolute',
          backgroundColor: 'black', 
          top: 0, 
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
        }}>
          <OffthreadVideo
            // startFrom={60} endAt={120}
            style={{
              objectFit: 'cover',
            }}
            src={src}
          />
        </AbsoluteFill>
      </Sequence>
      <Sequence name='扣篮特效 1' from={297} durationInFrames={50}>
        <AbsoluteFill style={{
          position: 'absolute',
          top: 0, 
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}>
          <Img src={src_fire} />
        </AbsoluteFill>
      </Sequence>
      <Sequence name='扣篮特效 2' from={473} durationInFrames={50}>
        <AbsoluteFill style={{
          position: 'absolute',
          top: 0, 
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}>
          <Img src={src_fire} />
        </AbsoluteFill>
      </Sequence>
      <Sequence name='扣篮音效 1' from={297}>
        <Audio volume={4} src={staticFile("ball.m4a")} startFrom={30} />
      </Sequence>
      <Sequence name='扣篮音效 2' from={473}>
        <Audio volume={4} src={staticFile("niubi.m4a")} startFrom={30} />
      </Sequence>
      <Sequence from={-20}>
        <Audio volume={0.2} src={staticFile("background.mp3")} />
      </Sequence>
    </AbsoluteFill>
  );
};
