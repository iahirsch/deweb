import { showScene2, playVoiceAudioBook } from './dynamicHandler.js';
import { fadeIn, fadeOut } from './fade.js';

let bookExistent = false;

function setBookExistent(value) {
    bookExistent = value;
}

function createBook() {
    bookExistent = true;
    // Create the book1 div
    let book = document.createElement('div');
    book.id = 'book1';
    fadeOut(document.getElementById('musicScene1'), 8000);

    // Create the page elements with their respective classes
    let pages = ['back', 'page6', 'page4', 'page3', 'page2', 'page1', 'front'];
    pages.forEach(pageClass => {
        let page = document.createElement('div');
        page.className = `pages ${pageClass}`;

        // If the page class is 'page6', add the typedtext div inside it
        if (pageClass === 'page6') {
            let typedtext = document.createElement('div');
            typedtext.id = 'typedtext';
            page.appendChild(typedtext);
        }

        book.appendChild(page);
    });

    // Append the book1 div to the background-container
    document.getElementById('background-container').appendChild(book);

    document.addEventListener('mousemove', onMouseMove);

    document.getElementById('book1').addEventListener('click', openBook);
}

function onMouseMove(e) {
    if (bookExistent) {
        let book = document.getElementById('book1');
        let centerX = window.innerWidth / 2;
        let centerY = window.innerHeight / 2;
        let deltaX = e.clientX - centerX;
        let deltaY = e.clientY - centerY;
        let rotateY = deltaX * 0.04;
        let rotateX = deltaY * -0.04;
        book.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
}

function openBook() {
    const book1 = document.getElementById('book1');
    this.classList.add('open');
    this.style.cursor = 'none';
    playVoiceAudioBook();
    document.getElementById('background-container').style.cursor = 'none';
    setTimeout(() => {
        let writing = document.getElementById('writing');
        writing.volume = 0.01;
        writing.play();
        typewriter();
        fadeIn(document.getElementById('musicScene2'), 10000);
        fadeIn(document.getElementById('ocean_sound'), 10000);
        book1.classList.add('zoom');
        console.log('Book opened');
    }, 1200);
    setTimeout(() => {
        console.log('Scene 2 shown');
        showScene2();
    }, 6000);
    this.removeEventListener('click', openBook);
}

// Typewriter effect
let aText = [
    "I was on an exciting expedition today.Dad was still sawing logs back at the house. Gripping the oar, I began to row. My arms ached, trying to manoeuvre this mighty ship, when suddenly ..."
];
let iSpeed = 60; // time delay of print out
let iIndex = 0; // start printing array at this position
let iArrLength = aText[0].length; // the length of the text array
let iScrollAt = 20;

let iTextPos = 0; // initialise text position
let sContents = ''; // initialise contents variable
let iRow; // initialise current row

function typewriter() {
    sContents = ' ';
    iRow = Math.max(0, iIndex - iScrollAt);
    let destination = document.getElementById("typedtext");

    while (iRow < iIndex) {
        sContents += aText[iRow++] + '<br />';
    }
    destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos);
    if (iTextPos++ === iArrLength) {
        iTextPos = 0;
        iIndex++;
        if (iIndex !== aText.length) {
            iArrLength = aText[iIndex].length;
            setTimeout(typewriter, 500);
        }
    } else {
        setTimeout(typewriter, iSpeed);
    }
}

export { setBookExistent, createBook, typewriter };
