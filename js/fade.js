function fadeIn(audio, duration) {
    audio.volume = 0;
    audio.play();
    var step = 0.05;
    var maxVolume = 0.5;
    var interval = duration / (1 / step);
    var fadeAudio = setInterval(function () {
        if (audio.volume < maxVolume) {
            audio.volume = Math.min(audio.volume + step, maxVolume);
            console.log(audio.volume);
        } else {
            clearInterval(fadeAudio);
        }
    }, interval);
}

function fadeOut(audio, duration) {
    var step = 0.05;
    var interval = duration / (1 / step);
    var fadeAudio = setInterval(function () {
        if (audio.volume > 0.0) {
            audio.volume = Math.max(audio.volume - step, 0);
        } else {
            clearInterval(fadeAudio);
            audio.pause();
        }
    }, interval);
}


export { fadeIn, fadeOut };