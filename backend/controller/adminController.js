const Job = require("../models/job")

// GET admin panel jobs
const adminPanelGet = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "pending" }).populate('company')
    res.json({ jobs })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// APPROVE job
const approve = async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, { status: "approved" })
    res.json({ message: "Job approved successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error approving job" })
  }
}

// REJECT job
const reject = async (req, res) => {
  try {
    await Job.findByIdAndUpdate(req.params.id, { status: "rejected" })
    res.json({ message: "Job rejected successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error rejecting job" })
  }
}

// JOB DETAIL
const jobDetail = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    res.json({ job })
  } catch (error) {
    res.status(500).json({ message: "Error fetching job" })
  }
}

module.exports = { adminPanelGet, approve, reject, jobDetail }