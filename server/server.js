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

//Cors
app.use(cors({
 origin: [
    'https://hirehub-app-psi.vercel.app',
    'https://hirehub-r8weunzg3-hibafirozs-projects.vercel.app'
  ],
  credentials: true
}))

//Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes
app.use('/', require('./routes/publicRoutes'))
app.use('/authentication', require('./routes/authRoutes'))
app.use('/jobseeker', require('./routes/jobseekerRoutes'))
app.use('/recruiter', require('./routes/recruiterRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/send', require('./routes/testRoute'))

//Central Error handling middleware
app.use(errorHandlingMiddleware)

module.exports = app