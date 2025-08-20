import './_playlists-page.scss';
import ImageSlider from '@/components/image-slider';
import PlayerSmall from '@/components/players/player-small';
import SoundWave from './sound-wave.svg';
import BackgroundImage from '@/components/background-image';
import SiteHeader from '@/components/site-header';
import Playlist from '@/components/playlist';

export const metadata = {
    title: 'Playlists'
}

export default async function PlaylistsPage() {

    return (
        <>
        <BackgroundImage imageUrl={SoundWave.src} />
        <SiteHeader backgroundImage={true} />
        <main className="playlists">
            <h2 className='playlists__heading light-text'>Playlists</h2>
            <ImageSlider />
            <Playlist />
            <PlayerSmall />
        </main>
        </>
    )
}