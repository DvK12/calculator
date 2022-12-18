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

function updateResult(e) {
  const result = document.querySelector(".result");
  result.textContent += e.target.innerText;
}

function clearDisplay() {
  const result = document.querySelector(".result");
  result.textContent = "";
}

const numberKeys = Array.from(document.querySelectorAll(".num"));
const clearKey = document.getElementById("clear");
clearKey.addEventListener("click", clearDisplay);

numberKeys.forEach((key) => key.addEventListener("click", updateResult));
