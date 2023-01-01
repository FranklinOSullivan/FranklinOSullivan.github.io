const personalSeries = [0, 10, 22, 47, 100, 150, 200, 220, 270, 330, 470,
  510, 680, 1000, 2000, 2200, 3300, 4700, 5100, 6800, 10000]


// Function to find the resistance values, called from button input
function findResistanceValues() {
  // Find the value wanted by the user
  let wantedValue = Number(document.getElementById("wantedResistance").value);
  let wantedSeries = null;
  // Find the series the user wants to use
  if (document.getElementById("resistorSeriesPersonal").checked) {
    wantedSeries = personalSeries;
  }
  let seriesArray, seriesValue = findSeriesComb(wantedValue, wantedSeries);
  console.log(seriesArray);
  document.getElementById("seriesValue0").innerHTML = seriesArray;
  document.getElementById("seriesResult").innerHTML = seriesValue;
  alert("Values displayed")
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
  return currentBestComb, currentBestComb[0] + currentBestComb[1];
}

// Function to compare values
function compareValuesSeries(val1, val2, expectedVal) {
  // Get the values
  let num1 = val1[0] + val1[1];
  let num2 = val2[0] + val2[1];
  // Find the distances
  let dist1 = Math.abs(expectedVal - num1);
  let dist2 = Math.abs(expectedVal - num2);
  // Compare distances
  if (dist1 < dist2) {
    return val1;
  }
  else {
    return val2;
  }
}