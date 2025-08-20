'use client';

import { playerContextEksempel } from "@/providers/PlayerProviderEks";
import { useContext, useEffect } from "react";

export default function PlayerEksempel() {

    // destrukturere context objektet for bare at få den property, jeg skal bruge
    const { showPlayer, currentTrack } = useContext(playerContextEksempel);

    // få lyd på:
    // problem: spotify har opdaget ai - mange ai modeller bruger spotifys musik som træning til at lave musik og det kan spotify ikke lide
    // normalt: når du bruger spotifys api uden at betale plejer du at kunne høre 30 sec af musikken uden at betale. det er nu fjerner pga ai
    // det er en property under track, der hedder preview_url, som nu er null
    useEffect(() => {

        console.log('current track:', currentTrack);
    }, [currentTrack]);

    // hvad hedder showplayer ? noget : noget andet ?
    // conditional rendering i formen ternary operator
    return showPlayer ? (
        // lave den lille player, som skal vises nede i bunden
        // ligge fremme: højt z-index og position fixed
        // vi skal også have vist og skjult det. hvis du trykker på et track skal det vises og ellers være skjult. brug context
        // to sidestillede komponenter, der skal kommunikere med hinanden: vi bruger context
        <section className="bg-linear-to-br from-pink-500 to-orange-500 w-[90%] h-24 z-100 fixed bottom-20 mx-[5%] rounded-md">
            <p>{currentTrack.name}</p>
        </section>
    ) : null;
}