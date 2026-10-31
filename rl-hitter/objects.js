class Fighter {
    constructor(x, y, size, speed, brain, sensors) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.img = new Image();
        this.img.src = './assets/fighter.svg';
        this.speed = speed;
        this.shots = [];
        this.lastShot = 0;          // timestamp of last shot
        this.cooldown = 350;       // ms between shots
        this.brain = brain;
        this.sensors = sensors;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
        this.shots.map((shot) => shot.draw(ctx));
        for (let i = 1; i <= this.sensors; i++) {
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(this.x + 25, this.y + 25);
            ctx.lineTo(
                this.x + 25 + 200 * Math.cos((Math.PI / 3) * (i / this.sensors) - Math.PI / 6),
                this.y + 25 + 200 * Math.sin((Math.PI / 3) * (i / this.sensors) - Math.PI / 6)
            ); ctx.stroke();
        }
    }

    move(dt, canvas) {
        const { dx, dy } = this.brain.action();
        this.x += dx * this.speed * dt;
        this.y += dy * this.speed * dt;
        this.x = Math.max(0, Math.min(canvas.width - this.size, this.x));
        this.y = Math.max(0, Math.min(canvas.height - this.size, this.y));

        this.shots.map((shot) => shot.move(dt))
    }

    fire() {
        const now = performance.now();
        if (now - this.lastShot >= this.cooldown) {
            this.shots.push(new Bullet(this.x, this.y, 20, 300, false));
            this.lastShot = now;
        }
    }

    collideCheck(chips){
        this.shots.map(shot=>{
            chips.map(chip=>{
                if(rectsCollide(shot,chip)){
                    shot.stop = true;
                    chip.stop = true;
                }
            })
        })
    }
}

class Bullet {
    constructor(x, y, size, speed, active) {
        console.log(this)
        this.x = x;
        this.y = y;
        this.size = size;
        this.width = size;
        this.height = size;
        this.img = new Image();
        this.img.src = './assets/bullet.svg';
        this.speed = speed;
        this.active = active;
        this.stop = false;
    }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
    }
    move(dt) {
        if(!this.stop)
        this.x += dt * this.speed;
    }
    collideCheck(chips){

    }
}

class Brain {
    constructor(action) {
        this.action = action;
    };
    // constructor(info){
    //     this.info = info;
    // }
    // action(){
    //     return ''
    // }
}

class Sensors {
    constructor(count) {
        this.count = count;
    }
}

class Chip {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        this.hit = false;
    }
    draw(ctx) {
        ctx.fillStyle = this.hit ? "red" : "blue";
        ctx.fillRect(this.x, this.y, 20, 20);
    }
}

function rectsCollide(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}
export { Fighter, Bullet, Brain, Chip };



// if (dx && dy) { dx *= Math.SQRT1_2; dy *= Math.SQRT1_2; }
