const { genders } = require('../consts/validValues');

function validateGender(value) {
  if (value) {
    return genders.includes(value);
  } else {
    return false;
  }
}

module.exports = { validateGender };