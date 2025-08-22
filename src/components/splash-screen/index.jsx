'use client';

import LogoLight from './music-logo-solid.png';
import LogoDark from './music-logo.png';
import './_splash-screen.scss';
import { useContext, useEffect } from 'react';
import { ThemeContext } from '@/providers/Theme';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function SplashScreen() {

    const router = useRouter();

    useEffect(() => {

        setTimeout( () => {
            //console.log('redirected');
            router.push('/');
        }, 2000);
    }, []);

    const theme = useContext(ThemeContext);

    return (
        <>
            {theme.currentTheme === 'light' ?
                <div className='splash-screen'>
                    <Image
                        className='splash-screen__image-light' 
                        src={LogoLight.src} 
                        height={216}
                        width={200}
                        alt="logo" 
                    />
                    <h1 className='splash-screen__heading'>iPlayMusic</h1>
                </div>
            :
                <div className='splash-screen'>
                    <Image
                        className='splash-screen__image-dark' 
                        src={LogoDark.src}
                        height={216}
                        width={200}
                        alt="logo" 
                    />
                    <h1 className='splash-screen__heading'>iPlayMusic</h1>
                </div>
            }
        </>
    )
}