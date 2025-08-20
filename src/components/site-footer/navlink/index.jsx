'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import './_nav-link.scss';
import Link from 'next/link';
import SvgLinearGradient from '@/components/svg-linear-gradient';
import { HiCollection } from "react-icons/hi";
import { BiSolidPlaylist } from "react-icons/bi";
import { GiTwirlCenter } from "react-icons/gi";
import { MdCategory } from "react-icons/md";

export default function SiteFooterNavLink({ slug }) {

    const segment = useSelectedLayoutSegment();
    const isActive = (slug === segment) /* || (null === segment); */
    let isHomePage = null;

    if (segment !== null) {
        isHomePage = false;
        //console.log(isHomePage);
    }

    if (isActive === false && segment === null) {
        isHomePage = true;
        //console.log(isHomePage);
    }
    let icon = null;

    switch (slug) {
        case 'albums':
            icon = <HiCollection className='menu__icon' />;
            break;
        case 'playlists':
            icon = <BiSolidPlaylist className='menu__icon' />;
            break;
        case 'categories':
            icon = <MdCategory className='menu__icon' />;
            break;
        case '':
            icon = <GiTwirlCenter className='menu__icon' />;
            break;
    }

    return (
            <Link href={`/${slug}`} className={(isActive ? "active" : "not-active") /* + (isHomePage ? 'active' : 'not-active') */}>
                {(icon && isActive) ?
                    icon
                :
                icon && 
                    (<SvgLinearGradient>
                        {icon}
                    </SvgLinearGradient>)
                }
            </Link>
    )
}