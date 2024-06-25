import {setBookExistent, createBook} from './book.js';
import {createOcean, moveOcean} from './ocean.js';
import {createGiftcard} from './giftcard.js';

const scene1 = document.getElementById('scene1');
const scene2 = document.getElementById('scene2');
const backgroundContainer = document.getElementById('background-container');
const storyDisplay = document.getElementById('story-display');
const book1 = document.getElementById('book1');
const particle = document.getElementById('particle-container');
//Sound Effects
let turnPage = document.getElementById('turning_page');
let openBook = document.getElementById('pickup_book');
//TODO: Example (replace by voice audio). Replace writing with voice_audio_x
let writing = document.getElementById('writing');

let currentlyPlayingAudio = null;

const audioFiles = [turnPage, openBook, writing];
audioFiles.forEach(audio => {
    audio.addEventListener('ended', handleAudioEnd);
});

let divInfo = [
    {id: 'boat', category: 1, clicked: false},
    {id: 'exams', category: 1, clicked: false},
    {id: 'giftcard', category: 2, clicked: false},
];

let typewriterInterval;
let typewriterTimeout;
let storyElementsCounter = 0;
let allElementsClicked = false;

let eventListenerCounter = 0;

const storySegments = {
    intro: "It's been a while since I've been here. Two years to be exact. Everything's exactly how he left it. Maybe going through his things will help me understand. I should have a look around.",
    book: "This is the story for book.",
    exams: "This is the story for Tim.",
    boat: "This is the story for boat.",
    giftcard: "This is the story for giftcard.",
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

//Animation for Hint
function startHintAnimation() {
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
        createStoryElements({id: 'book', category: 3});

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
    stopCurrentlyPlayingAudio();

    switch (userInput) {
        case 'intro':
            console.log('audio intro');
            currentlyPlayingAudio = writing;
            break;
        case 'boat':
            console.log('audio boat');
            currentlyPlayingAudio = writing;
            break;
        case 'exams':
            console.log('audio exams');
            currentlyPlayingAudio = writing;
            break;
        case 'giftcard':
            console.log('audio giftcard');
            currentlyPlayingAudio = writing;
            break;
        case 'hint':
            console.log('audio hint');
            currentlyPlayingAudio = openBook;
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
    if (allElementsClicked) {
        setTimeout(() => {
            playVoiceAudio('hint');
        }, 15000);
    }
    setTimeout(startHintAnimation, 5000);
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

function showScene2() {
    createOcean();

    scene2.style.opacity = 1;
    moveOcean();
    setTimeout(() => {
        setBookExistent(false);
        if (book1) {
            book1.remove();
        }
        if (scene1) {
            scene1.remove();
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

            span.animate([{opacity: 0}, {opacity: 1}], {
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
    }, 70);
}


export {initiateStoryElements, displayIntro, showScene2, typewriter, startHintAnimation};