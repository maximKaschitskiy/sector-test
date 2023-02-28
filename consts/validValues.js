const mimetypes = ["image/png", "image/jpeg", "image/jpg"];

const format = [".png", ".jpeg", ".jpg"];

const genders = ["male", "female"];

const reqValues = [
  "number",
  "id",
  "name",
  "surname",
  "email",
  "gender",
  "photo",
  "thumbnail",
  "createdAt",
  "updatedAt",
];

module.exports = { mimetypes, format, genders, reqValues };
