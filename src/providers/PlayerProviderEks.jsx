'use client';

import { createContext, useEffect, useState } from "react";

export const playerContextEksempel = createContext(null);

export default function PlayerProviderEksempel({ children }) {

    // vise og skjule overlay: vi bruger et state, som håndterer om overlayet skal være vist eller ej
    const [showPlayer, setShowPlayer] = useState(false);

    // vi skal vide, hvilket track, vi skal spille:
    const [currentTrack, setCurrentTrack] = useState(null);
    const [albumCover, setAlbumCover] = useState(null);
    const [currentArtist, setCurrentArtist] = useState(null);
    const [noArtist, setNoArtist] = useState(false);

    useEffect(() => {
        
        currentTrack && fetch(`/api/artists-id/${currentTrack?.artists[0]?.id}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            //console.log('artist:', data);
            setCurrentArtist(data);
            setNoArtist(false);
        })
        .catch(error => {
            console.error('fetch current tracks artist error: ', error);
            setNoArtist(true);
        });
    }, [currentTrack]);

    return (
        <playerContextEksempel.Provider value={{ showPlayer, setShowPlayer, currentTrack, setCurrentTrack, albumCover, setAlbumCover, currentArtist, setCurrentArtist }}>
            {children}
        </playerContextEksempel.Provider>
    );
}