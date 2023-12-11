const Job = require("../models/jobs");


// Getting all the jobs
const getAllJobs = async (req, res) => {
  try {
    const job = await Job.find({ createdBy: req.user.userId });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};


// Getting a single Job
const getJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;
    const job = await Job.findOne({ _id: jobId }, { createdBy: userId });
    if (!job) {
      return res
        .status(404)
        .json({ msg: `There are no jobs with given ID ${jobID}` });
    }
    res.status(201).json(job);
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};


//Creating a Job
const createJob = async (req, res) => {
  try {
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).send({ msg: error });
  }
};


// Updating the fields of a job
const updateJob = async (req, res) => {
  try {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId },
    } = req;

    if (position === "" || company === "") {
      return res
        .status(404)
        .json({ msg: "Please provide a valid company or position" });
    }
    const job = await Job.findOneAndUpdate(
      { _id: jobId },
      { createdBy: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!job) {
      return res
        .status(404)
        .json({ msg: `There are no jobs for the given ID ${jobId}` });
    }

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};


// Deleting a Job 
const deleteJob = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: jobId },
    } = req;
    const job = await Job.findOneAndDelete(
      { _id: jobId },
      { createdBy: userId }
    );
    if (!job) {
      return json
        .status(404)
        .json({ msg: `There are no Jobs with the given ID ${jobId}` });
    }
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
