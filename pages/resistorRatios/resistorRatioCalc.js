// Series of my personal resistors
const personalSeries = [0, 10, 22, 47, 100, 150, 200, 220, 270, 330, 470,
  510, 680, 1000, 2000, 2200, 3300, 4700, 5100, 6800, 10000];
// Series of E12 resistors
const e12Series = [0, 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82, 100,
  120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820, 1000, 1200, 1500,
  1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200, 10000];


// Function to find the resistance values, called from button input
function findResistanceValues() {
  // Find the value wanted by the user
  let wantedValue = Number(document.getElementById("wantedResistance").value);
  let wantedSeries = null;
  // Find the series the user wants to use
  if (document.getElementById("resistorSeriesPersonal").checked) {
    wantedSeries = personalSeries;
  }
  else {
    wantedSeries = e12Series;
  }
  let seriesArray = findSeriesComb(wantedValue, wantedSeries);
  let parallelArray = findParallelComb(wantedValue, wantedSeries);
  document.getElementById("seriesValuesDisplay").style.display = "block";
  document.getElementById("parallelValuesDisplay").style.display = "block";
  document.getElementById("seriesValues").innerHTML = seriesArray;
  document.getElementById("seriesResult").innerHTML = seriesArray[0] + seriesArray[1];
  document.getElementById("seriesAccuracy").innerHTML = findAccuracy(seriesArray[0] + seriesArray[1], wantedValue);
  document.getElementById("parallelValues").innerHTML = parallelArray;
  document.getElementById("parallelResult").innerHTML = (1 / ((1 / parallelArray[0]) + (1 / parallelArray[1])));
  document.getElementById("parallelAccuracy").innerHTML = findAccuracy((1 / ((1 / parallelArray[0]) + (1 / parallelArray[1]))), wantedValue);
}

// Function to find the series combination
function findSeriesComb(inputValue, inputSeries) {
  let currentBestComb = [0, 0];
  let currentComb = [0, 0];
  // Loop to find the combinations
  for (const i of inputSeries) {
    for (const j of inputSeries) {
      currentComb = [i, j];
      currentBestComb = compareValuesSeries(currentBestComb, currentComb, inputValue);
    }
  }
  return currentBestComb;
}

// Function to find the parallel combination
function findParallelComb(inputValue, inputSeries) {
  let currentBestComb = [0, 0];
  let currentComb = [0, 0];
  // Loop to find the combinations
  for (const i of inputSeries) {
    for (const j of inputSeries) {
      currentComb = [i, j];
      currentBestComb = compareValuesParallel(currentBestComb, currentComb, inputValue);
    }
  }
  return currentBestComb;
}

// Function to compare values
function compareValuesSeries(val1, val2, expectedVal) {
  // Get the values
  let num1S = val1[0] + val1[1];
  let num2S = val2[0] + val2[1];
  // Find the distances
  let dist1 = Math.abs(expectedVal - num1S);
  let dist2 = Math.abs(expectedVal - num2S);
  // Compare distances
  if (dist1 < dist2) {
    return val1;
  }
  else {
    return val2;
  }
}

// Function to compare parallel values
function compareValuesParallel(val1, val2, expectedVal) {
  let num1P = 0;
  let num2P = 0;
  // get the values and check for zero division
  if (val1[0] == 0 || val1[1] == 0) {
    num1P = 0;
  }
  else {
    num1P = (1 / ((1 / val1[0]) + (1 / val1[1])));
  }
  if (val2[0] == 0 || val2[1] == 0) {
    num2P = 0;
  }
  else {
    num2P = (1 / ((1 / val2[0]) + (1 / val2[1])));
  }
  // Find the shortest distance
  let dist1 = Math.abs(expectedVal - num1P);
  let dist2 = Math.abs(expectedVal - num2P);
  // Compare distances
  if (dist1 < dist2) {
    return val1;
  }
  else {
    return val2;
  }
}

// Function to find the accuracy of the result
function findAccuracy(givenVal, expectedVal) {
  return (givenVal / expectedVal) * 100;
}