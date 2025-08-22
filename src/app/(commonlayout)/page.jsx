import './_featured-page.scss';
import FeaturedAlbumCard from "@/components/cards/featured-album-card";
import { getNewAlbumReleases } from '@/utility/getSpotifyData';
import { notFound } from 'next/navigation';

export const metadata = {
    title: 'Featured'
}

export default async function FeaturedPage() {

    //const [featuredData, setFeaturedData] = useState(data);
    //const [listItems, setListItems] = useState([]);

    // bruge rigtig data fra api'et
    // kan vi fra et serverside component læse cookies? ja vi kan læse http cookies i server components (se next docs under cookies)
    // tage fat i cookien:
/*     const cookieStore = await cookies();
    const access_token = cookieStore.get('iplaymusic_access_token');


    const response = await fetch('https://api.spotify.com/v1/browse/new-releases', {
        headers: {
            // basic token: brugernavn og adg. kode. 
            // bearer token: hemmelig frase, aftalt mellem clienten og spotifys authentication server
            // forskel mellem authentication og authorization:
            // authentication: jeg skal bevise hvem jeg er
            //B authorization: jeg skal bevise at jeg har ret til det jeg prøver at få fat i
            'Authorization': `Bearer ${access_token.value}`
        }
    });

    console.log(response)
    const data = await response.json();
    console.log(data); */
    const data = await getNewAlbumReleases();

    if (!data) {
        notFound();
    }

    return data ? (
        <main className="featured">
            {/* <h2>Featured</h2> */}
            <ul className="featured__list">
                {data?.albums?.items.map(album => <FeaturedAlbumCard key={album.id} data={album} />)}
            </ul>
        </main>
    ) : null;
}