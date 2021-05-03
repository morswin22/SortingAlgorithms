registerSorter('quicksort', async array => {

  const makePartition = async (array, lo, hi) => {
    const pivot = array[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
      if (array[j] < pivot) {
        await swap(array, i, j);
        i += 1;
      }
    }
    await swap(array, i, hi);
    return i;
  };

  const sortPartition = async (array, lo, hi) => {
    if (lo >= hi)
      return;
    const p = await makePartition(array, lo, hi);
    await sortPartition(array, lo, p - 1);
    await sortPartition(array, p + 1, hi);
  };

  await sortPartition(array, 0, array.length - 1);

  return array;
});