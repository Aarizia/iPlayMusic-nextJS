import BackgroundImage from '@/components/background-image';
import SiteHeader from '@/components/site-header';
import './_album-details-page.scss';
import PlayerSmall from '@/components/players/player-small';
import TrackCard from '@/components/cards/track-card';
import Link from 'next/link';
import { getSingleAlbum } from '@/utility/getSpotifyData';
import { shortenText } from '@/utility/textHelper';

// situation med dynamisk data, der skal bestemme, hvad titlen er
// brug generateMetadata funktionen:
export async function generateMetadata({ params }) {
    
    const {id} = await params;
    const data = await getSingleAlbum(id);
    return {
        title: data.name
    }

}

export default async function AlbumDetailsPage({ params }) {

    const {id} = await params;
    const data = await getSingleAlbum(id);
    //console.log(data);

    return (
        data &&
        <>
            <BackgroundImage imageUrl={data?.images[0].url} aspectRatio='0.9375' gradientCanvas={true} />
            <SiteHeader backgroundImage={true} />
            <main className='album'>
                <div className='album__details light-text'>
                    <div className='album__text'>
                        <h2 className='light-text'>{shortenText(data?.name, 47)}</h2>
                        {(data?.total_tracks === 1) ?
                            <p className='album__number-of-tracks'>{data?.total_tracks} track</p>
                            :
                            <p className='album__number-of-tracks'>{data?.total_tracks} tracks</p>
                        }
                    </div>
                    <div className='genres'>
                        {data?.genres.length > 0 &&
                        <>
                            <p className='genres__text'>Genres hashtags</p>
                            <ul className='genres__list'>
                                {data?.genres.map(genre => {
                                    return (
                                        <li key={genre}>
                                            <Link href={'#'} className='genres__link'>#{genre}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
                        }
                    </div>
                </div>
                <section className='album__tracks'>
                    <h3 className='album__tracks-heading'>All tracks</h3>
                    <ul className='album__tracks-list'>
                        {data?.tracks?.items.map(track => <TrackCard key={track.id} data={track} />)}
                    </ul>
                </section>
                <PlayerSmall />
            </main>
        </>
    )
}