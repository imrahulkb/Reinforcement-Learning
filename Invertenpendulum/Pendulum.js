class Pendulum {
    constructor(height, width, mass, originTheta, x,y) {
        this.height = height;
        this.width = width;
        this.mass = mass;
        this.theta = originTheta;
        this.angularV = 0.0;
        this.acceleration = 0;
        this.x = x;
        this.y = y;
    }
    draw(ctx) {
        const length = this.height;   // rod length (matches the physics)
        const thickness = this.width; // rod thickness

        ctx.save();
        ctx.translate(this.x, this.y);          // fixed bottom point
        ctx.rotate(this.theta);       // 0 = upright
        ctx.fillStyle = "blue";
        ctx.fillRect(-thickness / 2, -length, thickness, length);
        ctx.restore();
    }

    accelerate(keys,a) {
        let dx = 0;
        if (keys.has('ArrowLeft') && this.x>0) dx = -1,a=0.01;
        if (keys.has('ArrowRight') &&  this.x<400) dx = 1,a=-0.01;
        
        this.x+=dx;

        this.acceleration = 0.0000005 * this.mass * 10 * this.height / 2 * Math.sin(this.theta) - 3*a/(2*this.height);
        this.angularV -= this.acceleration;
        this.theta -= this.angularV;
        this.theta = (this.theta+ 2*Math.PI)%(2*Math.PI);
        console.log(this.acceleration, this.angularV, this.theta/Math.PI);
    }
}

export { Pendulum };