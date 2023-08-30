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

let temp = 0;
function operate(op, a, b) {
   // console.log(++temp, a, op, b);
   return checkIfDividingByZero() ? a : calc[op](a, b);
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

function checkIfDividingByZero() {
   if (operator === '÷' && (Number(operandB) === 0 || Number(displayValue) === 0)) {
      alert("Dividing by 0? Ain't happenin', chief");
      return true;
   }

   return false;
}

function updateExpression(operatorKey) {
   // update operands
   if (operandA === undefined || operandA === null) {
      operandA = Number(displayValue);
   } else {
      operandB = Number(displayValue);
   }

   // check if calcution is needed
   if (operandB !== undefined && operandB !== null) {
      console.log(operandA, operator, operandB);
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
      clearDisplay();
      updateDisplay(operandA);
   } else if (operator !== undefined && operator !== null) {
      operandB = Number(displayValue);
      operandA = operate(operator, operandA, operandB);
      operator = null;
      operandB = null;
      clearDisplay();
      updateDisplay(operandA);
   } else if (operandA !== undefined && operandA !== null) {
      clearDisplay();
      updateDisplay(operandA);
   }
}

function clearEverything() {
   operandA = null;
   operandB = null;
   operator = null;
   clearDisplay();
   updateDisplay(0);
}

// 
// DEBUGGING
// 

