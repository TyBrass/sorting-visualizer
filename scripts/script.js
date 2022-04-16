"use strict"

// Maybe each array item shouldn't be an integer, but a DOM object?
// Build the sorts first. Once that's done, then design the graphics.
// Once we know how the graph will be shown (probably DOM objects), then
// the sorts just need to be adjusted a bit.

// ==== Set up page =================================================
const arraySizeInput = document.querySelector('#array-size-input');
const sortSelector = document.querySelector('#sort-select');
const newArrayBtn = document.querySelector('#new-array-btn');
const sortBtn = document.querySelector('#sort-btn');
const graphContainer = document.querySelector('#graph');

newArrayBtn.addEventListener('click', function() {
  arraySize = arraySizeInput.value;
  sortSelection = sortSelector.value;
  initializeArray(arraySize);
});

sortBtn.addEventListener('click', function() {

});

// Array contains integers, sorted by those values, and the value corresponds 
// to the element's height in pixels (1-600 inclusive).
let arrayArray = [];  // Array representing the on-screen array
// ==================================================================

// ==== Misc. =======================================================
function initializeArray(size) {
  arrayArray = [];
  for (let i = 0; i < size; i++)
    arrayArray.push(Math.floor(Math.random() * 600) + 1);
}


// Could we instead an event listener to the array being updated?
function updateGraph() {

}
// ==================================================================

// ==== Sorting methods and helpers =================================
function quickSortDriver() {
  quickSort(arrayArray, 0, arrayArray.length - 1);
}

function quickSort(arr, start, end) {
  if (start < end) {
    let mid = start + end / 2
    partition(arr, (start + end) / 2); // partition
    quickSort(arr, start, (start + end) / 2 - 1); // quicksort left
    quickSort(arr, (start + end) / 2 + 1, end); // quicksort right
  }
}

function partition(arr, pivotIndex) {

}

function mergeSortDriver() {
  mergeSort(arrayArray, 0, arrayArray.length - 1);
}

function mergeSort(arr, start, end) {
  if (start < end) {
    let mid = (start + end) / 2
    mergeSort(arr, start, mid);
    mergeSort(arr, mid + 1, end);
    merge(arr, start, mid, end);
  }
  return;
}

function merge() {
  
}

function heapSort() {
  let n = arrayArray.length;

  // Heapify (alters original array)
  for (let i = Math.floor(n/2) - 1; i >= 0; i--)
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
    while (j > 0 && arrayArray[j] < arrayArray[j-1])
      swap(arrayArray, j, j-1);
  }
}

function bubbleSort() {
  for (let i = 0; i < arrayArray.length; i++) {
    for (let j = 1; j < arrayArray.length - i; j++) {
      if (arrayArray[j - 1] > arrayArray[j])
        swap(arrayArray, j, j-1);
    }
  }
}

function swap(arr, index1, index2) {
  temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}
// ==================================================================
