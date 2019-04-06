let i = 0;
let wV = 10;
let speedV = 25;
let iters = 1;
let showPivotV = false;

let values;
let states;

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

  speed = createSlider(0, 50, speedV, 1);
  speedV = 0;
  speed.changed(()=>{
    speedV = constrain(map(speed.value(), 0, 25, 25, 0), 0, 25);
    if (speed.value() > 25) {
      iters = floor(map(speed.value(), 25, 50, 1, 10));
    } else {
      iters = 1;
    }
  });

  showPivot = createCheckbox("Show pivots?", showPivotV);
  showPivot.changed(()=>{
    showPivotV = showPivot.checked();
  });

  init();
}

function keyPressed() {
  if (key == "r") {
    init();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, 400);
  init();
}

function init() {
  states = [];
  values = new Array(floor(width/wV));
  for (let i = 0; i<values.length; i++) {
    values[i] = random(height);
    states[i] = false;
  }
  quickSort(values, 0, values.length - 1);
}

async function quickSort(arr, start, end) {
  if (start >= end) {
    return;
  }
  let index = await partition(arr,start,end);
  await Promise.all([
    quickSort(arr, start, index - 1),
    quickSort(arr, index + 1, end)
  ]);
}

async function partition(arr, start, end) {
  let pivotIndex = start;
  let pivotValue = arr[end];
  states[pivotIndex] = true;
  let iter = 0;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex, iter);
      iter++;
      states[pivotIndex] = false;
      pivotIndex++;
      states[pivotIndex] = true;
    }
  }
  await swap(arr, pivotIndex, end);
  return pivotIndex;
}

function draw() {
  background(51);

  for (let i = 0; i < values.length; i++) {
    noStroke();
    fill(255);
    if (showPivotV && states[i]) {
      fill('#E0777D');
    }
    rect(i*wV, height-values[i], wV, values[i]);
  }
}

async function swap(arr, a, b, iter) {
  if (iter % iters == 0) await sleep(speedV);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}