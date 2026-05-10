const Application = require("../models/application")
const Company = require("../models/company")
const Contact = require("../models/contact")
const Job = require("../models/job")

const home = async (req, res, next) => {
  try {

    const jobs = await Job.aggregate([
      {
        $match: { status: 'approved' }
      },
      {
        $group: {
          _id: "$title"
        }
      },
      {
        $project: {
          title: '$_id'
        }
      }
    ])
    
    const companyLogo = await Company.find({}, { logo: 1 }).limit(4)

    res.json({ jobs, companyLogo })

  } catch (err) {
    next(err)
  }
}


const browseJobs = async (req, res, next) => {
  try {
    const { search, location, jobMode, type, salary, title } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const makeArray = (value) => {
      if (!value) return [];
      if (Array.isArray(value)) return value;
      return value.split(",");
    };

    let query = { status: "approved" };

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { jobLocation: { $regex: search, $options: "i" } }
      ];
    }

    if (location) {
      query.jobLocation = { $regex: location, $options: "i" };
    }

    if (jobMode) {
      query.jobMode = { $in: makeArray(jobMode) };
    }

    if (type) {
      query.type = { $in: makeArray(type) };
    }

    if (salary) {
      query.salaryRange = { $in: makeArray(salary) };
    }

    const [jobs, totalJobs] = await Promise.all([
      Job.find(query).populate("company").skip(skip).limit(limit),
      Job.countDocuments(query),
    ]);

    // applied jobs
    let appliedJobs = {};

    if (req.user) {
      const applications = await Application.find({
        applicant: req.user.id
      }).select("job");

      applications.forEach(app => {
        appliedJobs[app.job.toString()] = true;
      });
    }

    res.json({
      jobs,
      totalPages: Math.ceil(totalJobs / limit),
      appliedJobs 
    });

  } catch (err) {
    next(err);
  }
};


const jobDetail = async (req, res, next) => {
  try {
    const jobID = req.params.id
    const job = await Job.findById(jobID).populate('company')

    let appliedJob = {}

    const applications = await Application.find({
      applicant: req.user?.id
    }).select('job')

    applications.forEach(app => {
      appliedJob[app.job.toString()] = true
    })

    res.json({ job, appliedJob })

  } catch (err) {
    next(err)
  }
}


const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body
    await Contact.create({ name, email, message })
    res.json({ message: "Message sent successfully" })

  } catch (error) {
    res.status(500).json({ message: "Error sending message" })
  }
}


module.exports = { home, browseJobs, jobDetail, contact }