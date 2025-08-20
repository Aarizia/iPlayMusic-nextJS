'use client';

import { Children, cloneElement } from 'react';
import './_svg-linear-gradient.scss';

export default function SvgLinearGradient({ children, width = '20px', height = '20px' }) {

    const clonedChildren = Children.map(children, child => {
    
        return cloneElement(child, {fill: 'url(#linearGradient)'});
    });

    return (
        <svg height={height} width={width} xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="linearGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" className='gradient-stop-color-left'/>
                    <stop offset="100%" className='gradient-stop-color-right' />
                </linearGradient>
            </defs>
            {clonedChildren.map(child => {
                return child;
            })}
        </svg>
    )
}