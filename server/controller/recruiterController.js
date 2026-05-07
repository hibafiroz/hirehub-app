const mongoose = require("mongoose")
const Application = require("../models/application")
const Company = require("../models/company")
const Job = require("../models/job")
const User = require("../models/user")
const { sendEmail } = require("../utils/email")


const home = async(req, res) => {
  const id = req.user.id
  const jobs = await Job.find({ recruiter: id })
  const jobIDs = jobs.map(job => job._id)
  const applications = await Application.find({ job: { $in: jobIDs } })
  const shortlisted = applications.filter(item => item.status === 'shortlisted')
  const pendingApplications = applications.filter(item => item.status === 'applied')
  res.json({ jobs, applications, shortlisted, pendingApplications })
}


const dashboard = async (req, res) => {
    const recruiterId = req.user.id
   const jobs = await Job.find({ recruiter: recruiterId })
   const jobIds = jobs.map(job => job._id)
    // Applications for those jobs
    const applications = await Application.find({ job: { $in: jobIds } }).populate('job').populate('applicant')

     // JOBS PER DAY (LAST 7 DAYS)
        const jobsPerWeek = await Job.aggregate([
  {
    $match: {
      recruiter: new mongoose.Types.ObjectId(recruiterId)
    }
  },
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        week: { $week: "$createdAt" }
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: {
      "_id.year": 1,
      "_id.week": 1
    }
  }
])
        // 📊 APPLICATIONS PER DAY
        
     const applicationsPerWeek = await Application.aggregate([
  {
    $match: {
      job: { $in: jobIds }
    }
  },
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        week: { $week: "$createdAt" }
      },
      count: { $sum: 1 }
    }
  },
  {
    $sort: {
      "_id.year": 1,
      "_id.week": 1
    }
  }
])

    const stats = {
        totalJobs: jobs.length,
        totalApplications: applications.length,
        pending: applications.filter(a => a.status === 'applied').length,
        shortlisted: applications.filter(a => a.status === 'shortlisted').length
  }
    res.json({
    stats,
    recentApplications: applications.slice(0, 3),
    jobsPerWeek,
    applicationsPerWeek
    })
}


const postJobPost = async (req, res, next) => {
  try {
    const { title, jobLocation, jobMode, type,  experience, salaryRange, skills, describeRole, requirements, responsibilities, goodToHave } = req.body;

    const company = await Company.findOne({ recruiter: req.user.id });

    const job = await Job.create({
      title,
      jobLocation,
      jobMode,
      type,
      experience,
      salaryRange,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      describeRole,
      requirements: requirements.split(',').map(r => r.trim()).filter(Boolean),
      responsibilities: responsibilities.split(',').map(r => r.trim()).filter(Boolean),
      goodToHave: goodToHave
        ? goodToHave.split(',').map(g => g.trim()).filter(Boolean)
        : [],
      recruiter: req.user.id,
      company: company._id,
    });


    const html = `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2 style="color:#0f766e;">HireHub</h2>

        <p>Hi <strong>${req.user.name}</strong>,</p>

        <p>Your job has been <strong>successfully posted</strong> 🚀</p>

        <div style="margin:20px 0; padding:15px; background:#f3f4f6; border-radius:8px;">
          <p><strong>Job Details:</strong></p>
          <p>📌 Title: ${title}</p>
          <p>🏢 Company: ${company.companyName}</p>
          <p>📍 Location: ${jobLocation}</p>
          <p>💼 Type: ${type}</p>
          <p>🧑‍💻 Mode: ${jobMode}</p>
        </div>

        <p>Your job is now live and candidates can start applying.</p>

        <br/>
        <p>Best regards,</p>
        <p><strong>HireHub Team</strong></p>
      </div>
    `;

    // Send Email to Recruiter
    sendEmail(
      'softora.dev01@gmail.com',
      "Job Posted Successfully!",
      html
    );

     // Send Email to Admin
    sendEmail(
      "softora.dev01@gmail.com",
      "New Job Posted",
      `<p>${req.user.name} posted a new job: ${title}</p>`
    );

    res.json({
      message: "Job Posted successfully",
      job,
    });

  } catch (err) {
    next(err);
  }
};


const jobDetail = async(req, res) => {
    const job = await Job.findById(req.params.id )
    res.json({ job })
}

const getJobById = async(req, res) => {
    const job = await Job.findById(req.params.id)
    res.json({ job })
}

const editJobPost = async (req, res, next) => {
    try {
        const { title, jobLocation, jobMode, type, experience, salaryRange, skills, describeRole, requirements, responsibilities, goodToHave } = req.body
        await Job.findByIdAndUpdate({ _id: req.params.id }, {
            title, jobLocation, jobMode, type, experience, salaryRange,
            skills: skills.split(',').map(s => s.trim()),
            describeRole,
            requirements: requirements.split('\n').map(r => r.trim()).filter(item => item !== ""),
            responsibilities: responsibilities.split('\n').map(r => r.trim()).filter(item => item !== ""),
            goodToHave: goodToHave ? goodToHave.split('\n').map(g => g.trim()).filter(item => item !== "") : [],
        })
        res.json({message:'Edited successfully'})
    } catch (err) {
        next(err)
    }
}

const profile = async(req, res) => {
    const user= await User.findById(req.user.id).populate('company')
    res.json({user, company:user.company})
}

const editProfile = async (req, res, next) => {
    try {
        const companyDetails = await Company.findOne({ recruiter: req.user.id })
      res.json({ companyDetails })
    } catch (err) {
        next(err)
    }
}

const editProfilePost = async (req, res, next) => {
    try {
        const { companyname, companyemail, website, description, username, useremail } = req.body
        await Company.findOneAndUpdate({ recruiter: req.user.id }, {
            name: companyname,
            email: companyemail,
            website,
            description
        })
        await User.findOneAndUpdate({ _id: req.user.id }, {
            name: username,
            email: useremail
        })
        res.json({ message: "Profile updated successfully" })
    } catch (err) {
        next(err)
    }
}


const companyPost = async (req, res, next) => {
    try {
        const { name, location, industry, size, website, email, description } = req.body
        const newCompany = await Company.create({
          name, location, industry, size, website, email, logo: req.file.filename, description, recruiter: req.user.id
        })
        await User.findByIdAndUpdate(req.user.id, {
            company: newCompany._id
        })
        res.json({message:'Company added successfully'})
    } catch (err) {
        next(err)
    }
}

const deleteJob = async (req, res, next) => {
    try {
        const jobID = req.params.id
        await Job.findByIdAndDelete(jobID)
        res.json({message:'Deleted job successfully'})
    } catch (err) {
        next(err)
    }
}

const applicantStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    const application = await Application.findById(applicationId)
      .populate('applicant', 'email name');

    // safety check
    if (!application || !application.applicant) {
      return res.status(404).json({
        message: "Application or applicant not found"
      });
    }

    application.status = status;
    await application.save();

    // send email
    await sendEmail(
      'softora.dev01@gmail.com',

    )
    res.json({ message: 'application status updated' });
  } catch (err) {
    next(err);
  }
};

const jobList = async (req, res, next) => {
  try {
    const { title } = req.query
    let jobQuery = { recruiter: req.user.id }
    if (title) {
      jobQuery.title = { $regex: title, $options: 'i' }
    }
    const jobs = await Job.find(jobQuery)
    res.json({ jobs })
  } catch (err) {
    next(err)
  }
}

const applicationGet = async (req, res, next) => {
  try {
    const { title } = req.query
    let jobQuery = { recruiter: req.user.id }
    if (title) {
      jobQuery.title = { $regex: title, $options: 'i' }
    }
    const jobs = await Job.find(jobQuery).select('_id')
    const jobIds = jobs.map(job => job._id)
    const applications = await Application.find({
      job: { $in: jobIds }
    })
      .populate('applicant')
      .populate('job')

    res.json({ applications })
  } catch (err) {
    next(err)
  }
}


module.exports = { home, deleteJob, dashboard, postJobPost, jobList, jobDetail, getJobById, editJobPost, editProfile, editProfilePost, profile, companyPost, applicationGet, applicantStatus }