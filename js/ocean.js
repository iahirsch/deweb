let speed = 1;
let oceanX = 0;
let vx = 0;
const ms = 1000 / 60;
let options = {duration: ms, endDelay: -5};
let collisionBoxes = [];

let scene2 = document.getElementById('scene2');

function createOcean() {
    // Ensure the scene2 element exists
    if (scene2) {
        // Create the container div
        let container = document.createElement('div');
        container.id = 'ocean_prlx';
        container.setAttribute('draggable', 'false');

        // Create the ocean layers
        let layers = [
            {id: 'layer7', value: '20', scrollSpeed: '5'},
            {id: 'layer6', value: '15', scrollSpeed: '10'},
            {id: 'layer5', value: '10', scrollSpeed: '15'},
            {id: 'layer4', value: '5', scrollSpeed: '20'},
            {id: 'layer3', value: '-5', scrollSpeed: '25'},
            {id: 'layer2', value: '-10', scrollSpeed: '30'},
            {id: 'layer1', value: '-15', scrollSpeed: '40'}
        ];

        // Create the item layers
        let items = [
            {id: 'rock1', value: '0', scrollSpeed: '22', pos: [150, -11]},
            {id: 'rock2', value: '0', scrollSpeed: '12', pos: [180, -2]},
            {id: 'rock3', value: '0', scrollSpeed: '7', pos: [220, 0]},
        ];

        layers.forEach(layerInfo => {
            let layer = document.createElement('div');
            layer.className = 'layers';
            layer.id = layerInfo.id;
            layer.setAttribute('value', layerInfo.value);
            layer.setAttribute('scrollSpeed', layerInfo.scrollSpeed);
            container.appendChild(layer);
        });

        items.forEach(itemInfo => {
            let item = document.createElement('div');
            item.className = 'items';
            item.id = itemInfo.id;
            item.setAttribute('value', itemInfo.value);
            item.setAttribute('scrollSpeed', itemInfo.scrollSpeed);
            item.style.left = itemInfo.pos[0] + 'vw';
            item.style.bottom = itemInfo.pos[1] + 'vh';
            container.appendChild(item);

            addCollisionBox(item, 150, 500);
        });

        // Create the player
        let player = document.createElement('div');
        player.id = 'player';
        container.appendChild(player);

        // Create Player Input Text Info
        let infoText = document.createElement('div');
        infoText.id = 'infoText';
        infoText.textContent = 'Use A and D to move';
        scene2.appendChild(infoText);

        // Append the container to the scene2 div
        scene2.appendChild(container);
    } else {
        console.error('Element with ID "scene2" not found');
    }

    // Parallax effect
    document.addEventListener("mousemove", parallax);

    function parallax(event) {
        this.querySelectorAll(".layers").forEach((shift) => {
            const position = shift.getAttribute("value");
            const x = (window.innerWidth - event.pageX * position) / 90 - window.innerWidth / 2;
            const y = (window.innerHeight - (event.pageY - window.innerHeight / 2) * position) / 90;

            shift.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }
}

function moveOcean() {
    const layers = document.querySelectorAll('.layers');
    const items = document.querySelectorAll('.items');
    const infoText = document.getElementById('infoText');

    layers.forEach(layer => {
        let scrollSpeed = parseFloat(layer.getAttribute('scrollSpeed')) / 40;

        let oceanAnim = layer.animate([
            {backgroundPosition: `${oceanX * scrollSpeed}px bottom`},
            {backgroundPosition: `${(oceanX + vx) * scrollSpeed}px bottom`}
        ], options);

        oceanAnim.onfinish = () => {
            oceanX += vx;
            oceanAnim.effect.setKeyframes([
                {backgroundPosition: `${oceanX * scrollSpeed}px bottom`},
                {backgroundPosition: `${(oceanX + vx) * scrollSpeed}px bottom`}
            ]);
            oceanAnim.play();
        };
    });

    items.forEach(item => {
        let scrollSpeed = parseFloat(item.getAttribute('scrollSpeed')) / 40;

        let itemAnim = item.animate([
            {transform: `translateX(${oceanX * scrollSpeed}px)`},
            {transform: `translateX(${(oceanX + vx) * scrollSpeed}px)`}
        ], options);

        itemAnim.onfinish = () => {
            oceanX += vx;
            itemAnim.effect.setKeyframes([
                {transform: `translateX(${oceanX * scrollSpeed}px)`},
                {transform: `translateX(${(oceanX + vx) * scrollSpeed}px)`}
            ]);
            infoText.style.transform = `translateX(${oceanX * scrollSpeed * 3}px)`;
            itemAnim.play();
        };
    });
}

function addCollisionBox(itemElement, width, height) {
    const boxElem = document.createElement("div");
    boxElem.classList.add("collision-box");
    boxElem.style.position = "absolute";
    boxElem.style.width = width + "px";
    boxElem.style.height = height + "px";
    boxElem.style.backgroundColor = "red";
    itemElement.appendChild(boxElem);
    collisionBoxes.push(boxElem);
}

//TODO: Add checkCollision and action
function checkCollision() {
    const playerBox = {
        x: this.x,
        y: this.y,
        width: this.elem.offsetWidth,
        height: this.elem.offsetHeight,
    };

    for (const box of playfield.collisionBoxes) {
        if (
            playerBox.x < box.x + box.width &&
            playerBox.x + playerBox.width > box.x &&
            playerBox.y < box.y + box.height &&
            playerBox.y + playerBox.height > box.y
        ) {
            console.log("Collision detected!");
            return true;
        }
    }
    return false;
}


//=====================================
// Keybindings
//=====================================
globalThis.addEventListener('keydown', onkeydown, false);
globalThis.addEventListener('keyup', onkeyup, false);

let keys = {};
onkeydown = onkeyup = (e) => {
    keys[e.code] = e.type === 'keydown';
    console.log(oceanX);
    if (keys.KeyA && oceanX <= -10) {
        vx = speed;
    } else if (keys.KeyD && oceanX > -20000) {
        vx = -speed;
    } else {
        vx = 0;
    }
};

export {createOcean, moveOcean};