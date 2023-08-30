// 
// Globals
// 

// Get elements
const theCalculator = document.getElementById('theCalculator');
const contentContainer = document.getElementById('content');
const calcNumberKeys = document.querySelectorAll('.calc-number-key');
const calcOperatorKeys = document.querySelectorAll('.calc-operator-key');
const displayResultField = document.getElementById('calc-result');
const calcEqualsKey = document.getElementById('calc-equals');
const calcClearKey = document.getElementById('calc-clear');

// Declare constants
const calc = {
   '+': (a, b) => a + b,
   '−': (a, b) => a - b,
   '×': (a, b) => a * b,
   '÷': (a, b) => a / b,
}

// Declare variables
let operandA = null,
   operandB = null,
   operator = null,
   displayValue  = '';

// First runs
setCalcHeightToPropOfWidth();

// Add event listeners
window.addEventListener('resize', setCalcHeightToPropOfWidth);
calcNumberKeys.forEach((numberKey) => {
   numberKey.addEventListener('click', () => appendToDisplay(numberKey.textContent));
});
calcOperatorKeys.forEach((operatorKey) => {
   operatorKey.addEventListener('click', () => updateExpression(operatorKey));
});
calcEqualsKey.addEventListener('click', calculateFinalResult);
calcClearKey.addEventListener('click', clearEverything);

// 
// Functions
// 

function operate(op, a, b) {
   return calc[op](a, b)
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

// 
// DEBUGGING
// 

