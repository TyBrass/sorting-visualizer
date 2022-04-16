"use strict"

// - adjust sorting algorithms
//   - we have a sleep function that will wait the passed amount of time
//   - need to figure out how to highlight elements currently being moved now
//   - bubbleSort has an example of sleep() being used

// ==== Set up page =================================================
const arraySizeInput = document.querySelector('#array-size-input');
const sortSelector = document.querySelector('#sort-select');
const newArrayBtn = document.querySelector('#new-array-btn');
const sortBtn = document.querySelector('#sort-btn');
const graphContainer = document.querySelector('#graph');

// Array contains integers, sorted by those values, and the value corresponds 
// to the element's height in pixels (1-600 inclusive).
let arrayArray = [];  // Array representing the on-screen array

newArrayBtn.addEventListener('click', function () {
  arrayArray = [];
  for (let i = 0; i < arraySizeInput.value; i++)
    arrayArray.push(Math.floor(Math.random() * 600) + 1);
  arrayToGraph();
});

sortBtn.addEventListener('click', function () {
  switch (sortSelector.value) {
    case "quick-sort":
      quickSortDriver();
      break;
    case "merge-sort":
      mergeSortDriver();
      break;
    case "heap-sort":
      heapSort();
      break;
    case "insertion-sort":
      insertionSort();
      break;
    case "bubble-sort":
      bubbleSort();
      break;
  }
});
// ==================================================================


// ==== DOM array elements ==========================================
// note that most styling is done in styles.css, for class 'arrayElement'
// for each element in arrayArray, add to the graph div, in order
function arrayToGraph() {
  while (graphContainer.firstChild)
    graphContainer.removeChild(graphContainer.firstChild);
  for (let i = 0; i < arrayArray.length; i++) {
    let newElement = document.createElement('div');
    newElement.classList.add('arrayElement');
    newElement.style.height = `${arrayArray[i]}px`;
    graphContainer.appendChild(newElement);
  }
}
// ==================================================================

// ==== Sorting methods and helpers =================================
function quickSortDriver() {
  quickSort(arrayArray, 0, arrayArray.length - 1);
}

function quickSort(arr, start, end) {
  if (start < end) {
    let partitionIndex = partition(arr, start, end);
    quickSort(arr, start, partitionIndex - 1); // quicksort left
    quickSort(arr, partitionIndex + 1, end); // quicksort right
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];    // select pivot
  let i = (low - 1);
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;              // increment index of smaller element
      swap(arr, i, j);
    }
  }
  swap(arr, i + 1, high);
  return (i + 1);
}

function mergeSortDriver() {
  mergeSort(arrayArray, 0, arrayArray.length - 1);
}

function mergeSort(arr, start, end) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }
  return;
}

function merge(arr, start, mid, end) {
  // Create new arrays, copy values to them
  let n1 = mid - start + 1;
  let n2 = end - mid;
  let left = new Array[n1];
  let right = new Array[n2];
  for (let i = 0; i < n1; i++)
    left[i] = arr[start + i];
  for (let i = 0; i < n2; i++)
    right[i] = arr[mid + 1 + j];

  // Merge the temp array back into arr
  let i = 0;      // initial index of first subarray
  let j = 0;      // initial index or second subarray
  let k = start;  // initial index of merged subarray
  while (i < n1 && j < n2) {
    if (left[i] <= right[i]) {
      arr[k] = left[i];
      i++;
    }
    else {
      arr[k] = right[j];
      j++;
    }
    k++;
  }

  // Copy any remaining elements of remaining array
  while (i < n1) {
    arr[k] = left[i];
    i++;
    k++;
  }
  while (j < n2) {
    arr[k] = right[j];
    j++;
    k++;
  }
}

function heapSort() {
  let n = arrayArray.length;

  // Heapify (alters original array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arr, n, i);

  // Extract elements from heap, moving current node to the end
  for (let i = n - 1; i > 0; i--) {
    swap(arrayArray, i, 0);
    heapify(arr, i, 0);
  }
}

function heapify(arr, n, i) {
  let largest = i;
  let leftChild = i * 2 + 1;
  let rightChild = i * 2 + 2;

  // Check for a child larger than root
  if (leftChild < n && arr[leftChild] > arr[largest])
    largest = leftChild;
  if (rightChild < n && arr[rightChild] > arr[largest])
    largest = rightChild;

  // If largest has been changed, swap and then heapify
  if (largest != i) {
    swap(arr, i, largest);
    heapify(arr, n, largest);
  }

}

function insertionSort() {
  let j = 0;
  for (let i = 0; i < arrayArray.length; i++) {
    j = i;
    while (j > 0 && arrayArray[j] < arrayArray[j - 1])
      swap(arrayArray, j, j - 1);
  }
}

async function bubbleSort() {
  for (let i = 0; i < arrayArray.length; i++) {
    for (let j = 1; j < arrayArray.length - i; j++) {
      if (arrayArray[j - 1] > arrayArray[j]) {
        swap(arrayArray, j, j - 1);
        console.log('onda');
        await sleep(1);         // sleep
        arrayToGraph();         // run function
      }
    }
  }
}

function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ==================================================================

// Fire newArrayBtn event manually to start
newArrayBtn.click();
