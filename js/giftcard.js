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
        { tag: 'h4', class: 'color1', content: "You're not a Fossil! (YET)" },
        { tag: 'h4', class: 'color2 margin', content: '(HAPPY BIRTHDAY)' },
        { tag: 'p', content: 'Dear Ethan,' },
        { tag: 'p', content: "Let's see.. ." },
        { tag: 'p', content: "You’re never around, you" },
        { tag: 'p', content: "hate the music I’m into, you" },
        { tag: 'p', content: "practically despise the movies I" },
        { tag: 'p', content: "like, and yet somehow you still" },
        { tag: 'p', content: "manage to be the best dad every year." },
        { tag: 'p', content: "How do you do that? :)" },
        { tag: 'p', class: 'text-right', content: 'Happy Birthday, Ethan!' },
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