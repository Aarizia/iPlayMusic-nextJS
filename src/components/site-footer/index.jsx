'use client';

import Link from "next/link";
import DarkmodeCheckbox from "../darkmode-checkbox";
import { usePathname } from "next/navigation";
import './_site-footer.scss';
import { useEffect, useState } from "react";
import SvgLinearGradient from "../svg-linear-gradient";
import { HiCollection } from "react-icons/hi";
import { BiSolidPlaylist } from "react-icons/bi";
import { GiTwirlCenter } from "react-icons/gi";
import { MdCategory } from "react-icons/md";

export default function SiteFooter() {

    const pathname = usePathname();
    const [albumsIsActive, setAlbumsIsActive] = useState(false);
    const [playlistsIsActive, setPlaylistsIsActive] = useState(false);
    const [featuredIsActive, setFeaturedIsActive] = useState(false);
    const [categoriesIsActive, setCategoriesIsActive] = useState(false);

    useEffect(() => {

        setAlbumsIsActive(false);
        setPlaylistsIsActive(false);
        setFeaturedIsActive(false);
        setCategoriesIsActive(false);
        
        if (pathname.includes('/album')) setAlbumsIsActive(true) 
        if (pathname.includes('/playlists')) setPlaylistsIsActive(true);
        if (pathname.includes('/categories')) setCategoriesIsActive(true);
        if (pathname === '/') setFeaturedIsActive(true);
        
    }, [pathname]);

    return (
        <footer>
            <nav>
                <ul className='menu__list'>
                    <li className='menu__item'>
                        <Link href='/albums' className={(albumsIsActive ? 'active' : 'not-active')}>
                            {albumsIsActive ?
                                <HiCollection className='menu__icon' />
                            :
                                <SvgLinearGradient>
                                    <HiCollection className='menu__icon' />           
                                </SvgLinearGradient>
                            }
                        </Link>
                    </li>
                    <li className='menu__item'>
                        <Link href='/playlists' className={(playlistsIsActive ? 'active' : 'not-active')}>
                            {playlistsIsActive ?
                                <BiSolidPlaylist className='menu__icon' />
                            :
                                <SvgLinearGradient>
                                    <BiSolidPlaylist className='menu__icon' />         
                                </SvgLinearGradient>
                            }
                        </Link>
                    </li>
                    <li className='menu__item'>
                        <Link href='/' className={(featuredIsActive ? 'active' : 'not-active')}>
                            {featuredIsActive ?
                                <GiTwirlCenter className='menu__icon' />
                            :
                                <SvgLinearGradient>
                                    <GiTwirlCenter className='menu__icon' />       
                                </SvgLinearGradient>
                            }
                        </Link>
                    </li>
                    <li className='menu__item'>
                        <Link href='/categories' className={(categoriesIsActive ? 'active' : 'not-active')}>
                            {categoriesIsActive ?
                                <MdCategory className='menu__icon' />
                            :
                                <SvgLinearGradient>
                                    <MdCategory className='menu__icon' />      
                                </SvgLinearGradient>
                            }
                        </Link>
                    </li>
                    <li className='menu__item'>
                        <DarkmodeCheckbox />
                    </li>
                </ul>
            </nav>
        </footer>
    )
}