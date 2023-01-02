// Series of my personal resistors
const personalSeries = [0, 10, 22, 47, 100, 150, 200, 220, 270, 330, 470,
  510, 680, 1000, 2000, 2200, 3300, 4700, 5100, 6800, 10000];
// Series of E12 resistors
const e12Series = [0, 10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82, 100,
  120, 150, 180, 220, 270, 330, 390, 470, 560, 680, 820, 1000, 1200, 1500,
  1800, 2200, 2700, 3300, 3900, 4700, 5600, 6800, 8200, 10000, 12000, 15000,
  18000, 22000, 27000, 33000, 39000, 47000, 56000, 68000, 82000, 100000,
  120000, 150000, 180000, 220000, 270000, 330000, 390000, 470000, 560000,
  680000, 820000, 1000000];


// Function to find the resistance values, called from button input
function findResistanceValues() {
  // Find the value wanted by the user
  let wantedValue = Number(document.getElementById("wantedResistance").value);
  let wantedSeries = null;
  // Find the series the user wants to use
  if (document.getElementById("resistorSeriesPersonalV").checked) {
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
  if (expectedVal == 0) {
    return 0;
  }
  if (expectedVal < givenVal) {
    return (expectedVal / givenVal) * 100;
  }
  else {
    return (givenVal / expectedVal) * 100;
  }
}


// Function to find the resistor ratio
function findResistorRatio() {
  // Find the value wanted by the user
  let wantedRatio = Number(document.getElementById("wantedRatio").value);
  // Find the series the user wants to use
  if (document.getElementById("resistorSeriesPersonalR").checked) {
    wantedSeries = personalSeries;
  }
  else {
    wantedSeries = e12Series;
  }
  let currentBestComb = [0, 0];
  let currentComb = [0, 0];
  // Loop to find the combinations
  for (const i of wantedSeries) {
    for (const j of wantedSeries) {
      currentComb = [i, j];
      currentBestComb = compareValuesRatio(currentBestComb, currentComb, wantedRatio);
    }
  }
  // Display the best combination to the user
  document.getElementById("ratioValuesDisplay").style.display = "block";
  document.getElementById("ratioValues").innerHTML = currentBestComb;
  document.getElementById("ratioResult").innerHTML = currentBestComb[0] / currentBestComb[1];
  document.getElementById("ratioAccuracy").innerHTML = findAccuracy(currentBestComb[0] / currentBestComb[1], wantedRatio);
}

// Function to compare the values of a ratio
function compareValuesRatio(val1, val2, expectedVal) {
  let num1R = 0;
  let num2R = 0;
  // Find the values checking for zero division
  if (val1[1] == 0) {
    num1R = 0;
  }
  else {
    num1R = val1[0] / val1[1];
  }
  if (val2[1] == 0) {
    num2R = 0;
  }
  else {
    num2R = val2[0] / val2[1];
  }
  // Find the smallest distance
  let dist1 = Math.abs(expectedVal - num1R);
  let dist2 = Math.abs(expectedVal - num2R);
  // Return the smallest distance
  if (dist1 < dist2) {
    return val1;
  }
  else {
    return val2;
  }
}