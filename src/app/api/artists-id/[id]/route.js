import { getSingleArtist } from "@/utility/getSpotifyData";

export async function GET(request, {params}) {

    const {id} = await params;
    const data = await getSingleArtist(id);
    
    return Response.json(data);
}