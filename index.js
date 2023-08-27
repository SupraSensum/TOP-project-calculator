const theCalculator = document.getElementById('theCalculator');
const contentContainer = document.getElementById('content');
const calc = {
   '+': (a, b) => a + b,
   '-': (a, b) => a - b,
   '*': (a, b) => a * b,
   '/': (a, b) => a / b,
}

let operandA,
   operandB,
   operator;

setCalcHeightToPropOfWidth();
window.addEventListener('resize', setCalcHeightToPropOfWidth);

function operate(op, a, b) {
   return calc[op](a, b);
}

// set calculator height to be a proportion of its width
function setCalcHeightToPropOfWidth() {
   const calcWidth = theCalculator.clientWidth;
   const contentHeight = contentContainer.clientHeight;
   const MAX_HEIGHT = contentHeight * 0.75;
   const MIN_HEIGHT = 350;

   let newHeight = calcWidth * 1.5

   if (newHeight > MAX_HEIGHT){
      newHeight = MAX_HEIGHT;
   } else if (newHeight < MIN_HEIGHT) {
      newHeight = MIN_HEIGHT;
   }

   theCalculator.style.height = `${newHeight}px`;
}

// debugging
for (let key in calc) {
   console.log(operate(key, 10, 10));
}