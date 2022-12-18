function add(a, b) {
  if (a.length === 0 || b.length === 0) {
    return;
  }
  return parseInt(a) + parseInt(b);
}
function subtract(a, b) {
  if (a.length === 0 || b.length === 0) {
    return;
  }
  return parseInt(a) - parseInt(b);
}
function multiply(a, b) {
  if (a.length === 0 || b.length === 0) {
    return;
  }
  return parseInt(a) * parseInt(b);
}
function divide(a, b) {
  if (a.length === 0 || b.length === 0) {
    return;
  } else if (b == 0) {
    return "Div by 0";
  }
  return parseInt(a) / parseInt(b);
}

function operate(f, a, b) {
  return window[f](a, b);
}
function getDisplayValue() {
  let result = document.querySelector(".result");
  return result.textContent;
}
function updateDisplay(displayValue) {
  let result = document.querySelector(".result");
  result.textContent = displayValue;
}
function updateDisplayedResult(e) {
  //to avoid overflowing the window
  if (getDisplayValue().length == 32) {
    return;
  }
  let displayValue = getDisplayValue() + e.target.innerText;
  updateDisplay(displayValue);
  if (e.target.classList[0] == "operator") {
    clearDisplay();
  }
}

function clearDisplay() {
  updateDisplay("");
}

function saveOperation(e) {
  let previousNumber = getDisplayValue();
  let operator = e.target.dataset.operator;
  previousOperationValues[0] = previousNumber;
  previousOperationValues[1] = operator;
}

function calculateResult() {
  let value = operate(
    previousOperationValues[1],
    previousOperationValues[0],
    getDisplayValue()
  );
  previousOperationValues = [];
  return value;
}
function displayResult() {
  updateDisplay(calculateResult());
}
let previousOperationValues = [];

const numberKeys = Array.from(document.querySelectorAll(".num"));
const operatorKeys = Array.from(document.querySelectorAll(".operator"));
const clearKey = document.getElementById("clear");
const equalKey = document.getElementById("equal");

numberKeys.forEach((key) =>
  key.addEventListener("click", updateDisplayedResult)
);
operatorKeys.forEach((key) => key.addEventListener("click", saveOperation));
operatorKeys.forEach((key) =>
  key.addEventListener("click", updateDisplayedResult)
);

clearKey.addEventListener("click", clearDisplay);
equalKey.addEventListener("click", displayResult);
