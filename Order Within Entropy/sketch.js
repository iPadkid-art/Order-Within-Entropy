let img;
let slices = [];
let numSlices = 352;
let sliceWidth;
let sliceHeight;
let fluidity = 0.3;
let noiseScale = 0.02;

function preload() {
  img = loadImage('https://raw.githubusercontent.com/ipadkideth/glitch-one/main/Untitled_Artwork%204.jpg');
}

function setup() {
  createCanvas(960, 720);
  sliceWidth = width / numSlices;
  sliceHeight = height / 3;
  for (let i = 0; i < numSlices; i++) {
    let slice = img.get(i * sliceWidth, 0, sliceWidth, sliceHeight);
    slices.push(slice);
  }
  noiseSeed(123);
}

function draw() {
  background(0);
  let offsetY = map(mouseY, 0, height, -200, 200);
  let gapSize = sliceHeight / 2;
  for (let i = 0; i < numSlices; i++) {
    let slice = slices[i];
    let x = i * sliceWidth;
    let y = noise(frameCount * fluidity + i) * sliceHeight;
    y += noise(i) * gapSize - gapSize / 2; // add a random gap in the wave pattern
    y = map(y, 0, sliceHeight, -10, 10);
    y += sin(frameCount * 0.05 + i * 0.1) * 20;
    y += noise(frameCount * 0.01 + i) * 40;
    y += sin(frameCount * 0.1 + i * 0.2) * 5;
    y += noise(frameCount * noiseScale + i * 0.1) * 200;
    y += offsetY;
    image(slice, x, y);
  }
}

