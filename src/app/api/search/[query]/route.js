import { getSearchResults } from "@/utility/getSpotifyData";


export async function GET(request, {params}) {

    const {query} = await params;
    const data = await getSearchResults(query);
    
    return Response.json(data);
}