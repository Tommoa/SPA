define(function (require, exports, module) {
  exports.splitString = function (name, stringList) {
    return splitString(name, stringList);
  };
});

function splitString(name, stringList, delimiter) {
  const splitStrings = stringList.split("; ");

  const stringValue = splitStrings.reduce((acc, string) => {
    [key, value] = string.split("=");

    if (key === name) {
      acc = value;
      return acc;
    }
    return acc;
  }, "");

  if (stringValue.length === 0) {
    return undefined;
  }

  return stringValue;
}
