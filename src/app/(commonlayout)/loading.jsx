import './_featured-page.scss';

function SkeletonCard() {
    return (
        <li className='featured-album-card'>
                <div className='featured-album-card__gradient-canvas'></div>
                <div className='featured-album-card__text-container'>
                    <h3></h3>
                    <p className='featured-album-card__text'></p>
                </div>
        </li>
    )
}

export default function FeaturedLoading() {

    return (
        <main className='featured'>
            <h2>Featured</h2>
            <ul>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
            </ul>
        </main>
    )
}