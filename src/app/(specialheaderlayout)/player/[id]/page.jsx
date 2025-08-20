import BackgroundImage from "@/components/background-image"
import SiteHeader from "@/components/site-header"
import './_player-page.scss'
import { getSingleTrack } from "@/utility/getSpotifyData";
import PlayerBig from "@/components/players/player-big";

export default async function PlayerPage({ params }) {

    const {id} = await params;
    const data = await getSingleTrack(id);

    return (
        <>
            <BackgroundImage imageUrl={data.album.images[0].url ? data.album.images[0].url : false /* placeholder med streger */} height='100vh' blur='1px' gradientCanvas={true} /> 
            <SiteHeader title="Playing" isPlayer={true} backgroundImage={data.album.images[0].url ? true : false} />
            {data &&
                <PlayerBig data={data} />
            }
        </>
    )
}