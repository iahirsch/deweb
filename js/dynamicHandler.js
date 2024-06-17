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

let typewriterInterval;
let typewriterTimeout;

const storySegments = {
    intro: "It's been a while since I've been here. Two years to be exact. Everything's exactly how he left it. Maybe going through his things will help me understand. I should have a look around.",
    book: "This is the story for book.",
    exams: "This is the story for Tim.",
    boat: "This is the story for boat.",
    giftcard: "This is the story for giftcard.",
};

//TODO: Create better visual queue for user (pulsating or glow around interactable)
function createStoryElements() {
    const divInfo = [
        {id: 'boat', category: 1},
        {id: 'exams', category: 1},
        {id: 'giftcard', category: 2},
        {id: 'book', category: 3}
    ];

    divInfo.forEach(info => {
        const div = document.createElement('div');
        div.classList.add('positioned-div');
        div.id = info.id;
        div.dataset.category = info.category;
        scene1.appendChild(div);
    });
}

function displayIntro() {
    storyDisplay.classList.add('scene1');
    typewriter(storySegments.intro, storyDisplay);
    storyDisplay.style.display = 'block';
}

//TODO: Show book only after all the other elements were clicked
function handleStoryElements() {
    const divs = document.querySelectorAll('.positioned-div');

    divs.forEach(div => {
        div.addEventListener('click', function () {

            // Clear any existing typewriter intervals
            if (typewriterInterval) {
                clearInterval(typewriterInterval);
            }

            const css = div.id;
            const category = div.dataset.category;

            console.log(`category: ${category}`);

            if (category <= 2) {
                storyDisplay.classList.add('scene1');
                storyDisplay.style.display = 'block';
                typewriter(storySegments[css], storyDisplay);

                if (category === '2') {
                    addCSS(css);
                    backgroundContainer.classList.add('show');
                    backgroundContainer.addEventListener('click', hideBackgroundContainer);
                    turnPage.play();
                }

            } else if (category === '3') {
                addCSS(css);
                backgroundContainer.classList.add('show');
                particle.remove();
                backgroundContainer.removeEventListener('click', hideBackgroundContainer);
                openBook.play();
            }
        });
    });
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

            span.animate([
                {opacity: 0},
                {opacity: 1}
            ], {
                duration: 500,
                fill: 'forwards'
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


export {createStoryElements, handleStoryElements, displayIntro, showScene2};