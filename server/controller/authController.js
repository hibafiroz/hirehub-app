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
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
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


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(new NotFoundError("Please register first!"));
    }

    // ALWAYS check password (even for admin)
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return next(new NotFoundError("Password is incorrect"));
    }

    // Identify which login page
    let allowedRoles = [];

    if (req.path.includes("recruiter-Login")) {
      allowedRoles = ["recruiter"];
      roleMessage = "recruiter";
    } else {
      allowedRoles = ["jobseeker", "admin"];
      roleMessage = "jobseeker";
    }

    if (!allowedRoles.includes(user.role)) {
      return next(new NotFoundError(`Please login as ${roleMessage}`))
    }

    const token = generateToken(user);

    res.cookie("jobportaltoken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        role: user.role
      }
    });

  } catch (err) {
    next(err);
  }
};


// LOGOUT
const logout = (req, res) => {
  res.clearCookie("jobportaltoken", {
    httpOnly: true,
    sameSite: "none",
    secure: true
  });
  res.json({ message: "Logged out successfully" })
}

const getUserDetails = async (req, res) => {
  const user = await User.findById(req.user.id)
  res.json({ user })
}

module.exports = { registerPost, login, logout, getUserDetails }