function fadeIn(audio, duration) {
    audio.volume = 0;
    audio.play();
    let step = 0.01;
    let maxVolume = 0.2;
    let interval = duration / (1 / step);
    let fadeAudio = setInterval(function () {
        if (audio.volume < maxVolume) {
            audio.volume = Math.min(audio.volume + step, maxVolume);
        } else {
            clearInterval(fadeAudio);
        }
    }, interval);
}

function fadeOut(audio, duration) {
    let step = 0.01;
    let interval = duration / (1 / step);
    let fadeAudio = setInterval(function () {
        if (audio.volume > 0.0) {
            audio.volume = Math.max(audio.volume - step, 0);
        } else {
            clearInterval(fadeAudio);
            audio.pause();
        }
    }, interval);
}


export { fadeIn, fadeOut };