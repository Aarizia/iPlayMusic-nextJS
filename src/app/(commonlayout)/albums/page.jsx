import './_albums-page.scss';
import Link from 'next/link';
import NewReleasesAlbumCard from '@/components/cards/new-releases-album-card';
import { getNewAlbumReleases } from '@/utility/getSpotifyData';
import Image from 'next/image';

export const metadata = {
    title: 'Albums'
}

export default async function AlbumsPage() {

    const data = await getNewAlbumReleases();

    if (!data) {
        notFound();
    }

    return data ? (
        <main className="albums">
            {/* <h2 className='albums__title'>All Albums</h2> */}
            <section className='albums-featured'>
                <h3 className='albums__heading'>Featured Albums</h3>
                <Link href={'/'} className='albums__link'>View All</Link>
                <ul className='albums-featured__list'>
                    {data?.albums?.items.map(album => {
                        return (
                            <li key={album.id} className='albums-featured__item'>
                                <Link href={`/album/${album?.id}`}>
                                    <Image
                                        src={album.images[0].url} 
                                        height={album.images[0].height}
                                        width={album.images[0].width}
                                        alt={album.name} 
                                        className='albums-featured__image' 
                                    />
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </section>
            <section className='albums-new-releases'>
                <h3 className='albums__heading'>New Releases</h3>
                <Link href={'/'} className='albums__link'>View All</Link>
                <ul className='albums-new-releases__list'>
                    {data?.albums?.items.map(album => {
                        return (
                            <NewReleasesAlbumCard key={album.id} data={album} className='albums-new-releases__item' />
                        )
                    })}
                </ul>
            </section>
        </main>
    ) : null;
}