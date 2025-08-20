'use client';

import { createContext, useEffect, useState } from "react";

export const IsPlayingContext = createContext();

export default function IsPlaying({ children }) {

    const [currentTrackData, setCurrentTrackData] = useState(null);
    const [currentArtistData, setCurrentArtistData] = useState(null);
    //const [currentAlbumData, setCurrentAlbumData] = useState(null);

    console.log('track:', currentTrackData);

    useEffect(() => {
        
        currentTrackData && fetch(`/api/artists-id/${currentTrackData?.artists[0]?.id}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log('artist:', data);
            setCurrentArtistData(data);
        });
    }, [currentTrackData]);

    return (
        <IsPlayingContext.Provider value={{ currentTrackData, setCurrentTrackData, currentArtistData, setCurrentArtistData, /* currentAlbumData, setCurrentAlbumData */ }}>
            {children}
        </IsPlayingContext.Provider>
    )

}