const multer = require('multer')
const path = require('path')

// RESUME UPLOAD 
const resumeFilter = (req, file, cb) => {
  const allowedExt = /pdf|doc|docx/
  const ext = allowedExt.test(path.extname(file.originalname).toLowerCase())

  const allowedMimeTypes = [
    'application/pdf',
    'application/x-pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]

  const mime = allowedMimeTypes.includes(file.mimetype)

  if (ext && mime) cb(null, true)
  else cb(new Error('Only PDF or DOC resumes are allowed'))
}

const resumeUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/applications')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  }),
  fileFilter: resumeFilter
})



//  LOGO UPLOAD 

const logoFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/
  const ext = allowed.test(path.extname(file.originalname).toLowerCase())
  const mime = allowed.test(file.mimetype)

  if (ext && mime) cb(null, true)
  else cb(new Error('Only image files allowed for logo'))
}

const logoUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads/logo')
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  }),
  fileFilter: logoFilter
})


module.exports = { resumeUpload, logoUpload }