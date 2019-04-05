let i = 0;
let j = 0;

let wV = 10;
let speedV = 60;
let showSelectedV = false;

let values;

let showPivot;
let speed;
let w;

let canvas;

function setup() {
  canvas = createCanvas(windowWidth, 400);
  w = createSlider(1, 20, wV, 1);
  w.changed(()=>{
    wV = w.value();
    init();
  });

  speed = createSlider(1, 60, speedV, 1);
  speed.changed(()=>{
    speedV = speed.value();
    frameRate(speedV);
  });

  showSelected = createCheckbox("Show selected?", showSelectedV);
  showSelected.changed(()=>{
    showSelectedV = showSelected.checked();
  });

  init();
}

function windowResized() {
  resizeCanvas(windowWidth, 400);
  init();
}

function init() {
  values = new Array(floor(width/wV));
  for (let i = 0; i<values.length; i++) {
    values[i] = random(height);
  }
  i = 0;
  j = 0;
  loop();
}

function draw() {
  background(51);

  let a = values[j];
  let b = values[j+1];
  if (a > b) {
    swap(values, j, j+1);
  }

  if (i < values.length) {
    j++;
    if (j>=values.length-i-1) {
      j = 0;
      i++;
    }
  } else {
    noLoop();
  }

  for (let i = 0; i < values.length; i++) {
    noStroke();
    fill(255);
    if (showSelectedV && i == j) {
        fill('#E0777D');
    }
    rect(i*wV, height-values[i], wV, values[i]);
  }
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}