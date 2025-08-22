'use client';

import { IoIosArrowBack } from "react-icons/io";
import { IoIosSearch } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import './site-header.scss';
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function SiteHeader({ backgroundImage, isPlayer = false, dispatch = function() {} }) {

    const pathname = usePathname();
    const router = useRouter();
    const [title, setTitle] = useState(null);
    const [searchActive, setSearchActive] = useState(false);

    useEffect(() => {
        switch (true) {
            
            case pathname === '/':
                setTitle('Featured');
                break;

            case pathname === '/login':
                setTitle('Login');
                break;

            case pathname === '/albums':
                setTitle('Albums');
                break;

            case pathname === '/playlists':
                setTitle('Playlists');
                break;

            case pathname === '/categories':
                setTitle('Categories');
                break;

            case pathname === '/player':
                setTitle('Playing ');
                break;

            case /^\/album\/[a-zA-Z0-9]+$/.test(pathname):
                setTitle('Album');
                break;
        }
    }, [pathname]);

    return (
        <header className={backgroundImage ? 'light-text' : ''}>
            {isPlayer ? 
                <button className="header__button">
                    <IoChevronDown className="header__icon" onClick={() => dispatch({ type: 'setPlayerSmall' })} />
                </button>
            :
                <button className="header__button" onClick={() => router.back()}>
                    <IoIosArrowBack className="header__icon" />
                </button>
            }
            <h1>{title}</h1>
            {isPlayer ?
                <></>
            :
                <button className="header__button" onClick={() => setSearchActive(true)}><IoIosSearch className="header__icon" /></button>
            }
        </header>
    )
}