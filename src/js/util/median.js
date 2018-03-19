export default arr => {
  const halfIndex = (arr.length / 2) | 0;
  const sortedArr = arr.sort();

  if (sortedArr % 2) {
    return sortedArr[halfIndex];
  }

  return (sortedArr[halfIndex - 1] + sortedArr[halfIndex]) / 2;
}
