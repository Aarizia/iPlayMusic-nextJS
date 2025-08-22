'use client';

import Link from "next/link";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoIosArrowForward } from "react-icons/io";
import './_categories-details.scss';
import NewReleasesAlbumCard from "../cards/new-releases-album-card";

export default function CategoriesDetails({ data }) {

    const [currentCategory, setCurrentCategory] = useState({});

    async function clickHandler(name) {

        if (!name) {
            setCurrentCategory({
                albums: {
                    items: [{
                        id: 1,
                        name: 'Not found',
                        /* images: [{
                            url: null,
                        }] */
                    }]
                }
            });
            return;
        }
        
        const response = await fetch(`api/search/${name}`);
        const categoryData = await response.json();

        //console.log(categoryData);
        setCurrentCategory(categoryData);
    }

    return (
        <div className='categories__details-container'>
            {data?.categories?.items.map(category => {
                return (
                    <details className='categories__details' key={category.id} name='detailsElement' onClick={() => clickHandler(category?.name)}>
                        <summary className='categories__summary'>
                            {category?.name}
                            <HiOutlineDotsHorizontal className='categories__summary-icon' />
                        </summary>
                        <ul className='categories__list'>
                            {currentCategory?.albums?.items.map(album => {
                                return <NewReleasesAlbumCard key={album.id} data={album} />
                                    {/* <li key={album.id} className='categories__item'>
                                        <Link href={'#'} className='categories__link'>
                                            {album?.artists?.length === 1 ?
                                                album?.artists?.map(artist => shortenText(artist.name, 30))
                                            :
                                                shortenArray(album?.artists, 'name', 38)
                                            }
                                            {album?.name}
                                            <IoIosArrowForward className='categories__item-icon' />
                                        </Link>
                                    </li> */}
                            })}
                        </ul>
                    </details>
                )
            })}
            {/* <details onClick={() => clickHandler(null)}>{currentCategory?.albums?.items[0]?.name}</details> */}
        </div>
    )
}