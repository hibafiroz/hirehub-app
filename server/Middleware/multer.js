const multer = require('multer')
const path = require('path')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('../config/cloudinary')


// RESUME FILTER
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


// LOGO FILTER
const logoFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp/
  const ext = allowed.test(path.extname(file.originalname).toLowerCase())
  const mime = allowed.test(file.mimetype)

  if (ext && mime) cb(null, true)
  else cb(new Error('Only image files allowed for logo'))
}



// RESUME STORAGE
const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hirehub/resumes',
    resource_type: 'raw'
  }
})


// LOGO STORAGE
const logoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'hirehub/logos',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp']
  }
})



// MULTER
const resumeUpload = multer({
  storage: resumeStorage,
  fileFilter: resumeFilter
})

const logoUpload = multer({
  storage: logoStorage,
  fileFilter: logoFilter
})


module.exports = { resumeUpload, logoUpload }