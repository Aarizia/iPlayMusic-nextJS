'use client';

import { useContext } from 'react';
import './_playlist.scss';
import TrackCard from '../cards/track-card';
import { PlaylistContext } from '@/providers/Playlist';
import { IsPlayingContext } from '@/providers/IsPlaying';


export default function Playlist() {
    
    const playlist = useContext(PlaylistContext);
    const isPlaying = useContext(IsPlayingContext);
    //console.log(playlist?.trackList?.items[0].track);

    return (
        playlist.noPlaylists ?
        <h3 className='playlist__title light-text'>No playlists</h3>
        :
        <section className='playlist'>
                <h3 className='playlist__title'>{playlist?.currentPlaylistName}</h3>
                <ul className='playlist__list'>
                    {playlist?.currentPlaylistId &&
                        playlist?.trackList?.items?.map((element, index) => <TrackCard key={index} data={element.track} />)
                    }
                </ul>
            <button className='playlist__button' onClick={() => isPlaying.setCurrentTrackData(playlist?.trackList?.items[0].track)}>Play all</button>
        </section>
    )
}