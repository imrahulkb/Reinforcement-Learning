# Show an SVG file in a canvas

## 1. Keep the SVG in its own file

```
project/
├── index.html
└── ship.svg
```

## 2. Load the file into an `Image`

```html
<canvas id="c" width="800" height="400"></canvas>
<script>
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.src = 'ship.svg';   // path to your SVG file
  img.onload = () => {
    ctx.drawImage(img, 50, 50, 80, 80);  // x, y, width, height
  };
</script>
```

An SVG loaded this way is rasterized when it loads, so give `drawImage` the size you need.

## 3. Animate it in a loop

```js
const img = new Image();
img.src = 'ship.svg';

let x = 0, y = 100, vx = 120;
let last = performance.now();

function frame(now) {
  const dt = (now - last) / 1000;
  last = now;

  x += vx * dt;
  if (x > canvas.width) x = -80;   // wrap around

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (img.complete && img.naturalWidth) {
    ctx.drawImage(img, x, y, 80, 80);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
```

The `img.complete && img.naturalWidth` check makes sure the file has loaded before drawing.

## Notes

- **Use a local server.** Opening `index.html` directly from disk (`file://`) can block the file load in some browsers. Run `python3 -m http.server` in the project folder and open `http://localhost:8000`.
- **Size and sharpness.** Draw the SVG at the size you need. Scaling a rasterized image up later looks soft.
- **Transparent background.** The SVG's transparent areas stay transparent on the canvas.
- **Changing colors or parts.** An `Image` is drawn as one picture. To move or recolor individual parts, inline the SVG markup and draw it with `Path2D` instead.