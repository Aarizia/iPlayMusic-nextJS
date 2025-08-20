import Link from 'next/link';
import './_featured-album-card.scss';
import Image from 'next/image';

export default function FeaturedAlbumCard({ data }) {

    return (
        <li className='featured-album-card'>
            <Link href={`/album/${data?.id}`} className='featured-album-card__link'>
                {data?.images[0].url &&
                    <Image
                        src={data?.images[0]?.url}
                        height={data?.images[0]?.height}
                        width={data?.images[0]?.width}
                        alt={data?.name}
                        className='featured-album-card__image'
                    />
                }
                <div className='featured-album-card__gradient-canvas'></div>
                <div className='featured-album-card__text-container'>
                    <h3>{data?.name}</h3>
                    <p className='featured-album-card__text'>{data?.album_type}</p>
                </div>
            </Link>
        </li>
    )
}