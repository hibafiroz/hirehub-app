const Application = require("../models/application")
const Job = require("../models/job")
const User = require("../models/user")
const { sendEmail } = require("../utils/email")


const profile = async (req, res) => {
  const user = await User.findById(req.user.id)
  res.json({ user })
}


const editProfile = async (req, res, next) => {
  try {
    const { name, phone, location, skills, experience } = req.body
    let data = {}
    if (name) data.name = name
    if (phone) data.phone = phone
    if (location) data.location = location
    if (experience !== "") {
      data.experience = experience;
    }
    if (skills) {
      data.skills = skills
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: data },
      { returnDocument: 'after' }
    )
    res.json({
      message: 'Profile updated successfully',
      user: updatedUser
    })
  } catch (err) {
    next(err)
  }
}


const application = async (req, res) => {
  const applications = await Application.find({ applicant: req.user.id })
    .populate({
      path: 'job',
      populate: {
        path: 'company',
        select: 'name'
      }
    })

  res.json({ applications })
}


const applyNow = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('company')
    res.json({ job })
  } catch (err) {
    next(err)
  }
}


const applyNowPost = async (req, res, next) => {
  try {
    const { phone, coverLetter } = req.body;

    const application = await Application.create({
      job: req.params.id,
      applicant: req.user.id,
      phone,
      resume: req.file ? req.file.path : null,
      status: "applied",
      coverLetter,
    });

    //  email content
    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2 style="color:#0f766e;">HireHub</h2>
        
        <p>Hi <strong>${req.user.name}</strong>,</p>
        
        <p>Your application has been <strong>successfully submitted</strong> 🎉</p>
        
        <p>We've received your application and it is now under review.</p>
        
        <p>We'll notify you once there's an update.</p>
        
        <br/>
        <p>Best regards,</p>
        <p><strong>HireHub Team</strong></p>
      </div>
    `;

    // Send Email
    sendEmail(
      'softora.dev01@gmail.com',
      "Application Submitted Successfully!",
      html
    );

    res.json({
      message: "Application submitted successfully",
      application,
    });
  } catch (err) {
    next(err);
  }
};


module.exports = { applyNow, applyNowPost, profile, editProfile, application }