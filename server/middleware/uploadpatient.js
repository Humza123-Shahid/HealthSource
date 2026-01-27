const multer = require("multer");
const path = require("path");
// const upload = multer({ 
//   storage: multer.memoryStorage({
//   destination: (req, file, cb) => {
//     cb(null, "../uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   }
  
// }), // or disk storage
//   limits: { fileSize: 20 * 1024 * 1024 } // 20 MB limit (in bytes)
// });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "server/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
  
});

const uploadpatient = multer({ storage });

module.exports = uploadpatient;