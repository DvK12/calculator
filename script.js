function add(a, b) {
  return parseInt(a) + parseInt(b);
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b !== null) {
    return a / b;
  }
  return "Cannot divide by zero";
}

function operate(f, a, b) {
  return f(a, b);
}
