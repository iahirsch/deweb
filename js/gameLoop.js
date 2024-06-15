import { initializeParticles } from './particles.js';
import { createStoryElements, handleStoryElements, displayIntro } from './dynamicHandler.js';
import { fadeIn } from './fade.js';

const info = document.getElementById("info");
const startScreen = document.getElementById("startscreen");
let musicScene1 = document.getElementById("musicScene1");

let running = false;

document.onclick = () => {
    if (!running) {
        startGame();
        running = true;
    }
};

document.onkeydown = (e) => {
    if (e.code === 'Escape') {
        if (running) {
            stopGame();
            running = false;
        }
    }
};

function startGame() {
    info.innerText = "Use Esc to Stop";
    startScreen.style.opacity = "0";
    startScreen.style.transition = "opacity 2s";
    fadeIn(musicScene1, 10000);
    setTimeout(() => {
        startScreen.style.display = "none";
    }, 2500);
    setTimeout(displayIntro, 2000);
    //player.anim.play();
}

function stopGame() {
    info.innerText = "Click to restart";
    //player.anim.cancel();
    //player.style.transform = `translate(${player.x}px, ${player.y}px)`;
    startScreen.style.display = "flex";
    startScreen.style.opacity = "1";
    musicScene1.pause();
    //player.style.transform = 'translate(0, 0)';
}

document.addEventListener('DOMContentLoaded', () => {
    createStoryElements();
    handleStoryElements();
    initializeParticles();
});
