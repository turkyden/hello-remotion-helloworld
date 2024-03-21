import {Composition, staticFile} from 'remotion';
import {HelloWorld, myCompSchema} from './HelloWorld';
import {Logo, myCompSchema2} from './HelloWorld/Logo';
import {
	NBAVideo,
	calculateNBAVideoMetadata,
	NBAVideoSchema,
} from './NBAVideo';

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="NBAVideo16v9"
				component={NBAVideo}
				calculateMetadata={calculateNBAVideoMetadata}
				schema={NBAVideoSchema}
				width={1920}
				height={1080}
				defaultProps={{
					src: staticFile('nba.mov'),
					src_fire: staticFile('focus.gif'),
					remotion: '16:9'
				}}
			/>
			<Composition
				// You can take the "id" to render a video:
				// npx remotion render src/index.ts <id> out/video.mp4
				id="HelloWorld"
				component={HelloWorld}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				// You can override these props for each render:
				// https://www.remotion.dev/docs/parametrized-rendering
				schema={myCompSchema}
				defaultProps={{
					titleText: 'Welcome to Remotion 111',
					titleColor: '#000000',
					logoColor1: '#91EAE4',
					logoColor2: '#86A8E7',
				}}
			/>
			{/* Mount any React component to make it show up in the sidebar and work on it individually! */}
			<Composition
				id="OnlyLogo"
				component={Logo}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				schema={myCompSchema2}
				defaultProps={{
					logoColor1: '#91dAE2' as const,
					logoColor2: '#86A8E7' as const,
				}}
			/>
		</>
	);
};
