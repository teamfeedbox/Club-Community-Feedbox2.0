const multer = require('multer');

module.exports = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5000000 }
});

// const upload= multer({
//   storage: multer.diskStorage({}),
//   limits: { fileSize: 5000000 },
//   fileFilter:fileFilter
// });