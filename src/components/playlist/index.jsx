'use client';

import { useContext } from 'react';
import './_playlist.scss';
import TrackCard from '../cards/track-card';
import { PlaylistContext } from '@/providers/Playlist';

export default function Playlist() {
    
    const { noPlaylists, noTracks, trackList, playlists, currentPlaylistName } = useContext(PlaylistContext);

    return (
        noPlaylists ?
            <h3 className='playlist__title light-text'>No playlists</h3>
        :
            <section className='playlist'>
                    {noTracks ?
                        <h3 className='playlist__title'>Not found</h3>
                    :
                        <>
                            <h3 className='playlist__title'>{currentPlaylistName}</h3>
                            <ul className='playlist__list'>
                                    {trackList?.items?.map((element, index) => <TrackCard key={index} data={element.track} albumCover={element.track.album?.images[0]} />)}
                            </ul>
                            <button className='playlist__button' /* onClick={() => isPlaying.setCurrentTrackData(trackList?.items[0].track)} */>Play all</button>
                        </>
                    }
            </section>
    )
}