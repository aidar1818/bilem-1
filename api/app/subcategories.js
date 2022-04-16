const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Subcategory = require('../models/Subcategory');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const subcategory = await Subcategory.find();

    return res.send(subcategory);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, permit('admin'), async (req, res, next) => {
  try {
    const subcategory = new Subcategory({
      category: req.body.category,
      title: req.body.title,
      description: req.body.description ? req.body.description : null,
    });
    await subcategory.save();

    return res.send({message: `Created subject with id: ${subcategory._id}`});
  } catch (e) {
    next(e);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    await Subcategory.findByIdAndDelete(req.params.id);

    return res.send({message: `Deleted successful`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;