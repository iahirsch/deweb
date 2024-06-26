function createGiftcard() {
    // Create the main card div
    const card = document.createElement('div');
    card.classList.add('card');

    // Create the imgBox div
    const imgBox = document.createElement('div');
    imgBox.classList.add('imgBox');

    // Create the bark div
    const bark = document.createElement('div');
    bark.classList.add('bark');

    // Create the img element
    const img = document.createElement('img');
    img.src = '../assets/room/giftcard.jpg';

    // Append bark and img to imgBox
    imgBox.appendChild(bark);
    imgBox.appendChild(img);

    // Create the details div
    const details = document.createElement('div');
    details.classList.add('details');

    // Create and append the text elements
    const texts = [
        { tag: 'h4', class: 'color1', content: "To Ethan" },
        { tag: 'h4', class: 'color2 margin', content: 'Happy 10th Birthday!' },
        { tag: 'p', content: 'Dear Ethan,' },
        { tag: 'p', content: "Remember all those adventures we" },
        { tag: 'p', content: "planned with your trusty Triceratops by" },
        { tag: 'p', content: "your side? I can't wait to hear all about" },
        { tag: 'p', content: "the real adventures you have this year." },
        { tag: 'p', content: "May your day be full of laughter, cake," },
        { tag: 'p', content: "and maybe even a real" },
        { tag: 'p', content: "dinosaur discovery!" },
        { tag: 'p', class: 'text-right', content: 'Love,' },
        { tag: 'p', class: 'text-right', content: 'Ava' }
    ];

    texts.forEach(item => {
        const element = document.createElement(item.tag);
        if (item.class) {
            element.className = item.class;
        }
        element.textContent = item.content;
        details.appendChild(element);
    });

    // Append imgBox and details to card
    card.appendChild(imgBox);
    card.appendChild(details);

    // Append card to scene1
    document.getElementById('background-container').appendChild(card);
}

function removeGiftcard() {
    const card = document.querySelector('.card');
    card.remove();
}

export { createGiftcard, removeGiftcard };