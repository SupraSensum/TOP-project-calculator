let operandA,
   operandB,
   operator;

const calc = {
   '+': (a, b) => a + b,
   '-': (a, b) => a - b,
   '*': (a, b) => a * b,
   '/': (a, b) => a / b,
}

function operate(op, a, b) {
   return calc[op](a, b);
}

// debugging
for (let key in calc) {
   console.log(operate(key, 10, 10));
}