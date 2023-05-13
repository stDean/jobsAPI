const express = require('express');
const router = express.Router();

const jobsController = require('../controllers/jobs.controller');
const { createJob, getAllJobs, getJob, updateJob, deleteJob } = jobsController;

router.route('/').get(getAllJobs).post(createJob);
router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);

module.exports = router;