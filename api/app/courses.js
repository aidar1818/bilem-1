const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Course = require("../models/Course");
const config = require("../config");
const path = require("path");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

router.get('/', async (req, res, next) => {
  try {
    if (req.query.user) {
      const userCourses = await Course.find({author: req.query.user}).populate('author', 'displayName');
      return res.send(userCourses);
    }

    if (req.query.subcategory) {
      const coursesBySubcategory = await Course.find({subcategory: req.query.subcategory});
      return res.send(coursesBySubcategory);
    }

    const courses = await Course.find();
    return res.send(courses);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate('author', 'displayName');
    return res.send(course);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, upload.single('image'), async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({message: 'Title is required !'});
    }

    const course = new Course({
      title: req.body.title,
      description: req.body.description,
      author: req.user._id,
      subcategory: req.body.subcategory,
      image: null,
      is_free: req.body.is_free,
    });

    if (req.body.price) {
      course.price = req.body.price;
    }

    if (req.file) {
      course.image = req.file.filename;
    }

    await course.save();

    return res.send(course);
  } catch (e) {
    next(e);
  }
});

router.post('/course/:id', auth, permit('user', 'admin'), async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if(!course) {
      return res.status(404).send({message: `Course is not found`});
    }
    course.modules = req.body.modules;
    await course.save();

    return res.send(course);
  } catch (e) {
    next(e);
  }
});

router.post('/search', async (req, res, next) => {
  try {
    const query = {};
    if (req.body.is_free) {
      query.is_free = req.body.is_free;
    }
    const courses = await Course.find(query).populate('author', 'displayName');
    const responseCourses = courses.filter(course => course.title.toLowerCase().includes(req.body.title));

    return res.send(responseCourses);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('user', 'admin'), async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({message: `Not found!`});
    }
    await Course.deleteOne({_id: req.params.id});

    return res.send({message: `Course deleted!`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
