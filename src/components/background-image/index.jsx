import Image from 'next/image';
import './_background-image.scss';

export default function BackgroundImage({ imageUrl, imageAltText, aspectRatio = 'initial', gradientCanvas = false, height = 'auto', blur = 0 }) {

    return (
        <>
            {imageUrl ? 
                <Image 
                    src={imageUrl} 
                    style={{aspectRatio: aspectRatio, height: height, filter: `blur(${blur})`}} 
                    className='background-image' 
                    alt={imageAltText || 'background image'}
                    height={100}
                    width={100}
                />
            :
                <></>
            }
            {imageUrl && gradientCanvas ? 
                <div style={{aspectRatio: aspectRatio}} className="gradient-canvas"></div>
            :
                <></>
            }
        </>
    )
}