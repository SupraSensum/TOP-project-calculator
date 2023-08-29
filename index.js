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
let operandA,
   operandB,
   operator,
   displayValue = '';

// First runs
setCalcHeightToPropOfWidth();

// Add event listeners
window.addEventListener('resize', setCalcHeightToPropOfWidth);
calcNumberKeys.forEach((numberKey) => {
   numberKey.addEventListener('click', () => appendDisplayValue(numberKey.textContent));
});
calcOperatorKeys.forEach((operatorKey) => {
   operatorKey.addEventListener('click', () => updateOperatorAndOperands(operatorKey));
});
calcEqualsKey.addEventListener('click', () => {
   
});

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

function appendDisplayValue(value) {
   displayValue += String(value);
   updateDisplay();
}

function updateDisplay(someString = displayValue) {
   someString.toString();
   displayResultField.textContent = someString;
}

function updateOperatorAndOperands(operatorKey) {
   // update operands
   if (!operandA) {
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

// 
// DEBUGGING
// 

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