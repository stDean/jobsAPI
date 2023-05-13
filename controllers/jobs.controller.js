const Job = require('../models/jobs.model');

const jobsController = {
  createJob: async () => {
    res.send("Create Job")
  },
  getAllJobs: async (req, res) => {
    res.send("All Jobs")
  },
  getJob: async (req, res) => {
    res.send("Single Job")
  },
  updateJob: async (req, res) => {
    res.send("Update Jobs")
  },
  deleteJob: async (req, res) => {
    res.send("Delete Jobs")
  }
}

module.exports = jobsController;