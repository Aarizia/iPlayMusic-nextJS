'use client';

import { ThemeContext } from '@/providers/Theme';
import './_darkmode-checkbox.scss';
import { useContext } from 'react';

export default function DarkmodeCheckbox() {

    const theme = useContext(ThemeContext);

    function changeHandler(event) {
        if (event.target.checked) {
            theme.setCurrentTheme('dark');
            window.localStorage.setItem('theme', 'dark')
            document.body.classList.add('darkmode');
            document.body.classList.remove('lightmode');
        } else {
            theme.setCurrentTheme('light');
            window.localStorage.setItem('theme', 'light')
            document.body.classList.add('lightmode');
            document.body.classList.remove('darkmode');
        }
    }

    return (
        <label className="darkmode-checkbox__label">
            <div className="darkmode-checkbox__circle"></div>
            <input type='checkbox' checked={theme.currentTheme === 'dark'} className="darkmode-checkbox__input" onChange={changeHandler}/>
        </label>
    )

}