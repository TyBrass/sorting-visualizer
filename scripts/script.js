"use strict"

// ==== Set up page =================================================
const arraySizeInput = document.querySelector('#array-size-input');
const sortSelector = document.querySelector('#sort-select');
const newArrayBtn = document.querySelector('#new-array-btn');
const graphContainer = document.querySelector('#graph');

newArrayBtn.addEventListener("click", function() {
  arraySize = arraySizeInput.value;
  sortSelection = sortSelector.value;
  initializeArray(arraySize);
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
function quickSort() {

}

function partition() {

}

function mergeSort() {

}

function merge() {

}

function heapSort() {

}

function heapify() {

}

function insertionSort() {

}

function bubbleSort() {
  
}
// ==================================================================
