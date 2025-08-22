'use client';

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function Theme({ children }) {
    
    //const [currentTheme, setCurrentTheme] = useState(themeAsString);
    const [currentTheme, setCurrentTheme] = useState('light');
    
    useEffect(() => {
        const themeAsString = window.localStorage.getItem('theme') ?? 'light';
        setCurrentTheme(themeAsString);

        // gem i localstorage

        if (currentTheme === 'dark') {
            document.body.classList.add('darkmode');
            document.body.classList.remove('lightmode');
        } else {
            document.body.classList.add('lightmode');
            document.body.classList.remove('darkmode');
        }
    }, []);
    
    return (
        <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
