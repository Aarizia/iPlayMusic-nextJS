'use client';

import { playerContextEksempel } from "@/providers/PlayerProviderEks";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import './_player-eks.scss';
import './_player-big-eks.scss';
import './_input.scss';
import PlaceholderImage from './artist-placeholder-image.svg';
import { FaPause } from "react-icons/fa6";
import { FaPlay } from "react-icons/fa";
import { FaFastBackward } from "react-icons/fa";
import { FaBackward } from "react-icons/fa";
import { FaForward } from "react-icons/fa";
import { FaFastForward } from "react-icons/fa";
import { convertDuration, milisecondsToSeconds } from "@/utility/convertDuration";
import { shortenArray, shortenText } from "@/utility/textHelper";
import SiteHeader from "@/components/site-header";
import BackgroundImage from "@/components/background-image";

function useDebounce(value, delay = 300) {
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {

		const timer = setTimeout(function() {

			setDebounceValue(value);
		}, delay);

        return () => clearTimeout(timer);

	}, [value, delay]);

	return debounceValue;
}

function reducer(state, action) {

    // den værdi der står i parantesen er den vi gerne vil have undersøgt - 
    // hvis action.type === 'setPlayController' så kører den koden under den case.
    switch(action.type) {
        case 'setPlayController':
            return {
                ...state,
                playController: action.playController
            }
        case 'setDuration':
            return {
                ...state,
                duration: action.duration
            }
        case 'setPosition':
            return {
                ...state,
                position: action.position
            }
        case 'setLocalPosition':
            return {
                ...state,
                localPosition: action.localPosition
            }
        case 'setPaused':
            return {
                ...state,
                isPaused: action.isPaused
            }
        case 'seekingTrue':
            return {
                ...state,
                isSeeking: true
            }
        case 'seekingFalse':
            return {
                ...state,
                isSeeking: false
            }
        case 'setDurationAndPosition':
            return {
                ...state,
                duration: action.duration,
                position: action.position
            }
        case 'setFullScreenPlayer':
            return {
                ...state,
                isFullScreen: true
            }
        case 'setPlayerSmall':
            return {
                ...state,
                isFullScreen: false
            }
    }

    // fejlhåndtering:
    // slut med throw error unknown action, fejlfinding på hvis du prøver at køre dispatch funktionen med en action, der ikke findes
    throw new Error('Unknown action: ' + action.type);
}

export default function PlayerEksempel() {

    // destrukturere context objektet for bare at få den property, jeg skal bruge
    const { showPlayer, currentTrack, albumCover, currentArtist, noArtist } = useContext(playerContextEksempel);
    const controlRef = useRef();

    const [playerState, dispatch] = useReducer(reducer, {
        playController: null,
        isPaused: false,
        duration: 0,
        position: 0,
        localPosition: 0,
        isSeeking: false,
        isFullScreen: false
    });

    // standard/default for tal i parameter 2 er 1 sekund
    const debouncedPosition = useDebounce(playerState.localPosition);

    // ny useEffect, andre dependencies
    useEffect(() => {

        if (!playerState.isSeeking) {

            //setLocalPosition(timing.position);
            dispatch({ type: "setLocalPosition", localPosition: playerState.position });
        }

    }, [playerState.position, playerState.isSeeking]);

    useEffect(() => {

        //vide om brugeren er ved at flytte på slideren
        if (playerState.isSeeking && debouncedPosition !== playerState.position) {

            // her laver vi flytningen i tid:
            // sætte isSeeking til false, men det skal være efter playController.seek er udført. vi bruger .then()
            playerState.playController.seek(milisecondsToSeconds(debouncedPosition));
            //playerState.playController.seek(Math.floor(debouncedPosition / 1000));
            //.then(() => setIsSeeking(false));
            //setIsSeeking(false);
            dispatch({ type: 'seekingFalse' });
        }

    }, [debouncedPosition, playerState.position]);

    // få lyd på:
    // problem: spotify har opdaget ai - mange ai modeller bruger spotifys musik som træning til at lave musik og det kan spotify ikke lide
    // normalt: når du bruger spotifys api uden at betale plejer du at kunne høre 30 sec af musikken uden at betale. det er nu fjerner pga ai
    // det er en property under track, der hedder preview_url, som nu er null
    useEffect(() => {

        //console.log('current track:', currentTrack);

        window.onSpotifyIframeApiReady = function(IFrameAPI) {
            const options = {
                uri: currentTrack.uri,
                // customize afspillerens udseende:
                height: 0,
                width: 0
                // vi kan sætte flere options på men det gør vi ikke lige nu
            };

            // lav callback funktion
            const callback = (EmbedController) => {
                EmbedController.play();

                // hvordan får vi den op i scope så knappen kan se den? putte funktionen ind i et state, som vi kan kalde på OnClick
                //setPlayController(EmbedController);
                dispatch({ type: "setPlayController", playController: EmbedController });

                EmbedController.addListener('playback_update', function(event) {
                    
                    // sætte afspilningstid
                    // hvorfor skal der en anonym funktion ind? hvis vi har et state, som kan være true eller false, datatype boolean
                    // ændre datatype til noget andet, ændrer den værdi? ja
                    // ændrer en string til en anden string: den ændrer værdi
                    // ændre på elementer i array: ændrer ikke værdi
                    // ændre på properties i objekt: ændrer ikke værdi
                    // når vi bruger en anonym funktion til at ændre objekt, så ændrer den værdi
                    //setTiming(() => { return { duration: event.data.duration, position: event.data.position }});
                    dispatch({ type: 'setDurationAndPosition', duration: event.data.duration, position: event.data.position });

                    // sætte på pause
                    /* if (event.data.isPaused) setIsPaused(true);
                    else setIsPaused(false); */
                    if (event.data.isPaused) dispatch({ type: 'setPaused', isPaused: true });
                    else dispatch({ type: 'setPaused', isPaused: false });
                    


                    //console.log(event.data.position);
                    //console.log(event.data.duration);
                });
            }

            IFrameAPI.createController(controlRef.current, options, callback);
        };

    }, [currentTrack]);

    function changeHandler(event) {

        /* setTiming(() => { return {position: event.target.value, duration: timing.duration}});
        const timingInSeconds = milisecondsToSeconds(event.target.value);
        console.log(timingInSeconds);
        playController.seek(timingInSeconds); */
        //setIsSeeking(true);
        //setLocalPosition(event.target.value);
        dispatch({ type: 'seekingTrue' });
        dispatch({ type: 'setLocalPosition', localPosition: event.target.value });
    }



    // hvad hedder showplayer ? noget : noget andet ?
    // conditional rendering i formen ternary operator

    // lave den lille player, som skal vises nede i bunden
    // ligge fremme: højt z-index og position fixed
    // vi skal også have vist og skjult det. hvis du trykker på et track skal det vises og ellers være skjult. brug context
    // to sidestillede komponenter, der skal kommunikere med hinanden: vi bruger context
    return showPlayer ? (
        <div>
            <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
            <div id="embed-iframe" ref={controlRef}></div>
            {playerState.isFullScreen ?
                <section className="player-big-eks">
                    <BackgroundImage imageUrl={albumCover.url ? albumCover.url: false /* placeholder med streger */} height='100vh' blur='1px' gradientCanvas={true} /> 
                    <SiteHeader title="Playing" isPlayer={true} backgroundImage={albumCover.url ? true : false} dispatch={dispatch} />
                    <div className={`playing ${(albumCover.url ? 'light-text' : '')}`}>
                        {currentArtist?.images[0].url ?
                            <div className='playing__image-container'>
                                <div className='playing__overlay-canvas'>
                                    <div className='playing__overlay-canvas--medium'>
                                        <div className='playing__overlay-canvas--small'>
                                        </div>
                                    </div>
                                </div>
                                <img className='playing__image' src={currentArtist.images[0].url} alt={currentArtist?.name} />                  
                            </div>
                        :
                            <img src={PlaceholderImage.src} className='playing__placeholder-image' alt="placeholder-image" />
                        }
                        <section className='player'>                            
                            <h2 className={`font-size-small ${(albumCover.url ? 'light-text' : 'non-gradient')}`}>{currentTrack.name}</h2>
                            {currentTrack?.artists?.length === 1 ?
                                <p className='player__artist'>{currentTrack?.artists?.map(artist => shortenText(artist?.name, 30))}</p>
                            :
                                <p className='player__artist'>{shortenArray(currentTrack?.artists, 'name', 38)}</p>
                            }
                            <input className="player__input" type="range" value={playerState.localPosition} max={playerState.duration} onChange={changeHandler} />
                            <div className='player__duration'>
                                <p className='player__currentTime'>{convertDuration(playerState.localPosition)}</p>
                                <p className='player__maxTime'>{convertDuration(playerState.duration)}</p>
                            </div>
                            <nav className='player__menu'>
                                <button className='player__button' onClick={() => playerState.playController.restart()}>
                                    {albumCover.url ? 
                                        <FaFastBackward />
                                        :
                                        <SvgLinearGradient width='24px' height='22px'>
                                            <FaFastBackward />
                                        </SvgLinearGradient>
                                    }
                                </button>
                                <button /* onClick={() => playerState.playController.seek(playerState.localPosition - 5)} */ className='player__button'><FaBackward /></button>
                                {albumCover.url ?
                                    <button onClick={() => playerState.playController.togglePlay()} className='player__button player__button--big'>
                                        <div className='player__button-icon-container'>
                                            {playerState.isPaused ? <FaPlay className="player__button-icon"/> : <FaPause className="player__button-icon"/>}
                                        </div>
                                    </button>
                                :
                                    <button onClick={() => playerState.playController.togglePlay()} className='player__button player__button--big-gradient-fill'>
                                        <SvgLinearGradient>
                                            {playerState.isPaused ? <FaPlay /> : <FaPause />}
                                        </SvgLinearGradient>
                                    </button>
                                }
                                <button className='player__button'><FaForward /></button>
                                {albumCover.url ? 
                                    <button className='player__button'><FaFastForward /></button>
                                :
                                    <button className='player__button'>
                                        <SvgLinearGradient width='24px' height='22px'>
                                            <FaFastForward />
                                        </SvgLinearGradient>
                                    </button>
                                }
                            </nav>
                        </section>
                    </div>
                </section>
            :
                <section className="player-small">
                    <button onClick={() => playerState.playController.togglePlay()} className="player-small__button-round" style={{backgroundImage: `url(${albumCover.url ? albumCover.url : PlaceholderImage.src})`}}>
                        <div className="player-small__icon-container">
                            {playerState.isPaused ? <FaPlay className="player-small__icon"/> : <FaPause className="player-small__icon"/>}
                        </div>
                    </button>
                    <button className="player-small__button-big" onClick={() => dispatch({ type: 'setFullScreenPlayer' })}>
                        <p className="player-small__text player-small__title">{shortenText(currentTrack.name, 17)}</p>
                        <p className="player-small__text player-small__artist">
                            {currentTrack.artists?.length === 1 ?
                                currentTrack.artists?.map(artist => shortenText(artist.name, 30))
                                :
                                shortenArray(currentTrack.artists, 'name', 25)
                            }
                        </p>
                        <p className="player-small__text player-small__duration">
                            {`${convertDuration(playerState.position)} / ${convertDuration(playerState.duration)}`}
                        </p>
                    </button>
                    {/* default minimum: 0, default step: 1 */}
                    <input className="player-small__input" type="range" value={playerState.localPosition} max={playerState.duration} readOnly />
                </section>
            }
        </div>
    ) : null;
}