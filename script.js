//add that when an operator is clicked for the second time it acts as the equal sign
let previousOperationValues = [""];
let isPreviousResultDisplayed = false;

const numberKeys = Array.from(document.querySelectorAll(".num"));
const operatorKeys = Array.from(document.querySelectorAll(".operator"));
const clearKey = document.getElementById("clear");
const equalKey = document.getElementById("equal");
const backspaceKey = document.getElementById("backspace");
const dotKey = document.getElementById("dot");

numberKeys.forEach((key) => key.addEventListener("click", updateSavedNumber));
numberKeys.forEach((key) =>
  key.addEventListener("click", updateDisplayedResult)
);

operatorKeys.forEach((key) => key.addEventListener("click", saveOperation));

clearKey.addEventListener("click", clearDisplay);
equalKey.addEventListener("click", displayResult);
backspaceKey.addEventListener("click", removeLastDigit);
dotKey.addEventListener("click", addDot);

function add(a, b) {
  if (a.length === 0 || b.length === 0) {
    return;
  }
  return parseFloat(a) + parseFloat(b);
}
function subtract(a, b) {
  if (a.length === 0 || b.length === 0) {
    return;
  }
  return a - b;
}
function multiply(a, b) {
  if (a.length === 0 || b.length === 0) {
    return;
  }
  return a * b;
}
function divide(a, b) {
  if (a.length === 0 || b.length === 0) {
    return;
  } else if (b == 0) {
    return "Division by 0!";
  }
  return a / b;
}

function operate(f, a, b) {
  try {
    return window[f](a, b);
  } catch (e) {
    return "error";
  }
}

function clearDisplay() {
  updateDisplay("");
  previousOperationValues = [""];
  isPreviousResultDisplayed = false;
}

function updateDisplay(displayValue) {
  let result = document.querySelector(".result");
  result.textContent = displayValue;
}

function updateDisplayedResult() {
  //to avoid overflowing the window
  if (previousOperationValues[0].length == 32) {
    return;
  } else {
    updateDisplay(previousOperationValues[0]);
  }
}

function saveOperation(e) {
  //previousOperationValues contains first the displayed number, second the operation and third the carried result
  if (previousOperationValues[2] == undefined) {
    previousOperationValues[2] = previousOperationValues[0];
  } else {
    if (previousOperationValues[1] != undefined) {
      previousOperationValues[2] = operate(
        previousOperationValues[1],
        previousOperationValues[2],
        previousOperationValues[0]
      );
      isPreviousResultDisplayed = true;
    }
  }
  let operator = e.target.dataset.operator;
  previousOperationValues[1] = operator;
  if (isPreviousResultDisplayed) {
    previousOperationValues[0] = previousOperationValues[2];
  } else {
    previousOperationValues[0] = "";
  }
  updateDisplayedResult();
}

function calculateResult() {
  let value = operate(
    previousOperationValues[1],
    previousOperationValues[2],
    previousOperationValues[0]
  );
  previousOperationValues = [""];
  return value;
}
function displayResult() {
  let result = calculateResult();
  updateDisplay(result);
  if (result == "error") {
    clearDisplay();
    alert("there was an error, please try again");
  } else {
    previousOperationValues[2] = result;
  }
  isPreviousResultDisplayed = true;
}
function updateSavedNumber(e) {
  if (isPreviousResultDisplayed) {
    isPreviousResultDisplayed = false;
    previousOperationValues[0] = e.target.innerText;
  } else {
    previousOperationValues[0] =
      previousOperationValues[0] + e.target.innerText;
  }
}

function removeLastDigit() {
  try {
    previousOperationValues[0] = previousOperationValues[0]
      .toString()
      .slice(0, -1);
  } catch (e) {}
  updateDisplayedResult();
}

function shouldDotBeAdded() {
  return !previousOperationValues[0].includes(".");
}
function addDot() {
  if (shouldDotBeAdded()) {
    previousOperationValues[0] += ".";
    updateDisplayedResult();
  }
}
//todo
//-add . functionality
//-enable keyboard input
