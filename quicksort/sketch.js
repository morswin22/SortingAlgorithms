let i = 0;
let wV = 10;
let speedV = 25;
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

  speed = createSlider(0, 25, speedV, 1);
  speed.changed(()=>{
    speedV = speed.value();
  });

  showPivot = createCheckbox("Show pivots?", showPivotV);
  showPivot.changed(()=>{
    showPivotV = showPivot.checked();
  });

  init();
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
  for (let i = start; i < end; i++) {
    if (arr[i] < pivotValue) {
      await swap(arr, i, pivotIndex);
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

async function swap(arr, a, b) {
  if (speedV > 0) await sleep(speedV);
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}