'use client';

import { createContext, useEffect, useState } from "react";

export const PlaylistContext = createContext();

export default function Playlist({ children }) {

    const [playlists, setPlaylists] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(null);
    const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
    const [currentPlaylistName, setCurrentPlaylistName] = useState(null);
    const [trackList, setTrackList] = useState(null);
    const [noPlaylists, setNoPlaylists] = useState(false);
    const [noTracks, setNoTracks] = useState(false);

    useEffect(() => {

        fetch('/api/me-playlists')
        .then(response => {
            return response.json();
        })
        .then(data => {
            setPlaylists(data);
            setCurrentPlaylistId(data?.items[0]?.id);
            setCurrentPlaylistName(data?.items[0]?.name);
            setNoPlaylists(false);
        })
        .catch(error => {
            console.error('fetch current users playlists error: ', error);
            setNoPlaylists(true);
        });

    }, []);

    useEffect(() => {

        currentPlaylistId && fetch(`/api/playlist-id-tracks/${currentPlaylistId}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setTrackList(data);
            setNoTracks(false);
        })
        .catch(error => {
            console.error('fetch current playlists tracks error: ', error);
            setNoTracks(true);
        })

    }, [currentPlaylistId]);

    return (
        <PlaylistContext.Provider value={{ playlists, setPlaylists, currentSlide, setCurrentSlide, currentPlaylistId, setCurrentPlaylistId, currentPlaylistName, setCurrentPlaylistName, trackList, setTrackList, noPlaylists, setNoPlaylists, noTracks, setNoTracks }}>
            {children}
        </PlaylistContext.Provider>
    )

}