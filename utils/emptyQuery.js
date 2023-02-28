const emptyQuery = (array) => {
  return array.every((item) => {
    return item === undefined;
  });
};

module.exports = {
  emptyQuery
};
