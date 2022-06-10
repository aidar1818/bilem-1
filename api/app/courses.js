const express = require('express');
const multer = require('multer');
const {nanoid} = require('nanoid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const roles = require('../middleware/roles');
const Course = require('../models/Course');
const User = require('../models/User');
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
    const sort = {};

    if (req.query.user) {
      sort._id = -1;
      const userCourses = await Course.find({author: req.query.user}).sort(sort).populate('author', 'displayName');
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
        coursesBySubcategory = await Course.find({
          subcategory: req.query.subcategory,
          is_published: true
        }).populate('author', 'displayName').limit(10);
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
    course = await Course.findById(req.params.id)
      .populate('author', 'displayName')
      .populate('modules.lessons.comments.user', 'displayName');
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
      information: req.body.information,
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

    const responseCourses = courses.filter(course =>
      course.title.toLowerCase().includes(req.body.title) ||
      course.author.displayName.toLowerCase().includes(req.body.title) ||
      course.description.toLowerCase().includes(req.body.title)
    );

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
    user.myCourses.push({passedLessons: [], course: req.body.course});
    const course = await Course.findOne({_id: req.body.course});
    course.students.push(user);
    await course.save();
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

    const user = await User.findOne({_id: req.user._id});

    if (req.query.action) {
      let courseIndex;
      let lessonsArray = [];

      for (let i = 0; i < course.modules.length; i++) {
        for (let j = 0; j < course.modules[i].lessons.length; j++) {
          lessonsArray.push(course.modules[i].lessons[j]._id);
        }
      }

      for (let i = 0; i < user.myCourses.length; i++) {
        if (course._id.toString() === user.myCourses[i].course.toString()) {
          courseIndex = i;
        }
      }

      const lessonIsExists = user.myCourses[courseIndex].passedLessons.find(lesson => lesson._id.toString() === req.params.id);

      if (!lessonIsExists) {
        user.myCourses[courseIndex].passedLessons.push(req.params.id);
        user.myCourses[courseIndex].timestamp = Date.now();
        user.myCourses[courseIndex].passedLessons[user.myCourses[courseIndex].passedLessons.length - 1].timestamp = Date.now();
        user.myCourses[courseIndex].progress = (Math.round(user.myCourses[courseIndex].passedLessons.length * 100 / lessonsArray.length));
      }
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
          await user.save();
          return res.send(lesson);
        }
      }
    }
  } catch (e) {
    next(e);
  }
});

router.delete('/lesson/:id', auth, permit('user', 'admin'), async (req, res, next) => {
  try {
    const course = await Course.findOne({'modules.lessons._id': req.params.id});
    if (!course) {
      return res.status(404).send({error: 'Курс с данным уроком не был найден'});
    }

    if (req.user.role === 'admin' || course.author.toString() === req.user._id.toString()) {
      await Course.findOneAndUpdate({'modules.lessons._id': req.params.id}, {
        $pull: {'modules.$.lessons': {_id: req.params.id}}
      });
    } else {
      return res.status(403).send({message: `Доступ ограничен`});
    }

    return res.send({message: `Урок успешно удален`});

  } catch (e) {
    next(e);
  }
});

module.exports = router;
