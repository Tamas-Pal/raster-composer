export default function binarySearch(
    array: number[][],
    targetIndex: number,
    target: number,
    start: number,
    end: number
  ) {
    const lookupIndex = Math.floor((start + end) / 2);
    const lookupValue = array[lookupIndex][targetIndex];
    if (lookupValue === target) {
      return true;
    } else if (lookupValue < target) {
      binarySearch(array, targetIndex, target, start, lookupIndex - 1);
    } else if (lookupValue > target) {
      binarySearch(array, targetIndex, target, lookupIndex + 1, end);
    }
    return false;
  }