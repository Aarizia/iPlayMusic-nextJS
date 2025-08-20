export default function convertDuration(timeInMiliSeconds) {

    const timeInSeconds = Math.floor(timeInMiliSeconds/1000);
    const hours = Math.floor(timeInSeconds/3600);
    const minutes = Math.floor((timeInSeconds - hours * 3600)/60);
    const seconds = timeInSeconds - hours * 3600 - minutes * 60;

    if (hours === 0 && minutes === 0) {

        if (seconds < 10) {
            return `0${seconds}`;
        }

        return `${seconds}`;
    }

    if (hours === 0) {

        if (seconds < 10) {
            return `${minutes}:0${seconds}`;
        }

        return `${minutes}:${seconds}`;
    }


    if (minutes < 10 && seconds < 10) {
        return `${hours}:0${minutes}:0${seconds}`;
    }

    if (minutes < 10) {
        return `${hours}:0${minutes}:${seconds}`;
    }

    if (seconds < 10) {
        return `${hours}:${minutes}:0${seconds}`
    }

    return `${hours}:${minutes}:${seconds}`;
}