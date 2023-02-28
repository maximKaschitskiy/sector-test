const filledValues = (object) => {
  const filled = {};
  for (const [key, value] of Object.entries(object)) {
    if (value !== undefined) {
      filled[key] = value;
    }
  }
  return filled;
};

const requiredValues = (objects, array) => {
  const filteredArr = [];
  objects.forEach(item => {
    const filteredObj = {};
    for (const [key, value] of Object.entries(item)) {
      if (array.includes(key)) {
        filteredObj[key] = value;
      }
    }
    filteredArr.push(filteredObj);
  });
  return filteredArr;
};

module.exports = {
  filledValues,
  requiredValues,
};
