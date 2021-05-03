const sorters = {};
let numberOfItems = 10;
let sleepTime = 200;
let arrayToDisplay = [];

function setup() {
  createCanvas(640, 480);
  addSliders();
  addEvents();
  loadFromUrl();
}

function draw() {
  background(51);

  const w = width / numberOfItems;

  if (w > 15) {
    strokeWeight(5);
    stroke(30);
  } else {
    noStroke();
  }

  fill(220);
  for (let i = 0; i < numberOfItems; i++) {
    const h = (1-arrayToDisplay[i]) * height;
    rect(i*w, h, w, height+1);
  }
}

function addSliders() {
  addSlider('Number of items', 10, 1000, 25, 5, {
    change: newValue => {
      numberOfItems = newValue;
      loadFromUrl();
    },
  });
  addSlider('Swap sleep time', 0, 1000, 200, 10, {
    input: newValue => sleepTime = newValue,
  });
}

function addSlider(name, min_, max_, default_, step, callbacks) {
  const id = `slider-${name.replace(/\W/g, '-')}`;
  const container = document.createElement('div');

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.id = id;
  slider.value = default_;
  slider.min = min_;
  slider.max = max_;
  slider.step = step;

  for (const event in callbacks) {
    callbacks[event](default_);
    slider.addEventListener(event, () => callbacks[event](Number(slider.value)));
  }
  
  const label = document.createElement('label');
  label.innerText = name;
  label.htmlFor = id;

  const value = document.createElement('label');
  value.innerText = default_;
  value.htmlFor = id;

  slider.addEventListener('input', () => value.innerText = slider.value);

  container.append(label, slider, value);
  display.appendChild(container);
}

function addEvents() {
  const links = navbar.querySelectorAll('a');
  for (const link of links) {
    link.addEventListener('click', ({ target }) => {
      loadFromName(target.href.split('#').pop());
    });
  }
  const back = display.querySelector('a');
  back.addEventListener('click', unload);
}

function loadFromUrl() {
  const name = window.location.href.split('#').pop();
  if (name && sorters[name]) {
    loadFromName(name);
  } else {
    unload();
  }
}

function loadFromName(name) {
  if (!name)
    return unload();
  navbar.classList.add('hide');
  display.classList.remove('hide');
  const arrayToSort = new Array(numberOfItems).fill().map(() => Math.random());
  sorters[name](arrayToSort).then(finished);
  arrayToDisplay = arrayToSort;
}

function unload() {
  arrayToDisplay = [];
  window.location.assign('#');
  navbar.classList.remove('hide');
  display.classList.add('hide');
}

function finished(sortedArray) {
  let sorted = true;
  for (let i = 1; i < sortedArray.length; i++) {
    if (sortedArray[i-1] > sortedArray[i]) {
      sorted = false;
      break;
    }
  }
  console.log(sorted ? '✅ Sorted' : '❌ Not sorted', sortedArray);
}

function registerSorter(name, sorter) {
  if (!navbar.querySelector(`a[href="#${name}"]`)) {
    const link = document.createElement('a');
    link.href = `#${name}`;
    link.innerText = name[0].toUpperCase() + name.slice(1);
    navbar.appendChild(link);
    console.error(`Please add a permanent link to ${name} sorter`);
  }
  sorters[name] = sorter;
}

async function swap(array, a, b) {
  await sleep(sleepTime);
  const temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}