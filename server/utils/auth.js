const jwt = require('jsonwebtoken')
const { UnAuthorized, ForbiddenError } = require('./error')
const dotenv = require('dotenv').config()
const secretKey=process.env.JWT_SECRET_KEY

const generateToken = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
    }
    const options={expiresIn:'7d'}
    return jwt.sign(payload, secretKey, options)
}

const tokenVerify = (req, res, next) => {
  try {
    const token = req.cookies?.jobportaltoken
    if (!token) {
      return res.status(401).json({message:'Not authorized'})
    }
    const decoded = jwt.verify(token, secretKey)
    req.user = decoded
    next()

  } catch (err) {
    next(err)
  }
}


const optionalTokenVerify = (req, res, next) => {
  try {
    const token = req.cookies?.jobportaltoken;
    if (!token) {
      return next()  // allow guest
    }

    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next()
  } catch (err) {
    next()          // even if token invalid, don't block
  }
};

const jobseekerProtected = (req, res, next) => {
  const user = req.user
  if (!user) return next(new ForbiddenError('Please login first!'))
  if (user.role !== 'jobseeker') return next(new UnAuthorized('Only jobseekers allowed'))
  next()
}

const recruiterProtected = (req, res, next) => {
  const user = req.user
  if (!user) return next(new ForbiddenError('Please login first!'))
  if (user.role !== 'recruiter') return next(new UnAuthorized('Only recruiters allowed'))
  next()
}

const adminProtected = (req, res, next) => {
  const user = req.user
  if (!user) return next(new ForbiddenError('Please login first!'))
  if (user.role !== 'admin') return next(new UnAuthorized('Only admin allowed'))
  next()
}


module.exports = {generateToken,optionalTokenVerify, tokenVerify, jobseekerProtected, adminProtected, recruiterProtected}