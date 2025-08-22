import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

async function getSpotifyData( endpoint, searchParams = {}) {
    
    const cookieStore = await cookies();
    const access_token = cookieStore.get('iplaymusic_access_token');
    
    const BASE_API_URL = 'https://api.spotify.com/v1/';
    const options = {
        headers: {
            'Authorization': `Bearer ${access_token.value}`
        }
    }

    const API_URL = new URL(endpoint, BASE_API_URL);
    Object.keys(searchParams).forEach(key => API_URL.searchParams.append(key, searchParams[key]));

    try {
        const response = await fetch(API_URL, options);
        
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.log('response status: ', response);
            return false;
        }

    } catch (error) {
        console.error(error);
        throw new Error;
    }
}

const getNewAlbumReleases = () => getSpotifyData('browse/new-releases');
const getCurrentUsersPlaylists = () => getSpotifyData('me/playlists');
const getCategories = () => getSpotifyData('browse/categories');
const getCurrentUsersPlaylistTracksById = id => getSpotifyData(`playlists/${id}/tracks`);
const getSingleAlbum = id => getSpotifyData(`albums/${id}`);
const getSingleTrack = id => getSpotifyData(`tracks/${id}`);
const getSingleArtist = id => getSpotifyData(`artists/${id}`);
const getSearchResults = query => getSpotifyData(`search?q=${query}&type=album`);

export {
    getNewAlbumReleases,
    getCurrentUsersPlaylists,
    getCategories,
    getCurrentUsersPlaylistTracksById,
    getSingleAlbum,
    getSingleTrack,
    getSingleArtist,
    getSearchResults
}