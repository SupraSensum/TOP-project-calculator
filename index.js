// 
// Globals
// 

// Get elements
const theCalculator = document.getElementById('theCalculator');
const contentContainer = document.getElementById('content');
const calcNumberKeys = document.querySelectorAll('.calc-number-key');
const calcOperatorKeys = document.querySelectorAll('.calc-operator-key');
const displayResultField = document.getElementById('calc-result');

// Declare constants
const calc = {
   '+': (a, b) => a + b,
   '−': (a, b) => a - b,
   '×': (a, b) => a * b,
   '÷': (a, b) => a / b,
}

// Declare variables
let operandA,
   operandB,
   operator,
   displayValue = '';

// First runs
setCalcHeightToPropOfWidth();

// Add event listeners
window.addEventListener('resize', setCalcHeightToPropOfWidth);
calcNumberKeys.forEach((numberKey) => {
   numberKey.addEventListener('click', () => updateDisplayValue(numberKey.textContent));
})
calcOperatorKeys.forEach((operatorKey) => {
   operatorKey.addEventListener('click', () => beginOperation(operatorKey));
})

// 
// Functions
// 

function operate(op, a, b) {
   return calc[op](a, b);
}

// set calculator height to be a proportion of its width
function setCalcHeightToPropOfWidth() {
   const calcWidth = theCalculator.clientWidth;
   const contentHeight = contentContainer.clientHeight;
   const MAX_HEIGHT = contentHeight * 0.75;
   const MIN_HEIGHT = 350;

   let newHeight = calcWidth * 1.5;

   if (newHeight > MAX_HEIGHT){
      newHeight = MAX_HEIGHT;
   } else if (newHeight < MIN_HEIGHT) {
      newHeight = MIN_HEIGHT;
   }

   theCalculator.style.height = `${newHeight}px`;
}

function updateDisplayValue(value) {
   displayValue += String(value);
   updateDisplay(displayValue);
}

function updateDisplay(newDisplayValue) {
   displayResultField.textContent = newDisplayValue;
}

function beginOperation(operatorKey) {
   operandA = Number(displayValue);
   operator = operatorKey.textContent;

}

// 
// DEBUGGING
// 
for (let key in calc) {
   console.log(operate(key, 10, 10));
}

// // LOGIC
// display value is input by user

// user selects operand
//    - push display value to operandA variable
//    - push operand selected to operator variable
//    - clear display
 
// user selects equals
//    - push display value to operandB variable
//    - perform calculation
//    - push result to display