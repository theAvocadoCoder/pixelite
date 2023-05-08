function _arrayOfRandomValues(valuesArray, desiredLength, callback) {
  let randomValue = () => Math.floor(Math.random() * valuesArray.length);
  const resultArray = [];
  for (let i = 0; i < desiredLength; i++) {
    resultArray.push(valuesArray[randomValue()]);
  }
  return callback(resultArray);
}

function randomColor() {
  const callback = (resultArray) => {
    return `#${resultArray.join("")}`;
  }
  const hexValuesArray = [
    "0",
    "1",
    "2",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
  ];
  return _arrayOfRandomValues(hexValuesArray, 6, callback);
}

function randomNumber(desiredLength) {
  const callback = (resultArray) => {
    return `${resultArray.join("")}`
  }
  const numberValuesArray = [
    "0",
    "1",
    "2",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];
  return _arrayOfRandomValues(numberValuesArray, desiredLength, callback);
}

export {
  randomColor,
  randomNumber
}