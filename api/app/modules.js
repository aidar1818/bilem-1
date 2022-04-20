const express = require('express');
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const Module = require("../models/Module");
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if(req.query.course) {
      const modulesByCourse = await Module.find({course: req.query.course});
      return res.send(modulesByCourse);
    }

    const modules = await Module.find();
    return res.send(modules);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, permit('user', 'admin'), async (req, res, next) => {
  try {
    if(!req.body.title) {
      return res.status(400).send({message: 'Title is required !'});
    }

    const module = new Module({
      course: req.body.course,
      title: req.body.title,
      lesson: req.body.lesson,
    });

    await module.save();

    return res.send(module);
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('user', 'admin'),  async (req, res, next) => {
  try {
    const module = await Module.findById(req.params.id);
    if(!module) {
      return res.status(404).send({message: `Not found!`});
    }
    await Module.deleteOne({_id: req.params.id});

    return res.send({message: `Module deleted!`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;