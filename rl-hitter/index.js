import { Fighter, Brain, Chip } from "./objects.js";
import { addEvents } from "./events.js";
import * as tf from '@tensorflow/tfjs';

let last = performance.now();
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
// speed in px/second
const keys = new Set();

const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr;
canvas.height = window.innerHeight * dpr;
ctx.scale(dpr, dpr);

addEvents(keys);

function action(){
    let dx = 0, dy = 0;
    if (keys.has('ArrowLeft')) dx -= 1;
    if (keys.has('ArrowRight')) dx += 1;
    if (keys.has('ArrowUp')) dy -= 1;
    if (keys.has('ArrowDown')) dy += 1;
    if (keys.has(' ')) {
        fighter.fire();
    }
    return {dx,dy};
}

const brain = new Brain(action);

const fighter = new Fighter(380,180,40,200,brain,6);

const chips = [new Chip(380,300), new Chip(500, 300)]
const fighters = [fighter];



function frame(now) {

    const dt = (now - last) / 1000;

    last = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fighters.map((fighter)=>{ fighter.move(dt,canvas);
        fighter.collideCheck(chips);
    });
    fighters.map((fighter)=>{ fighter.draw(ctx) });
    chips.map(chip=>chip.draw(ctx));
    requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
