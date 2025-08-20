import Link from 'next/link';
import './_new-releases-album-card.scss';
import Image from 'next/image';
import { shortenArray, shortenText } from '@/utility/textHelper';

export default function NewReleasesAlbumCard({ data }) {
    //data && console.log(data.images[0]);
    //data && console.log(data.artists);

    return (
        <li className='new-releases-album-card'>
            <Link href={`/album/${data.id}`} className='new-releases-album-card__link'>
                <Image 
                    src={data.images[0].url} 
                    alt={data.name} 
                    className='new-releases-album-card__image' 
                    height={data.images[0].height}
                    width={data.images[0].width}
                />
                <h4 className='new-releases-album-card__title'>{shortenText(data.name)}</h4>
                {data.artists.length === 1 ?
                    <p  className='new-releases-album-card__artist'>{data.artists.map(artist => shortenText(artist.name, 28))}</p>
                :
                    <p className='new-releases-album-card__artist'>{shortenArray(data.artists, 'name', 28)}</p>
                }
                {(data?.total_tracks === 1) ?
                    <p className='new-releases-album-card__tracks'>{data.total_tracks} track</p>
                :
                    <p className='new-releases-album-card__tracks'>{data.total_tracks} tracks</p>
                }
            </Link>
        </li>
    )
}