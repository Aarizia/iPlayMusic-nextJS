'use client';

import { useContext, useRef } from 'react';
import './_image-slider.scss';
import Image from 'next/image';
import { PlaylistContext } from '@/providers/Playlist';


export default function ImageSlider() {

    const playlist = useContext(PlaylistContext);
    const galleryRef = useRef();
    let timeOut = 0;
    
    function scrollHandler() {
        
        clearTimeout(timeOut);
        timeOut = setTimeout(() => {

            const numberOfSlides = playlist.currentUsersPlaylistsData.items.length;
            const sliderFullWidth = galleryRef.current?.scrollWidth;
            const currentScroll = galleryRef.current?.scrollLeft;
            const scrollPercentage = currentScroll/sliderFullWidth;
            const centeredSlide = Math.round(scrollPercentage * numberOfSlides);
            playlist.setCurrentSlide(centeredSlide);
            playlist.setCurrentPlaylistId(playlist.currentUsersPlaylistsData?.items[centeredSlide]?.id);
            playlist.setCurrentPlaylistName(playlist.currentUsersPlaylistsData?.items[centeredSlide]?.name);
        }, 1000);
    }

    return (
        <div className='playlists__gallery'>
            <ul ref={galleryRef} className='gallery' onScroll={scrollHandler}>
                {playlist.currentUsersPlaylistsData?.items?.map(playlist => {
                    return (
                        <li key={playlist.id} className='gallery__item scroll-scale'>
                            <Image 
                                className='gallery__image' 
                                src={playlist.images[0].url} 
                                width={100}
                                height={100}
                                alt={playlist.name} 
                            />
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}