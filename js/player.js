class Player {
    constructor(element, speed, msRender) {
        this.x = 0;
        this.y = 0;
        this.speed = speed;
        this.style = element.style;
        this.anim = element.animate(null, { duration: msRender });
        this.keyframes = null;
    }

    update(cmd) {
        let newX = this.x;
        let newY = this.y;

        if (cmd === 'right') {
            newX += this.speed;
        } else if (cmd === 'left') {
            newX -= this.speed;
        }

        this.keyframes = [
            { transform: `translate(${this.x}px, ${this.y}px)` },
            { transform: `translate(${newX}px, ${newY}px)` }
        ];

        this.x = newX;
        this.y = newY;
    }

    draw() {
        this.anim.effect.setKeyframes(this.keyframes);
        this.anim.play();
    }
}

export default Player;
