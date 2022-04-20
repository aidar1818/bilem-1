const express = require('express');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Lesson = require("../models/Lesson");
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if(req.query.module) {
      const lessonsByModule = await Lesson.find({module: req.query.module});
      return res.send(lessonsByModule);
    }

    const lessons = await Lesson.find();
    return res.send(lessons);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, permit('user', 'admin'), async (req, res, next) => {
  try {
    if(!req.body.title) {
      return res.status(400).send({message: 'Title is required !'});
    }

    const lesson = new Lesson({
      module: req.body.module,
      title: req.body.title,
      video: req.body.video,
      description: req.body.description,
    });

    await lesson.save();

    return res.send(lesson);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('user', 'admin'),  async (req, res, next) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if(!lesson) {
      return res.status(404).send({message: `Not found!`});
    }
    await Lesson.deleteOne({_id: req.params.id});

    return res.send({message: `Lesson deleted!`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;