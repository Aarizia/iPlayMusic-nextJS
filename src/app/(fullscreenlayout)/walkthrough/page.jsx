'use client';

import ColorBlob from './Asset3.svg';
import './_walkthrough-page.scss';
import { GiResonance } from "react-icons/gi";
import { IoIosHeart } from "react-icons/io";
import { IoMusicalNote } from "react-icons/io5";
import { useContext, useRef, useState } from 'react';
import BackgroundImage from '@/components/background-image';
import Link from 'next/link';
import { ThemeContext } from '@/providers/Theme';

export const metadata = {
    title: 'Walkthrough'
}

export default function walkthroughPage() {

    const theme = useContext(ThemeContext);
    const [currentInputChecked, setCurrentInputChecked] = useState(1);
    const radioOneRef = useRef();
    const radioTwoRef = useRef();
    const radioThreeRef = useRef();

    function changeHandler() {

       if (radioOneRef.current.checked) {
        setCurrentInputChecked(1);
       } else if (radioTwoRef.current.checked) {
        setCurrentInputChecked(2);
       } else if (radioThreeRef.current.checked) {
        setCurrentInputChecked(3);
       }
    }

    return (
        <> 
            {theme.currentTheme === 'light' && currentInputChecked === 1 &&
                <BackgroundImage imageUrl={ColorBlob.src} />
            }
            {theme.currentTheme === 'dark' &&
                <div className='walkthrough__gradient-background'>
                    {currentInputChecked === 1 &&
                        <BackgroundImage imageUrl={ColorBlob.src} />
                    }
                </div>
            }
            <main className='walkthrough'>
                {currentInputChecked === 1 &&
                    <h1 className='walkthrough__heading'>Where words fail,<span className='line-break'>music speaks</span></h1>
                }
                {currentInputChecked === 2 &&
                    <h1 className='walkthrough__heading'>No music<span className='line-break'>no life</span></h1>
                }
                {currentInputChecked === 3 &&
                    <h1 className='walkthrough__heading'>Peace.love<span className='line-break'>music</span></h1>
                }
                <p className='walkthrough__text'>Vivamus auctor dui dignissim, sollicitudin nunc ac, aliquam justo. Vestibulum pellentesque lacinia eleifend.</p>
                <nav className='walkthrough__menu'>
                    <label className='walkthrough__label'>
                        <GiResonance className='walkthrough__icon' />
                        <input defaultChecked ref={radioOneRef} onChange={changeHandler} type="radio" className='walkthrough__input' name="radio" />
                    </label>
                    <label className='walkthrough__label'>
                        <IoIosHeart className='walkthrough__icon' />
                        <input ref={radioTwoRef} onClick={changeHandler} type="radio" className='walkthrough__input' name="radio" id='inputTwo' />
                    </label>
                    <label className='walkthrough__label'>
                        <IoMusicalNote className='walkthrough__icon' />
                        <input ref={radioThreeRef} onClick={changeHandler} type="radio" className='walkthrough__input' name="radio" id='inputThree' />
                    </label>
                </nav>
                <Link href={'/'} className='walkthrough__link'>skip</Link>
            </main>
        </>
    )
}