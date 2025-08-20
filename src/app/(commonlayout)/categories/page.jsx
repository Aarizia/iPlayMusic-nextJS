import CategoriesDetails from '@/components/categories-details';
import './_categories-page.scss';
import PlayerSmall from '@/components/players/player-small';
import { getCategories } from '@/utility/getSpotifyData';

export const metadata = {
    title: 'Categories'
}

export default async function CategoriesPage() {

    const data = await getCategories();

    return (
        <main className='categories'>
            <h2 className='categories__title'>Categories</h2>
            {data ?
                <CategoriesDetails data={data} />
            :
                <p>No categories</p>
            }
            <PlayerSmall />
        </main>
    )
}