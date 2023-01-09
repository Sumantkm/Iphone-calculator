// DOM elements - time
const hour = document.querySelector(".hour");
const minute = document.querySelector(".minute");
//console.log(hour, minute);

//Set up time
// to get the time in beginning

const updateTime = () => {
  const currentTime = new Date();

  let currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  // converted to 12hour format
  if (currentHour > 12) {
    currentHour = currentHour - 12;
  }

  hour.innerHTML = currentHour.toString();
  minute.innerHTML = currentMinute.toString().padStart(2, "0");
};
updateTime();

setInterval(updateTime, 1000);

//DOM elements numbers, display and operators

const resultEl = document.querySelector(".result");
const acEl = document.querySelector(".clear");
const pmEl = document.querySelector(".plusminus");

const modulasEl = document.querySelector(".modulas");
const divisonEl = document.querySelector(".division");
const multiplyEl = document.querySelector(".multiply");
const minusEl = document.querySelector(".minus");
const additionEl = document.querySelector(".addition");
const decimalEl = document.querySelector(".decimal");
const equalsEl = document.querySelector(".equals");

const sevenEl = document.querySelector(".seven");
const eightEl = document.querySelector(".eight");
const nineEl = document.querySelector(".nine");
const fourEl = document.querySelector(".four");
const fiveEl = document.querySelector(".five");
const sixEL = document.querySelector(".six");
const oneEl = document.querySelector(".one");
const twoEl = document.querySelector(".two");
const threeEl = document.querySelector(".three");
const zeroEl = document.querySelector(".zero");

const numberArray = [
  oneEl,
  twoEl,
  threeEl,
  fourEl,
  fiveEl,
  sixEL,
  sevenEl,
  eightEl,
  nineEl,
  zeroEl,
];

//Variables
let valueStrMemory = null;
let operatorMemory = null;

//Function with string

const handleNumberClick = (numStr) => {
  const currentResultStr = getValueStr();
  if (currentResultStr === "0") {
    setStrValue(numStr);
  } else {
    setStrValue(currentResultStr + numStr);
  }
};

//getter

const getValueStr = () => {
  return resultEl.innerHTML.split(",").join("");
};

const getValueNum = () => {
  return parseFloat(getValueStr());
};

const setStrValue = (valueStr) => {
  if (valueStr[valueStr.length - 1] === ".") {
    resultEl.innerHTML += ".";
    return;
  }

  const [wholeNumStr, decimalStr] = valueStr.split(".");
  if (decimalStr) {
    resultEl.innerHTML =
      parseFloat(wholeNumStr).toLocaleString() + "." + decimalStr;
  } else {
    resultEl.innerHTML = parseFloat(valueStr).toLocaleString();
  }
};

const getResultOfOperationStr = () => {
  const currentValueNum = getValueNum();
  const valueNumInMemory = parseFloat(valueStrMemory);
  if (operatorMemory === "addition") {
    newValueNum = valueNumInMemory + currentValueNum;
  } else if (operatorMemory === "subtraction") {
    newValueNum = valueNumInMemory - currentValueNum;
  } else if (operatorMemory === "multiplication") {
    newValueNum = valueNumInMemory * currentValueNum;
  } else if (operatorMemory === "division") {
    newValueNum = valueNumInMemory / currentValueNum;
  }
  return newValueNum.toString();
};

const operatorFun = (operator) => {
  const currentValueStr = getValueStr();
  if (!valueStrMemory) {
    valueStrMemory = currentValueStr;
    operatorMemory = operator;
    setStrValue("0");
    return;
  }

  valueStrMemory = getResultOfOperationStr();
  operatorMemory = operator;
  setStrValue("0");
};

// Add eventlistner to numbers and decimal

numberArray.forEach((numberArr) => {
  numberArr.addEventListener("click", () => {
    handleNumberClick(numberArr.innerHTML.toString());
  });
});

decimalEl.addEventListener("click", () => {
  const currentResultStr = getValueStr();
  if (!currentResultStr.includes(".")) {
    setStrValue(currentResultStr + ".");
  }
});

// Add eventlistners to functions

acEl.addEventListener("click", () => {
  setStrValue("0");
  valueStrMemory = null;
  operatorMemory = null;
});

pmEl.addEventListener("click", () => {
  const currentValueNum = getValueNum();
  const currentValueStr = getValueStr();

  if (currentValueStr === "-0") {
    setStrValue("0");
    return;
  }

  if (currentValueNum >= 0) {
    setStrValue("-" + currentValueStr);
  } else {
    setStrValue(currentValueStr.substring(1));
  }

  valueStrMemory = null;
  operatorMemory = null;
});

modulasEl.addEventListener("click", () => {
  const currentValueNum = getValueNum();
  const newValueNum = currentValueNum / 100;
  setStrValue(newValueNum.toString());
});

// add eventlistner to operators

additionEl.addEventListener("click", () => {
  operatorFun("addition");
});
minusEl.addEventListener("click", () => {
  operatorFun("subtraction");
});
multiplyEl.addEventListener("click", () => {
  operatorFun("multiplication");
});
divisonEl.addEventListener("click", () => {
  operatorFun("division");
});
equalsEl.addEventListener("click", () => {
  if (valueStrMemory) {
    setStrValue(getResultOfOperationStr());
    valueStrMemory = null;
    operatorMemory = null;
  }
});
