const personalSeries = [0, 10, 22, 47, 100, 150, 200, 220, 270, 330, 470,
  510, 680, 1000, 2000, 2200, 3300, 4700, 5100, 6800, 10000]


// Function to find the resistance values, called from button input
function findResistanceValues() {
  // Find the value wanted by the user
  let wantedValue = Number(document.getElementById("wantedResistance").value);
  alert(wantedValue);
}