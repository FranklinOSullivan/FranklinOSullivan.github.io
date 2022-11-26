// Define arrays for the different resistor ranges
let personalResistorRange = new Array()
let e12ResistorRange = new Array(1.0, 1.2, 1.5, 1.8, 2.2, 2.7, 3.3, 3.9, 4.7, 5.6, 6.8, 8.2)

// Iterate for all of the multipliers
for (let i = 0; i < 7; i++){
  // Iterate through all of the values
  for (let j = 0; j < 11; j++){
    e12ResistorRange.push(e12ResistorRange[j] * (10 ^ i));
  }
}
console.log(e12ResistorRange)
