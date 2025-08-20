'use client';

import { createContext, useState } from "react";

export const playerContextEksempel = createContext(null);

export default function PlayerProviderEksempel({ children }) {

    // vise og skjule overlay: vi bruger et state, som håndterer om overlayet skal være vist eller ej
    const [showPlayer, setShowPlayer] = useState(false);

    // vi skal vide, hvilket track, vi skal spille:
    const [currentTrack, setCurrentTrack] = useState(null);

    return (
        <playerContextEksempel.Provider value={{ showPlayer, setShowPlayer, currentTrack, setCurrentTrack }}>
            {children}
        </playerContextEksempel.Provider>
    );
}