// 
// Globals
// 

// Get elements
const theCalculator = document.getElementById('theCalculator');
const contentContainer = document.getElementById('content');
const displayResultField = document.getElementById('calc-result');
const calcNumberKeys = document.querySelectorAll('.calc-number-key');
const calcOperatorKeys = document.querySelectorAll('.calc-operator-key');
const calcEqualsKey = document.getElementById('calc-equals');
const calcClearKey = document.getElementById('calc-clear');
const calcDecimalKey = document.getElementById('calc-decimal');
const calcDeleteKey = document.getElementById('calc-delete');

// Declare constants
const MAX_CHAR_DISPLAY_LENGTH = 11;
const calc = {
   '+': (a, b) => a + b,
   '−': (a, b) => a - b,
   '×': (a, b) => a * b,
   '÷': (a, b) => a / b,
};
const keyboardKeys = {
   
};

// Declare variables
let operandA = null,
   operandB = null,
   operator = null,
   displayValue  = displayResultField.textContent;

// First runs
setCalcHeightToPropOfWidth();

// Add event listeners
window.addEventListener('resize', setCalcHeightToPropOfWidth);
calcNumberKeys.forEach((numberKey) => {
   numberKey.addEventListener('click', () => appendToDisplay(numberKey.textContent));
});
calcOperatorKeys.forEach((operatorKey) => {
   operatorKey.addEventListener('click', () => updateAndEvalExpression(operatorKey.textContent));
});
calcEqualsKey.addEventListener('click', evaluateExpression);
calcClearKey.addEventListener('click', reset);
calcDecimalKey.addEventListener('click', addDecimal);
calcDeleteKey.addEventListener('click', deleteLast);
document.addEventListener('keydown', (event) => handleKeyboardInput(event));

// 
// Functions
// 

function operate(op, a, b) {
   a = Number(a);
   b = Number(b);

   if (isDividingByZero(op, b)) {
      alert('To hell with your 0!');
      return a;
   }

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

function appendToDisplay(theThingToAppend) {
   if (displayValue === '0') { // replace display
      displayValue = theThingToAppend;
      updateDisplay(displayValue);
   } else if (displayValue !== '0') { // append display
      displayValue += theThingToAppend;
      updateDisplay(displayValue);
   } else {
      console.error("YOU SHOULDN'T BE HERE");
   }
}

function updateDisplay(newDisplayContent) {
   if (isNaN(parseFloat(newDisplayContent))) {
      displayResultField.textContent = newDisplayContent;
   } else {
      displayResultField.textContent = toRoundOrNotToRound(newDisplayContent);
   }
}

function clearDisplay() {
   displayValue = '';
   updateDisplay(displayValue);
}

function setOperatorAndDisplay(newOperator) {
   clearDisplay();
   operator = newOperator;
   updateDisplay(`${operandA} ${operator}`);
}

// I have no clue how to make the code below easy to understand for my future
// self, let alone other poor souls
function updateAndEvalExpression(theSelectedOperator) {
   if (operandA === null) { // should only be true for initial calculator state
      operandA = Number(displayValue);
      setOperatorAndDisplay(theSelectedOperator);
   } else if (displayValue === '' && operandA !== null && operandB === null) { // typically only true if operator is changed mid-expression
      setOperatorAndDisplay(theSelectedOperator);
   } else if (operandA !== null && operator !== null && operandB === null) { // true if chaining more than one operator in the expression
      operandB = Number(displayValue);
      operandA = operate(operator, operandA, operandB);
      setOperatorAndDisplay(theSelectedOperator);
      operandB = null;
   } else if (operandA !== null && operandB === null && operator === null) {
      operandA = Number(displayValue);
      setOperatorAndDisplay(theSelectedOperator);
   } else {
      console.error("YOU SHOULDN'T BE HERE");
   }
}

function evaluateExpression() {
   if (operandA !== null && operator !== null && displayValue !== '') {
      operandB = displayValue;
      operandA = operate(operator, operandA, operandB);
      operandB = null;
      operator = null;
      clearDisplay();
      updateDisplay(operandA);
   }
}

function reset() {
   operandA = null;
   operandB = null;
   operator = null;
   displayValue = '0';
   updateDisplay(displayValue);
}

function isDividingByZero(op, b) {
   return op === '÷' && b === 0
}

function toRoundOrNotToRound(theNumInQuestion) {
   theNumInQuestion = theNumInQuestion.toString();

   const theNumInQuestionLength = theNumInQuestion.length;

   let lengthDifference = null;
   let decimalDigitCount = null;

   if (theNumInQuestionLength <= MAX_CHAR_DISPLAY_LENGTH) {
      console.log('a');
      return theNumInQuestion;
   }

   if (theNumInQuestion.includes('.')) {
      console.log('b');
      lengthDifference = theNumInQuestionLength - MAX_CHAR_DISPLAY_LENGTH;
      decimalDigitCount = theNumInQuestion.substring(theNumInQuestion.indexOf('.') + 1).length;
      if (lengthDifference <= decimalDigitCount) {
         console.log('c');
         return parseFloat(theNumInQuestion).toFixed(decimalDigitCount - lengthDifference)
      }
   }

   console.log('d');
   return parseFloat(theNumInQuestion).toExponential(MAX_CHAR_DISPLAY_LENGTH - 7);

   // I'm leaving my brainstorming below as a reminder of what went into this
   // if: <= max
   //    passthrough
   // else:
   //    if: has decimal
   //       let x = how much larger is it than max length (length - max)
   //       let y = how many digits are after the decimal
   //       if: x <= y
   //          return: round to y - x number of digits
   // return: parseFloat().toExponential(max - 5)
}

function addDecimal() {
   if (!displayValue.includes('.')) {
      if (Number(displayValue) === 0){
         appendToDisplay('0.');
      } else {
         appendToDisplay('.');
      }
   }
}

function deleteLast() {
   if (Number(displayValue) !== 0 || displayValue.includes('.')) {
      displayValue = displayValue.slice(0, -1);
   
      if (displayValue === '') {
         displayValue = '0';
      }
   
      updateDisplay(displayValue);
   }
}

function handleKeyboardInput(event) {
   switch (event.key) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
         appendToDisplay(event.key);
         break;
      case '.':
         addDecimal();
         break;
      case '=':
      case 'Enter':
         evaluateExpression();
         break;
      case '+':
         updateAndEvalExpression('+');
         break;
      case '-':
      case '−':
         updateAndEvalExpression('−');
         break;
      case '*':
      case 'x':
      case 'X':
      case '×':
         updateAndEvalExpression('×');
         break;
      case '/':
      case '\\':
      case '÷':
         updateAndEvalExpression('÷');
         break;
      case 'Backspace':
      case 'Delete':
         deleteLast();
         break;
      case 'Escape':
         reset();
         break;
      default:
         console.error(`Key: ${event.key}`);
         break;
   }
}