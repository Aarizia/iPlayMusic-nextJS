import CategoriesDetails from '@/components/categories-details';
import './_categories-page.scss';
import { getCategories } from '@/utility/getSpotifyData';

export const metadata = {
    title: 'Categories'
}

export default async function CategoriesPage() {

    const data = await getCategories();

    if (!data) {
        notFound();
    }

    return data ? (
        <main className='categories'>
            {/* <h2 className='categories__title'>Categories</h2> */}
            {data ?
                <CategoriesDetails data={data} />
            :
                <p>No categories</p>
            }
        </main>
    ) : null;
}