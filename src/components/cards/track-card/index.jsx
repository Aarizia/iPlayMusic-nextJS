'use client';

import './_track-card.scss';
import { FaPlay } from "react-icons/fa";
import { useContext } from 'react';
import { shortenArray, shortenText } from '@/utility/textHelper';
import { playerContextEksempel } from '@/providers/PlayerProviderEks';
import { convertDuration } from '@/utility/convertDuration';

export default function TrackCard({ data, albumCover }) {

    const { setShowPlayer, setCurrentTrack, setAlbumCover } = useContext(playerContextEksempel);

    // en clickhandler må godt være asynkron
    function clickHandler(event) {
        setShowPlayer(true);
        setCurrentTrack(data);
        setAlbumCover(albumCover);
    }

    return (
        <li className='track-card'>
            <article className='track-card__container'>
                <button onClick={clickHandler} className="track-card__button-round">
                    <FaPlay />
                </button>
                <button onClick={clickHandler} className='track-card__button-big'>
                    <h4 className='track-card__title'>{shortenText(data?.name, 23)}</h4>
                    {data?.artists?.length === 1 ?
                        <p className='track-card__artist'>{data?.artists?.map(artist => shortenText(artist?.name, 30))}</p>
                    :
                        <p className='track-card__artist'>{shortenArray(data?.artists, 'name', 30)}</p>
                    }
                    <p className='track-card__duration'>{convertDuration(data?.duration_ms)}</p>
                </button>
            </article>
        </li>
    )
}