"use strict"

// - merge and mergeSort are screwed up right now, not just due to async issues
// - merge and quick don't work well with async and sleep()
// - need to figure out how to highlight elements currently being moved now
// - make buttons unselectable while a sort is ongoing. There are some things in the 
//   anon functions, but because the sorts are asyncs, they don't work right

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
  disableButtons();
  switch (sortSelector.value) {
    case "quick-sort":
      quickSort(arrayArray, 0, arrayArray.length - 1);
      break;
    case "merge-sort":
      mergeSort(arrayArray, arrayArray.length);
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
  enableButtons();
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
function quickSort(arr, start, end) {
  let stack = new Array(end - start + 1);
  stack.fill(0);
  let top = -1;
  stack[++top] = start;
  stack[++top] = end;

  while (top >= 0) {
    end = stack[top--];
    start = stack[top--];
    let p = partition(arr, start, end);
    if (p - 1 > end) {
      stack[++top] = start;
      stack[++top] = p - 1;
    }
    if (p + 1 < end) {
      stack[++top] = p + 1;
      stack[++top] = end;
    }
  }
  arrayToGraph();
  console.log(arrayArray);
}

function partition(arr, low, high) {
  let pivot = arr[high];
  let i = (low - 1);
  for (let j = low; j<= high - 1; j++) {
    if (arr[j] <= pivot) {
      i++;
      swap(arr, i, j);
      arrayToGraph();
    }
  }
  swap(arr, i+1, high);
  arrayToGraph();
  return i + 1;
}

async function mergeSort(arr, n) {
  let currSize;
  let leftStart;
  for (currSize = 1; currSize <= n - 1; currSize = 2 * currSize) {
    for (leftStart = 0; leftStart < n - 1; leftStart += 2 * currSize) {
      let mid = Math.min(leftStart + currSize - 1, n - 1);
      let rightEnd = Math.min(leftStart + 2 * currSize - 1, n - 1);
      await sleep(2);
      arrayToGraph();
      merge(arr, leftStart, mid, rightEnd);
    }
  }
  await sleep(2);
  arrayToGraph();
}

function merge(arr, start, mid, end) {
  let i;
  let j;
  let k;
  let n1 = mid - start + 1;
  let n2 = end - mid;
  let leftArr = Array(n1).fill(0);
  let rightArr = Array(n2).fill(0);

  for (i = 0; i < n1; i++)
    leftArr[i] = arr[start + i];
    arrayToGraph();
  for (j = 0; j < n2; j++)
    rightArr[j] = arr[mid + 1 + j];
    arrayToGraph();

  i = 0;
  j = 0;
  k = start;
  while (i < n1 && j < n2) {
    if (leftArr[i] <= rightArr[j]) {
      arr[k] = leftArr[i];
      arrayToGraph();
      i++;
    } else {
      arr[k] = rightArr[j];
      arrayToGraph();
      j++;
    }
    k++;
  }

  while (i < n1) {
    arr[k] = leftArr[i];
    arrayToGraph();
    i++;
    k++;
  }

  while (j < n2) {
    arr[k] = rightArr[j];
    arrayToGraph();
    j++;
    k++;
  }
}

async function heapSort() {
  let n = arrayArray.length;

  // Heapify (alters original array)
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    heapify(arrayArray, n, i);

  // Extract elements from heap, moving current node to the end
  for (let i = n - 1; i > 0; i--) {
    swap(arrayArray, i, 0);
    heapify(arrayArray, i, 0);
    await sleep(2);
    arrayToGraph();
  }
}

async function heapify(arr, n, i) {
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
  await sleep(2);
  arrayToGraph();
}

async function insertionSort() {
  let j;
  let key;
  for (let i = 1; i < arrayArray.length; i++) {
    key = arrayArray[i];
    j = i - 1;
    while (j >= 0 && arrayArray[j] > key) {
      arrayArray[j + 1] = arrayArray[j];
      j = j - 1;
      await sleep(2);
      arrayToGraph();
    }
    arrayArray[j + 1] = key;
  }
}

async function bubbleSort() {
  for (let i = 0; i < arrayArray.length; i++) {
    for (let j = 1; j < arrayArray.length - i; j++) {
      if (arrayArray[j - 1] > arrayArray[j]) {
        swap(arrayArray, j, j - 1);
        await sleep(2);
        arrayToGraph();
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

function disableButtons() {
  console.log("Running");
  newArrayBtn.classList.add('disabled');
  sortBtn.classList.add('disabled');
}

function enableButtons() {
  newArrayBtn.classList.remove('disabled');
  sortBtn.classList.remove('disabled');
}

// Fire newArrayBtn event manually to start
newArrayBtn.click();


