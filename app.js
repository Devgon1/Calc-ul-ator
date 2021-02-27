const screenResults = document.querySelector("#result");
const screenCalculations = document.querySelector("#calculations");
const clearButton = document.querySelector("#clear");
const deleteButton = document.querySelector("#delete");
const numberButton = document.querySelectorAll(".numberButton");
const operandButton = document.querySelectorAll(".operandButton");
const equalsButton = document.querySelector(".equalsButton");
const dotButton = document.querySelector(".dotButton");

let initOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

//putting evenListeners in all buttons to wrtie in screen
numberButton.forEach((button) => {
  button.addEventListener("click", () => writeText(button.textContent));
});

operandButton.forEach((button) => {
  button.addEventListener("click", () => setOperand(button.textContent));
});

//functions

const writeText = (number) => {
  if (screenResults.textContent === "0" || shouldResetScreen) {
    resetScreen();
  }
  //   if (newOperation) clearAll();
  screenResults.textContent += number;
};

const resetScreen = () => {
  screenResults.textContent = "";
  shouldResetScreen = false;
};

const clearAll = () => {
  screenResults.textContent = "0";
  screenCalculations.textContent = "";
  initOperand = "";
  secondOperand = "";
  currentOperation = null;
};

const deleteNumber = () => {
  if (
    screenResults.textContent === "" ||
    screenResults.textContent.length === 1
  ) {
    screenResults.textContent = "0";
  } else {
    screenResults.textContent = screenResults.textContent
      .toString()
      .slice(0, -1);
  }
};

const dotFunction = () => {
  if (shouldResetScreen) resetScreen();
  if (screenResults.textContent === "") screenResults.textContent = "0";
  if (screenResults.textContent.includes(".")) return;
  screenResults.textContent += ".";
};

const setOperand = (operand) => {
  if (currentOperation !== null) calculate();
  initOperand = screenResults.textContent;
  currentOperation = operand;
  shouldResetScreen = true;
  if (screenCalculations.textContent === "0") {
    screenCalculations.textContent = "";
  }
  screenCalculations.textContent += `${initOperand} ${operand} `;
};

const calculate = () => {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && screenResults.textContent === "0") {
    clearAll();
    return;
  }

  secondOperand = screenResults.textContent;
  screenResults.textContent = roundResult(
    operation(currentOperation, initOperand, secondOperand)
  );

  currentOperation = null;
};

const roundResult = (result) => {
  return Math.round(result * 1000) / 1000;
};

//calculations

function sum(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

const operation = (operation, a, b) => {
  a = Number(a);
  b = Number(b);
  console.log(a, b);
  switch (operation) {
    case "+":
      return sum(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
};

//declarations

clearButton.addEventListener("click", clearAll);
deleteButton.addEventListener("click", deleteNumber);
dotButton.addEventListener("click", dotFunction);
equalsButton.addEventListener("click", calculate);
