const { StatusCodes } = require('http-status-codes');

const Job = require('../models/jobs.model');
const { NotFoundError, BadRequestError } = require('../errors');

const jobsController = {
  createJob: async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await Job.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ job });
  },
  getAllJobs: async (req, res) => {
    const { userId } = req.user;
    const jobs = await Job.find({ createdBy: userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
  },
  getJob: async (req, res) => {
    const { params: { id: jobId }, user: { userId } } = req;
    const job = await Job.findOne({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new NotFoundError(`No job with id(${jobId}) found.`);
    }
    res.status(StatusCodes.OK).json({ job });
  },
  updateJob: async (req, res) => {
    const {
      params: { id: jobId },
      user: { userId },
      body: { company, position }
    } = req;

    if (company === '' && position === '') {
      throw new BadRequestError('This fields cannot be empty.');
    }

    const job = await Job.findOneAndUpdate(
      { _id: jobId, createdBy: userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!job) {
      throw new NotFoundError(`No job with id(${jobId}) found.`);
    }
    res.status(StatusCodes.OK).json({ success: true, job });
  },
  deleteJob: async (req, res) => {
    const { params: { id: jobId }, user: { userId } } = req;
    const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId });
    if (!job) {
      throw new NotFoundError(`No job with id(${jobId}) found.`);
    }
    res.status(StatusCodes.OK).json({ success: true });
  }
}

module.exports = jobsController;