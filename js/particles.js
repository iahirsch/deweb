function initializeParticles() {
    const particleContainer = document.getElementById('particle-container');

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4; // Size
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        // Position the particles in the center area of the screen
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const randomOffsetX = (Math.random() - 0.5) * 700; // Range -350px to 350px
        const randomOffsetY = (Math.random() - 0.5) * 400 + 80; // Range -200px to 200px
        particle.style.left = `${centerX + randomOffsetX}px`;
        particle.style.top = `${centerY + randomOffsetY}px`;

        // Random movement values for the animation
        const moveX = (Math.random() - 0.5) * 40; // Range -10px to 10px
        const moveY = (Math.random() - 0.5) * 40; // Range -10px to 10px
        particle.style.setProperty('--move-x', `${moveX}px`);
        particle.style.setProperty('--move-y', `${moveY}px`);

        particleContainer.appendChild(particle);

        // Remove particle after its animation duration plus a buffer
        setTimeout(() => {
            particleContainer.removeChild(particle);
        }, 9000); // Match the animation duration
    }

    setInterval(createParticle, 30);
}

export { initializeParticles };
