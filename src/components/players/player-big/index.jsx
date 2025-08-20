'use client';

import SvgLinearGradient from '@/components/svg-linear-gradient';
import convertDuration from '@/utility/convertDuration';
import ArtistPlaceholderImage from './artist-placeholder-image.svg';
import './_player-big.scss';
import { FaFastBackward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { FaFastForward } from "react-icons/fa";
import { useContext } from 'react';
import { IsPlayingContext } from '@/providers/IsPlaying';

export default function PlayerBig(data) {

    const isPlaying = useContext(IsPlayingContext);
    console.log('albumdata:', data)

    return (
        <div className={`playing ${(data?.album?.images[0].url ? 'light-text' : '')}`}>
            {data?.album?.images[0].url ?
                <div className='playing__image-container'>
                    <div className='playing__overlay-canvas'>
                        <div className='playing__overlay-canvas--medium'>
                            <div className='playing__overlay-canvas--small'>
                            </div>
                        </div>
                    </div>
                    <img className='playing__image' src={isPlaying?.currentArtistData?.images[0]?.url} alt={isPlaying?.currentArtistData?.name} />                  
                </div>
            :
                <img src={ArtistPlaceholderImage.src} className='playing__placeholder-image' alt="placeholder-image" />
            }
            <section className='player'>
                <h2 className={`font-size-small ${(data?.album?.images[0]?.url ? 'light-text' : 'non-gradient')}`}>{isPlaying?.currentTrackData?.name}</h2>
                <p className='player__artist'>{isPlaying?.currentTrackData?.artists.map(artist => artist?.name)}</p>
                <div className='player__line'></div>
                <div className='player__duration'>
                    <p className='player__currentTime'>0:00</p>
                    <p className='player__maxTime'>{convertDuration(isPlaying?.currentTrackData?.duration_ms)}</p>
                </div>
                <nav className='player__menu'>
                    {data?.album?.images[0]?.url ? 
                        <button className='player__button'><FaFastBackward /></button>
                    :
                        <button className='player__button'>
                            <SvgLinearGradient width='24px' height='22px'>
                                <FaFastBackward />
                            </SvgLinearGradient>
                        </button>
                    }
                    <button className='player__button'><FaBackward /></button>
                    {data?.album?.images[0]?.url ?
                        <button className='player__button player__button--big'>
                            <div className='player__button-icon-container'>
                                <FaPlay className='player__button-icon'/>
                            </div>
                        </button>
                    :
                        <button className='player__button player__button--big-gradient-fill'>
                            <SvgLinearGradient>
                                <FaPlay />
                            </SvgLinearGradient>
                        </button>
                    }
                    <button className='player__button'><FaForward /></button>
                    {data?.album?.images[0]?.url ? 
                        <button className='player__button'><FaFastBackward /></button>
                    :
                        <button className='player__button'>
                            <SvgLinearGradient width='24px' height='22px'>
                                <FaFastForward />
                            </SvgLinearGradient>
                        </button>
                    }
                </nav>
            </section>
        </div>
    )
}