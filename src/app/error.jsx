'use client';

import Heading from "@/components/heading";
import { useEffect } from "react"

export default function Error({ error, reset }) {

    useEffect(() => {
        // fejlen logges til consollen:
        console.error(error);
    }, [error]);

    return (
        <>
            <Heading>Oops, something went wrong</Heading>
            <button onClick={() => reset()}>Try again</button>
            {/* onClick kører eventhandler funktion, her er den anonym, som så kører reset funktionen*/}
        </>
    )
}