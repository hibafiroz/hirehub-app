const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { generateToken } = require('../utils/auth')
const { NotFoundError, Duplicates } = require('../utils/error')


// REGISTER
const registerPost = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body

    const userExist = await User.findOne({ email })
    if (userExist) return next(new Duplicates('User already exists!'))

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role
    })

    const token = generateToken(newUser)

    res.cookie("jobportaltoken", token, {
  httpOnly: true,
  secure: false,
  sameSite: "lax"
});

res.json({
  message: "User registered successfully",
  user: {
    id: newUser._id,
    name: newUser.name,
    role: newUser.role
  }
});
  } catch (err) {
    next(err)
  }
}

// LOGIN
const loginPost = async (req, res, next) => {
  try {
    const { email, password } = req.body

    const userExist = await User.findOne({ email })
    if (!userExist) return next(new NotFoundError('Please register first!'))

    const passwordMatch = await bcrypt.compare(password, userExist.password)
    if (!passwordMatch) return next(new NotFoundError('Password is incorrect'))

    const token = generateToken(userExist)

     res.cookie("jobportaltoken", token, {
      httpOnly: true,             // JS cannot access
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      user: {
        id: userExist._id,
        name: userExist.name,
        role: userExist.role
      }
    });
  } catch (err) {
    next(err)
  }
}

// LOGOUT
const logout = (req, res) => {
  res.clearCookie("jobportaltoken", {
    httpOnly: true,
    sameSite: "lax",
    secure: false
  });
  res.json({ message: "Logged out successfully" })
}

const getUserDetails = async(req, res) => {
  const user = await User.findById(req.user.id)
  res.json({ user })
}

module.exports = { registerPost, loginPost, logout, getUserDetails }