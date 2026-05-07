const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
connectDB()
const app = express()
const cors=require('cors')
const cookieParser=require('cookie-parser')
const job = require('./models/job')
const { errorHandlingMiddleware } = require('./Middleware/errorMiddleware')
const PORT = process.env.PORT
const path = require('path');

//Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

// cache
app.use((req, res, next) => {
  res.setHeader(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, private'
  )
  res.setHeader('Pragma', 'no-cache')
  res.setHeader('Expires', '0')
  next()
})

//Routes
app.use('/', require('./routes/publicRoutes'))
app.use('/authentication', require('./routes/authRoutes'))
app.use('/jobseeker', require('./routes/jobseekerRoutes'))
app.use('/recruiter', require('./routes/recruiterRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/send', require('./routes/testRoute'))

app.use(errorHandlingMiddleware)

app.listen(`${PORT}`, () => console.log(`app is listening on port: ${PORT}`))