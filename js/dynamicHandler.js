import { setBookExistent, createBook } from './book.js';
import { createOcean, moveOcean } from './ocean.js';
import { createGiftcard } from './giftcard.js';
import { stopGame } from './gameLoop.js';
import { fadeOut } from './fade.js';

const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const backgroundContainer = document.getElementById('background-container');
const storyDisplay = document.getElementById('story-display');
const book1 = document.getElementById('book1');
const particle = document.getElementById('particle-container');
//Sound Effects
let turnPage = document.getElementById('turning_page');
let openBook = document.getElementById('pickup_book');
let intro_audio = document.getElementById('intro_audio');
let boat_audio = document.getElementById('boat_audio');
let exams_audio = document.getElementById('exams_audio');
let giftcard_audio = document.getElementById('birthdaycard_audio');
let book_audio = document.getElementById('book_audio');
let book1_audio = document.getElementById('book1_audio');
let outro_audio = document.getElementById('outro_audio');

let currentlyPlayingAudio = null;

const audioFiles = [intro_audio, boat_audio, exams_audio, giftcard_audio, outro_audio];
audioFiles.forEach(audio => {
    audio.addEventListener('ended', handleAudioEnd);
});

let divInfo = [
    { id: 'boat', category: 1, clicked: false },
    { id: 'exams', category: 1, clicked: false },
    { id: 'giftcard', category: 2, clicked: false },
];

let typewriterInterval;
let typewriterTimeout;
let storyElementsCounter = 0;
let allElementsClicked = false;

let showSceneOnce = true;

let eventListenerCounter = 0;

const storySegments = {
    intro: "It's been a while since I've been here. Two years to be exact. Everything's exactly how he left it. Maybe going through his things will help me understand. I should have a look around.",
    book: "Stories were the things Ethan loved most. He loved hearing them, he loved telling them, but must of all, he loved creating them. This one, titled 'The Foggy Ocean', was his latest creation.",
    exams: "Exams. Ethan was always so smart, usually got top marks without much trouble. But lately, these seem...different. Lots of empty spaces and drawings. Was something on his mind?",
    boat: "Ethan always loved the sea. He'd spend hours talking about pirates and buried treasure, dreaming of adventures on the open water. I remember this ship. He build it with our father day after day. Used to say it would take him anywhere he wanted to go. Maybe that's where he is now, sailing the stars on an endless ocean.",
    giftcard: "Ten years old. It feels like just yesterday we were making silly birthday cards and dreaming of adventures. Happy Birthday, Ethan.",
    outro: "Maybe the fog was a way for him to process the world. A world that sometimes felt too small, too ordinary for a mind like his. Rest easy, little explorer. You'll always have a safe harbour in my heart."
};

function initiateStoryElements() {
    for (let i = 0; i < divInfo.length; i++) {
        createStoryElements(divInfo[i]);
    }
}

function createStoryElements(info) {
    const div = document.createElement('div');
    div.classList.add('positioned-div');
    div.id = info.id;
    div.dataset.category = info.category;
    scene1.appendChild(div);

    div.addEventListener('click', stopHintAnimation);
    div.addEventListener('click', function () {
        handleStoryElements(info)
    });
}

function displayIntro() {
    storyDisplay.classList.add('scene1');
    typewriter(storySegments.intro, storyDisplay);
    storyDisplay.style.display = 'block';
    playVoiceAudio('intro');
}

function displayOutro() {
    storyDisplay.classList.remove('scene2');
    storyDisplay.classList.add('scene1');
    typewriter(storySegments.outro, storyDisplay);
    storyDisplay.style.display = 'block';
    playVoiceAudio('outro');
    setTimeout(() => {
        stopGame();
        fadeOut(document.getElementById('musicScene2'), 8000);
    }, 15000);
}

//Animation for Hint
function startHintAnimation() {
    console.log('startHintAnimation');
    if (!allElementsClicked) {
        const circles = document.querySelectorAll('.positioned-div');
        circles.forEach(div => {
            div.style.opacity = 1;
            setTimeout(() => {
                div.classList.add('animated');
            }, 4000);
        });
    } else {
        const posDivBook = document.getElementById('book');
        posDivBook.opacity = 1;
        setTimeout(() => {
            posDivBook.classList.add('animated');
        }, 3000);
    }
}

function stopHintAnimation() {
    const circles = document.querySelectorAll('.positioned-div');
    circles.forEach(div => {
        div.style.opacity = 0;
        div.classList.remove('animated');
    });
}

function handleStoryElements(info) {
    console.log(eventListenerCounter);

    // Clear any existing typewriter intervals
    if (typewriterInterval) {
        clearInterval(typewriterInterval);
    }

    // Count storyElementsClicked to show book after
    if (!info.clicked) {
        info.clicked = true;
        storyElementsCounter++;
    }

    if (storyElementsCounter === divInfo.length && !allElementsClicked) {
        allElementsClicked = true;
        createStoryElements({ id: 'book', category: 3 });

    }

    const css = info.id;
    const category = info.category;

    console.log(`category: ${category}`);
    console.log(`storyElementsCounter: ${storyElementsCounter} ? ${divInfo.length}`);

    if (category <= 2) {
        storyDisplay.classList.add('scene1');
        storyDisplay.style.display = 'block';
        typewriter(storySegments[css], storyDisplay);
        playVoiceAudio(css);

        if (category === 2) {
            addCSS(css);
            backgroundContainer.classList.add('show');
            backgroundContainer.addEventListener('click', hideBackgroundContainer);
            turnPage.play();
        }

    } else if (category === 3) {
        playVoiceAudio(css);
        addCSS(css);
        backgroundContainer.classList.add('show');
        particle.remove();
        backgroundContainer.removeEventListener('click', hideBackgroundContainer);
        openBook.play();
        typewriter(storySegments[css], storyDisplay);
    }
}

function playVoiceAudio(userInput) {
    console.log(currentlyPlayingAudio);
    stopCurrentlyPlayingAudio();

    switch (userInput) {
        case 'intro':
            console.log('audio intro');
            currentlyPlayingAudio = intro_audio;
            break;
        case 'boat':
            console.log('audio boat');
            currentlyPlayingAudio = boat_audio;
            break;
        case 'exams':
            console.log('audio exams');
            currentlyPlayingAudio = exams_audio;
            break;
        case 'giftcard':
            console.log('audio giftcard');
            currentlyPlayingAudio = giftcard_audio;
            break;
        case 'book':
            console.log('audio book');
            currentlyPlayingAudio = book_audio;
            break;
        case 'book1':
            console.log('audio book1');
            currentlyPlayingAudio = book1_audio;
            break;
        case 'outro':
            console.log('audio outro');
            currentlyPlayingAudio = outro_audio;
            break;
        default:
            console.log('Invalid input');
            currentlyPlayingAudio = null;
            break;
    }

    if (currentlyPlayingAudio != null) {
        currentlyPlayingAudio.play();
    }
}

function stopCurrentlyPlayingAudio() {
    if (currentlyPlayingAudio) {
        currentlyPlayingAudio.pause();
        currentlyPlayingAudio.currentTime = 0;
    }
}

function handleAudioEnd() {
    currentlyPlayingAudio = null;
    console.log('Audio ended');
    setTimeout(startHintAnimation, 4000);
}

function playVoiceAudioBook() {
    setTimeout(() => {
        playVoiceAudio('book1')
    }, 2000);
}

function hideBackgroundContainer() {
    console.log('backgroundContainer clicked');
    backgroundContainer.classList.remove('show');
    backgroundContainer.firstElementChild.remove();
    removeEventListener('click', hideBackgroundContainer);
}

function addCSS(css) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = css;
    link.href = `css/${css}.css`;

    document.head.appendChild(link);
    console.log(`CSS added: ${css}`);

    if (css === 'giftcard') {
        createGiftcard();
    } else if (css === 'book') {
        createBook();
    }
}

//TODO: Use removeCSS function
function removeCSS(css) {
    const link = document.getElementById(css);
    if (link) {
        document.head.removeChild(link);
    }
}

function showScene1() {
    console.log(showSceneOnce);
    if (showSceneOnce) {
        showSceneOnce = false;
        scene2.style.opacity = 0;
        setTimeout(displayOutro, 10000);
    }
}

function showScene2() {
    createOcean();
    const book1 = document.getElementById('book1');

    scene2.style.opacity = 1;
    moveOcean();
    setTimeout(() => {
        setBookExistent(false);
        hideBackgroundContainer();
        book1.remove();
        if (scene1) {
            //scene1.remove();
        }
    }, 10000);
}

function typewriter(text, element) {
    element.innerHTML = '';
    element.style.opacity = 1;
    clearTimeout(typewriterTimeout);

    const chars = text.split('');
    let index = 0;
    element.style.display = 'block';

    typewriterInterval = setInterval(() => {
        if (index < chars.length) {
            const span = document.createElement('span');
            span.textContent = chars[index];
            element.appendChild(span);

            span.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 500, fill: 'forwards'
            });

            index++;
        } else {
            clearInterval(typewriterInterval);
            typewriterInterval = null;

            typewriterTimeout = setTimeout(() => {
                element.style.display = 'none';
            }, 3000);
        }
    }, 60);
}


export { initiateStoryElements, displayIntro, showScene1, showScene2, typewriter, startHintAnimation, playVoiceAudioBook, hideBackgroundContainer };