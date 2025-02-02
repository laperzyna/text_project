document.querySelectorAll('.shape').forEach(shape => {
    shape.addEventListener('mouseover', () => {
        shape.style.transform = 'rotate(180deg)';
    });
    shape.addEventListener('mouseout', () => {
        shape.style.transform = 'rotate(0deg)';
    });
});

var sentences = [
    ["Se", "creen", "especial", "como", "un", "año", "en", "Miami", "que", "nieva"],
    ["Como", "una", "autopista", "sin", "flecha'"],
    ["Como", "una", "utopía", "sin", "brecha'"],
    ["Yo", "quiero", "ver", "la", "mariposa'", "suelta'"]
];

var currentSentence = 0;
var currentWord = 0;
var textContainer = document.getElementById('text-container');

function displayNextWord() {
    if (currentWord < sentences[currentSentence].length) {
        var wordSpan = document.createElement('span');
        wordSpan.textContent = sentences[currentSentence][currentWord] + " ";
        wordSpan.style.marginRight = "10px";
        wordSpan.style.opacity = 0;
        wordSpan.style.transition = 'opacity 0.5s';

        textContainer.appendChild(wordSpan);

        setTimeout(() => {
            wordSpan.style.opacity = 1;
        }, 10);

        currentWord++;
        setTimeout(displayNextWord, 500);
    } else if (currentSentence < sentences.length - 1) {
        // start next sentence
        textContainer.style.transition = 'opacity 2s';
        textContainer.style.opacity = '0';
        setTimeout(() => {
            textContainer.innerHTML = '';
            textContainer.style.opacity = '1';
            currentSentence++;
            currentWord = 0;
            // start next sentence
            displayNextWord();
        }, 2000);
    } else {
        // Start the animation at the right time as per your existing logic
        if (!document.getElementById('butterfly').style.animation) {
            document.getElementById('butterfly').style.animation = 'slideDiagonally 12s ease-in-out infinite';
        }

    }
}

// code snippet for curser repel functionality
var canvas = document.querySelector("#scene"),
    ctx = canvas.getContext("2d"),
    particles = [],
    amount = 0,
    mouse = { x: 0, y: 0 },
    radius = 1;

var colors = ["#AF251E", "#F47888", "#FEFDFE", "#F71105", "#787170"];

var ww = canvas.width = window.innerWidth;
var wh = canvas.height = window.innerHeight;

function Particle(x, y) {
    this.x = Math.random() * ww;
    this.y = Math.random() * wh;
    this.dest = {
        x: x,
        y: y
    };
    this.r = Math.random() * 5 + 2;
    this.vx = (Math.random() - 0.5) * 20;
    this.vy = (Math.random() - 0.5) * 20;
    this.accX = 0;
    this.accY = 0;
    this.friction = Math.random() * 0.05 + 0.94;

    this.color = colors[Math.floor(Math.random() * 6)];
}

Particle.prototype.render = function () {


    this.accX = (this.dest.x - this.x) / 1000;
    this.accY = (this.dest.y - this.y) / 1000;
    this.vx += this.accX;
    this.vy += this.accY;
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;

    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
    ctx.fill();

    var a = this.x - mouse.x;
    var b = this.y - mouse.y;

    var distance = Math.sqrt(a * a + b * b);
    if (distance < (radius * 70)) {
        this.accX = (this.x - mouse.x) / 100;
        this.accY = (this.y - mouse.y) / 100;
        this.vx += this.accX;
        this.vy += this.accY;
    }

}

function onMouseMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
}

function onTouchMove(e) {
    if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
}

function onTouchEnd(e) {
    mouse.x = -9999;
    mouse.y = -9999;
}

function initScene() {
    ww = canvas.width = window.innerWidth;
    wh = canvas.height = window.innerHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.font = "bold " + (ww / 6) + "px Grape Nut";
    ctx.textAlign = "center";
    ctx.fillText(copy.value, ww / 2, wh / 2);

    var data = ctx.getImageData(0, 0, ww, wh).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = "screen";

    particles = [];
    for (var i = 0; i < ww; i += Math.round(ww / 250)) {
        for (var j = 0; j < wh; j += Math.round(ww / 250)) {
            if (data[((i + j * ww) * 4) + 3] > 150) {
                particles.push(new Particle(i, j));
            }
        }
    }
    amount = particles.length;

}


function render(a) {
    requestAnimationFrame(render);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < amount; i++) {
        particles[i].render();
    }
};

window.addEventListener("resize", initScene);
window.addEventListener("mousemove", onMouseMove);
window.addEventListener("touchmove", onTouchMove);
window.addEventListener("touchend", onTouchEnd);
initScene();
displayNextWord();
requestAnimationFrame(render);