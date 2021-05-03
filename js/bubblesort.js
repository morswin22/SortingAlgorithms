registerSorter('bubblesort', async array => {

  for (let i = 0; i < array.length; i++) {
    for (let j = 1; j < array.length; j++) {
      if (array[j-1] > array[j]) {
        await swap(array, j-1, j);
      }
    }
  }

  return array;
});