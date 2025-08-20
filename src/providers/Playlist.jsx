'use client';

import { createContext, useEffect, useState } from "react";

export const PlaylistContext = createContext();

export default function Playlist({ children }) {

    const [currentUsersPlaylistsData, setCurrentUsersPlaylistsData] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(null);
    const [currentPlaylistId, setCurrentPlaylistId] = useState(null);
    const [currentPlaylistName, setCurrentPlaylistName] = useState(null);
    const [trackList, setTrackList] = useState(null);
    const [noPlaylists, setNoPlaylists] = useState(false);

    useEffect(() => {

        fetch('/api/me-playlists')
        .then(response => {
            return response.json();
        })
        .then(data => {
            if (!data) {
                setNoPlaylists(true);
                return;
            }
            setCurrentUsersPlaylistsData(data);
            setCurrentPlaylistId(data?.items[0]?.id);
            setCurrentPlaylistName(data?.items[0]?.name);
        });

    }, []);

    useEffect(() => {
        currentPlaylistId && fetch(`/api/playlist-id-tracks/${currentPlaylistId}`)
        .then(response => {
            return response.json()
        })
        .then(data => 
            setTrackList(data)
        );
    }, [currentPlaylistId]);

    return (
        <PlaylistContext.Provider value={{ currentUsersPlaylistsData, setCurrentUsersPlaylistsData, currentSlide, setCurrentSlide, currentPlaylistId, setCurrentPlaylistId, currentPlaylistName, setCurrentPlaylistName, trackList, setTrackList, noPlaylists, setNoPlaylists }}>
            {children}
        </PlaylistContext.Provider>
    )

}