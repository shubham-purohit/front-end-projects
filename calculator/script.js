result = "0";
isOperatorAdded = false;

function updateScreen() {
  document.getElementById("screen").value = result;
}

function buttonClick(val) {
  if (result == "0") result = "" + val;
  else result += val;
  isOperatorAdded = false;
  updateScreen();
}

function clearScreen() {
  result = "0";
  isOperatorAdded = false;
  updateScreen();
}

function calculate() {
  console.info("result: " + result);
  isOperatorAdded = false;
  result = eval(result);
  updateScreen();
}

function addOperator(operator) {
  if (!isOperatorAdded) 
    result += operator;
  else 
    result = result.substring(0, result.length - 1) + operator;
  isOperatorAdded = true;
  updateScreen();
}
