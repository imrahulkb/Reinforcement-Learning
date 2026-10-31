const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
import {Pendulum} from "./Pendulum.js"

const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
ctx.scale(dpr, dpr);

const keys = new Set();

window.addEventListener('keydown', (e) => {
    if (e.key.startsWith('Arrow')) {
        keys.add(e.key);
        e.preventDefault(); // stop the page from scrolling
    }
});

window.addEventListener('keyup', (e) => {
    keys.delete(e.key);
});

window.addEventListener('blur', () => keys.clear());

const pendulum = new Pendulum(80,8,200,Math.PI*0.99,100,100);
let a = 0;

function brain(pendulum){

    if(pendulum.theta<Math.PI)      keys.add('ArrowLeft'), a=0.03*(0-pendulum.theta)/Math.PI;
    else if(pendulum.theta>Math.PI) keys.add('ArrowRight'), a=-0.03*(0-pendulum.theta)/Math.PI;
}

function loop(now){

    ctx.clearRect(0,0,canvas.width, canvas.height);
    pendulum.draw(ctx);
    brain(pendulum);
    pendulum.accelerate(keys,a);
    keys.delete('ArrowLeft');
    keys.delete('ArrowRight');
    requestAnimationFrame(loop);
}
requestAnimationFrame(loop);