const multer = require('multer');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/Storage/imgs')
  },
  filename: function (req, file, cb) {
     cb(null, file.fieldname + '-' + Date.now())
  }
})
 
const upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 }, storage})

module.exports = upload