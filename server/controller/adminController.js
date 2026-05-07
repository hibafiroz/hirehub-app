const Job = require("../models/job")


// GET admin panel jobs
const adminPanelGet = async (req, res, next) => {
  try {
    const jobs = await Job.find({}).populate('company')
    res.json({ jobs })
  } catch (error) {
    next(error)
    res.json({ message: "Server error" })
  }
}


// APPROVE job
const approve = async (req, res, next) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, { status: "approved" })
    res.json({ message: "Job approved successfully" })
  } catch (error) {
    next(error)
    res.json({ message: "Error approving job" })
  }
}

// REJECT job
const reject = async (req, res, next) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, { status: "rejected" })
    res.json({ message: "Job rejected successfully" })
  } catch (error) {
    next(error)
    res.json({ message: "Error rejecting job" })
  }
}

// JOB DETAIL
const jobDetail = async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id).populate('company')
    res.json({ job })
  } catch (error) {
    next(error)
    res.json({ message: "Error fetching job" })
  }
}

module.exports = { adminPanelGet, approve, reject, jobDetail }