'use client';

import './_site-footer.scss';
import DarkmodeCheckbox from '../darkmode-checkbox';
import SiteFooterNavLink from './navlink';

export default function SiteFooter() {

    return (
        <footer>
            <nav>
                <ul className='menu__list'>
                    <li className='menu__item'>
                        <SiteFooterNavLink slug='albums' />
                    </li>
                    <li className='menu__item'>
                        <SiteFooterNavLink slug='playlists' />
                    </li>
                    <li className='menu__item'>
                        <SiteFooterNavLink slug='' />
                    </li>
                    <li className='menu__item'>
                        <SiteFooterNavLink slug='categories' />
                    </li>
                    <li className='menu__item'>
                        <DarkmodeCheckbox />
                    </li>
                </ul>
            </nav>
        </footer>
    )
}