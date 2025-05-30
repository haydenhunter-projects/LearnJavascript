let runningTotal = 0;
let buffer = "0";
let previousOperator = null;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (isNaN(Number(value)) && value !== ".") {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleNumber(value) {
  if (buffer === "0" && value !== ".") {
    buffer = value;
  } else if (value === "." && buffer.includes(".")) {
    // Do nothing, already has a decimal
  } else {
    buffer += value;
  }
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "AC":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseFloat(buffer));
      previousOperator = null;
      buffer = "" + runningTotal;
      runningTotal = 0;
      break;
    case "+/-":
      buffer = "" + parseFloat(buffer) * -1;
      break;
    case "%":
      buffer = "" + parseFloat(buffer) / 100;
      break;
    case ".":
      if (!buffer.includes(".")) {
        buffer += ".";
      }
      break;
    case "+":
    case "-":
    case "*":
    case "÷":
      handleMath(symbol);
      break;
    default:
      // Ignore unknown symbols
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0" && symbol !== "AC") {
    return;
  }
  const floatBuffer = parseFloat(buffer);
  if (runningTotal === 0) {
    runningTotal = floatBuffer;
  } else {
    flushOperation(floatBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(floatBuffer) {
  if (previousOperator === "+") {
    runningTotal += floatBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= floatBuffer;
  } else if (previousOperator === "*") {
    runningTotal *= floatBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= floatBuffer;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
