'use client';

import './_player-small.scss';
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6";
import { useContext } from "react";
import PlaceholderImage from './artist-placeholder-image.svg';
import { IsPlayingContext } from '@/providers/IsPlaying';
import convertDuration from '@/utility/convertDuration';
import Link from 'next/link';
import { shortenArray, shortenText } from '@/utility/textHelper';

export default function PlayerSmall() {

    const isPlaying = useContext(IsPlayingContext);
    let currentTime = 126;

    if (currentTime > isPlaying?.currentTrackData?.duration_ms) {
        currentTime = isPlaying?.currentTrackData?.duration_ms - 300;
    }

    return (
        isPlaying.currentArtistData &&
        <article className="player-small">
            <button className="player-small__button" style={{backgroundImage: `url(${isPlaying.currentArtistData?.images[0].url ? isPlaying.currentArtistData?.images[0].url : PlaceholderImage.src})`}}>
                    <div className="player-small__icon-container">
                        <FaPause className="player-small__icon"/>
                    </div>
            </button>
            <Link href={`/player/${isPlaying?.currentTrackData?.id}`} className='player-small__link-title'>
                <p className="player-small__text player-small__title">
                    {shortenText(isPlaying.currentTrackData.name, 17)}
                </p>
            </Link>
            <Link href={`/player/${isPlaying.currentTrackData.id}`} className='player-small__link-artist'>
                <p className="player-small__text player-small__artist">
                    {isPlaying?.currentTrackData.artists?.length === 1 ?
                        isPlaying.currentTrackData.artists?.map(artist => shortenText(artist.name, 30))
                    :
                        /* isPlaying.currentTrackData.artists?.map(artist => `${artist.name}, `) */
                        shortenArray(isPlaying.currentTrackData.artists, 'name', 25)
                    }
                </p>
            </Link>
            <Link href={`/player/${isPlaying?.currentTrackData?.id}`} className='player-small__link-duration'>
                <p className="player-small__text player-small__duration">
                    {`${convertDuration(currentTime)} / ${convertDuration(isPlaying.currentTrackData.duration_ms)}`} </p>
            </Link>
        </article>
    )
}