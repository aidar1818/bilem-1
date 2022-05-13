const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const roles = require('../middleware/roles');
const Course = require('../models/Course');
const config = require('../config');
const path = require('path');
const Subcategory = require('../models/Subcategory');
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

router.get('/', roles, async (req, res, next) => {
  try {
    if (req.query.user) {
      const userCourses = await Course.find({author: req.query.user}).populate('author', 'displayName');
      return res.send(userCourses);
    }

    let coursesByCategory;

    if (req.query.category) {
      const subcategories = await Subcategory.find({category: req.query.category});
      if (req.user && req.user.role === 'admin') {
        coursesByCategory = await Course.find({subcategory: subcategories}).populate('author', 'displayName');
      } else {
        coursesByCategory = await Course.find({
          subcategory: subcategories,
          is_published: true
        }).populate('author', 'displayName');
      }
      return res.send(coursesByCategory);
    }

    let coursesBySubcategory;

    if (req.query.subcategory) {
      if (req.user && req.user.role === 'admin') {
        coursesBySubcategory = await Course.find({subcategory: req.query.subcategory}).populate('author', 'displayName').limit(10);
      } else {
        coursesBySubcategory = await Course.find({subcategory: req.query.subcategory, is_published: true}).populate('author', 'displayName').limit(10);
      }
      return res.send(coursesBySubcategory);
    }

    if (req.user && req.user.role === 'admin') {
      const courses = await Course.find();
      return res.send(courses);
    } else {
      const courses = await Course.find({is_published: true});
      return res.send(courses);
    }
  } catch
    (e) {
    next(e);
  }
});

router.get('/:id', roles, async (req, res, next) => {
  try {
    let course;

    if (req.user && req.user.role === 'admin') {
      course = await Course.findById(req.params.id)
        .populate('author', 'displayName')
        .populate('modules.lessons.comments.user', 'displayName');
    }

    if ((req.user && req.user.role === 'user') || !req.user) {
      [course] = await Course.find({_id: req.params.id, is_published: true})
        .populate('author', 'displayName')
        .populate('modules.lessons.comments.user', 'displayName');
    }

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
      image: req.file ? req.file.filename : null,
      is_free: req.body.is_free,
      is_published: req.user.role === 'admin',
      price: req.body.price ? req.body.price : null
    });

    await course.save();

    return res.send(course);
  } catch (e) {
    next(e);
  }
});

router.post('/course/:id', auth, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).send({message: `Course is not found`});
    }

    if (req.user.role === 'admin') {
      course.modules = req.body.modules;
    } else if (course.author.toString() === req.user._id.toString()) {
      course.modules = req.body.modules;
    } else {
      return res.status(403).send({message: `Access is restricted`});
    }

    await course.save();

    return res.send(course);
  } catch (e) {
    next(e);
  }
});

router.post('/course/lesson/:id/addComment', auth, async (req, res, next) => {
  try {
    const course = await Course.findOne({'modules.lessons._id': req.params.id})
      .populate('author', 'displayName')
      .populate('modules.lessons.comments.user', 'displayName');

    course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        if (lesson._id.toString() === req.params.id) {
          lesson.comments.push({user: req.user._id, text: req.body.text});
          course.save();
        }
      })
    });

    return res.send(course);
  } catch (e) {
    next(e);
  }
});

router.post('/:id/publish', auth, permit('admin'), async (req, res, next) => {
  try {
    await Course.updateOne({_id: req.params.id}, {is_published: true});
    return res.send({message: 'Updated successful'});
  } catch (e) {
    next(e);
  }
});

router.post('/search', roles, async (req, res, next) => {
  try {
    const query = {};
    let courses;

    if (req.body.is_free) {
      query.is_free = req.body.is_free;
    }

    if (req.user && req.user.role === 'admin') {
      courses = await Course.find(query).populate('author', 'displayName');
    }

    if ((req.user && req.user.role === 'user') || !req.user) {
      query.is_published = true;
      courses = await Course.find(query).populate('author', 'displayName');
    }

    const responseCourses = courses.filter(course => course.title.toLowerCase().includes(req.body.title));

    return res.send(responseCourses);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).send({message: `Not found!`});
    }

    if (req.user.role === 'admin' || course.author.toString() === req.user._id.toString()) {
      await Course.deleteOne({_id: req.params.id});
    } else {
      return res.status(403).send({message: `Access is restricted`});
    }

    return res.send({message: `Course deleted!`});
  } catch (e) {
    next(e);
  }
});

router.post('/addCourse', auth, async (req, res, next) => {
  try {
    const user = req.user;
    user.myCourses.push(req.body.course);
    await user.save();
    return res.send({message: 'Course added!'});
  } catch (error) {
    next(error);
  }
});

router.post('/addFavoriteCourse', auth, async (req, res, next) => {
  try {
    const user = req.user;
    user.favoriteCourses.push(req.body.favoriteCourse);
    await user.save();
    return res.send({message: 'Course added!'});
  } catch (error) {
    next(error);
  }
});

router.post('/lesson/:id', auth, permit('user', 'admin'), async (req, res, next) => {
  try {
    if (!req.body.title) {
      return res.status(400).send({message: 'Название урока является обязательным полем!'});
    }

    const course = await Course.findOne({'modules.lessons._id': req.params.id});

    if (!course) {
      return res.status(404).send({message: `Курс не найден!`});
    }

    for (let i = 0; i < course.modules.length; i++) {
      for (let j = 0; j < course.modules[i].lessons.length; j++) {
        if ((course.modules[i].lessons[j]._id).toString() === req.params.id) {
          course.modules[i].lessons[j].title = req.body.title;
          if (req.body.description) {
            course.modules[i].lessons[j].description = req.body.description;
          }
          if (req.body.video) {
            course.modules[i].lessons[j].video = req.body.video;
          }
        }
      }
    }

    await course.save();
    return res.send(course);
  } catch (e) {
    next(e);
  }
});

router.get('/lesson/:id', auth, permit('user', 'admin'), async (req, res, next) => {
  try {
    const course = await Course.findOne({'modules.lessons._id': req.params.id})
      .populate('modules.lessons.comments.user', 'displayName');

    if (!course) {
      return res.status(404).send({message: `Курс не найден!`});
    }

    for (let i = 0; i < course.modules.length; i++) {
      for (let j = 0; j < course.modules[i].lessons.length; j++) {
        if ((course.modules[i].lessons[j]._id).toString() === req.params.id) {
          const lesson = {
            _id: course.modules[i].lessons[j]._id,
            title: course.modules[i].lessons[j].title,
            description: course.modules[i].lessons[j].description,
            video: course.modules[i].lessons[j].video,
            comments: course.modules[i].lessons[j].comments.reverse(),
          };
          return res.send(lesson);
        }
      }
    }

  } catch (e) {
    next(e);
  }
});

module.exports = router;
