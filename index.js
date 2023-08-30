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

function clearDisplay() {
   displayValue = '';
   updateDisplay();
}

function appendToDisplay(value) {
   displayValue += String(value);
   updateDisplay();
}

function updateDisplay(someString = displayValue) {
   someString.toString();
   displayResultField.textContent = someString;
}

function updateExpression(operatorKey) {
   // update operands
   if (operandA === undefined || operandA === null) {
      operandA = Number(displayValue);
   } else {
      operandB = Number(displayValue);
   }

   // check if calcution is needed
   if (operandB) {
      operandA = operate(operator, operandA, operandB);
      operandB = null;
   }

   // update operator
   operator = operatorKey.textContent;

   clearDisplay();
   updateDisplay(`${operandA} ${operator}`);
}

function calculateFinalResult() {
   if (displayValue === undefined || displayValue === null) {
      operandB = Number(displayValue);
   } else {
      operandB = Number(displayValue);
   
      operandA = operate(operator, operandA, operandB);

      operator = null;
      operandB = null;
   }

   clearDisplay();
   updateDisplay(operandA);
}

// 
// DEBUGGING
// 

