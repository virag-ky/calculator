const currentNum = document.querySelector("#current");
const previousNum = document.querySelector("#previous");
const numberBtn = document.querySelectorAll(".numbers");
const operatorsBtn = document.querySelectorAll(".operators");
const equalBtn = document.querySelector("#equal");
const clearAllBtn = document.querySelector("#clear-all");
const deleteBtn = document.querySelector("#delete");

let number = "";
let num1 = "";
let operator = "";
let result;
let haveDot = false;

//Get number
numberBtn.forEach((button) =>
  button.addEventListener("click", (e) => {
    if (number.length >= 5) {
      e.target.removeEventListener("click");
      return;
    }
    number = e.target.innerText;
    currentNum.innerText += number;
    number = currentNum.innerText;
  })
);

//Get dot
const dotBtn = document.getElementById("dot");
let dot;
dotBtn.addEventListener("click", (e) => {
  dot = e.target.innerText;
  if (!number) {
    return;
  } else if (!haveDot) {
    haveDot = true;
    currentNum.innerText += dot;
  }
});

//Clear All
function clearAll() {
  clearAllBtn.addEventListener("click", () => {
    currentNum.innerText = "";
    previousNum.innerText = "";
    number = "";
    num1 = "";
    num2 = "";
    operator = "";
    haveDot = false;
  });
}
clearAll();

//Delete last number
function deleteLast() {
  deleteBtn.addEventListener("click", () => {
    let newNumber = currentNum.innerText.slice(0, -1);
    currentNum.innerText = newNumber;
    number = newNumber;
  });
}
deleteLast();

//Get operator
function getOperator() {
  operatorsBtn.forEach((button) =>
    button.addEventListener("click", (e) => {
      if (!number || number === "0") {
        currentNum.innerText = "";
        number = "";
        return;
      } else if (previousNum.innerText !== "" && currentNum.innerText !== "") {
        return;
      }
      if (e.target.innerText === "+") {
        operator = "+";
      } else if (e.target.innerText === "-") {
        operator = "-";
      } else if (e.target.innerText === "*") {
        operator = "*";
      } else if (e.target.innerText === "/") {
        operator = "/";
      }
      previousNum.innerText += " " + number;
      previousNum.innerText += " " + operator + " ";
      currentNum.innerText = "";
      num1 = number;
      number = "";
      haveDot = false;
    })
  );
}
getOperator();

//Equal
equalBtn.addEventListener("click", () => {
  if (!number || number === "0") {
    currentNum.innerText = "";
    number = "";
    return;
  } else if (previousNum.innerText === "" && currentNum.innerText !== "") {
    return;
  }

  if (operator === "+") {
    result = Number(num1) + Number(number);
  } else if (operator === "-") {
    result = Number(num1) - Number(number);
  } else if (operator === "*") {
    result = Number(num1) * Number(number);
  } else if (operator === "/") {
    result = Number(num1) / Number(number);
  }
  previousNum.innerText = "";
  currentNum.innerText = Math.round(result * 1000) / 1000;
  number = result;
});
