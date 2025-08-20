import { getCurrentUsersPlaylists } from "@/utility/getSpotifyData";

// fetche på clientside komponent og holde access token serverside/hemmelig

export async function GET(request) {

    
    //return Response.json({message: id});
    //const id = request.nextUrl.searchParams.get('code');

    // lav fetch til api med access token
    const data = await getCurrentUsersPlaylists();
    
    return Response.json(data);
}