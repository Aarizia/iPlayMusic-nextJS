'use client';

import './_track-card.scss';
import { FaPlay } from "react-icons/fa";
import { useContext } from 'react';
import { IsPlayingContext } from '@/providers/IsPlaying';
import convertDuration from '@/utility/convertDuration';
import { shortenArray, shortenText } from '@/utility/textHelper';
import { playerContextEksempel } from '@/providers/PlayerProviderEks';

export default function TrackCard({ data }) {

    const isPlaying = useContext(IsPlayingContext);
    //console.log(data);
    const { setShowPlayer, setCurrentTrack } = useContext(playerContextEksempel);

    // en clickhandler må godt være asynkron
    function clickHandler(event) {
        setShowPlayer(true);
        setCurrentTrack(data);
    }

    return (
/*         <li className='track-card'>
            <button className='track-card__button' onClick={() => isPlaying.setCurrentTrackData(data)}>
                <div className='track-card__icon-container'>
                    <FaPlay />
                </div>
                <h4 className='track-card__title'>{shortenText(data?.name, 25)}</h4>
                {data?.artists?.length === 1 ?
                    <p className='track-card__artist'>{data?.artists?.map(artist => shortenText(artist.name, 30))}</p>
                :
                    <p className='track-card__artist'>{shortenArray(data?.artists, 'name', 38)}</p>
                }
                <p className='track-card__duration'>{convertDuration(data?.duration_ms)}</p>
            </button>
        </li> */
        <li className='track-card'>
            <button onClick={clickHandler} className='track-card__button-big'>
                <article className='track-card__container'>
                    <button className="track-card__round-button">
                        <FaPlay />
                    </button>
                    <h4 className='track-card__title'>{shortenText(data?.name, 25)}</h4>
                    {data?.artists?.length === 1 ?
                        <p className='track-card__artist'>{data?.artists?.map(artist => shortenText(artist.name, 30))}</p>
                    :
                        <p className='track-card__artist'>{shortenArray(data?.artists, 'name', 38)}</p>
                    }
                    <p className='track-card__duration'>{convertDuration(data?.duration_ms)}</p>
                </article>
            </button>
        </li>
    )
}