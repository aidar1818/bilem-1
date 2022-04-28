const express = require('express');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const Subcategory = require('../models/Subcategory');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    if(req.query.category) {
      const subcategoriesByCategory = await Subcategory.find({category: req.query.category});
      return res.send(subcategoriesByCategory);
    }

    const subcategory = await Subcategory.find();

    return res.send(subcategory);
  } catch (e) {
    next(e);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
      return res.status(404).send({message: 'Not found!'});
    }

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

router.put('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);

    if (!subcategory) {
      return res.status(404).send({error: 'Subcategory not found'});
    }

    subcategory.title = req.body.title;

    await subcategory.save();

    return res.send(subcategory);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

router.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const subcategory = await Subcategory.findById(req.params.id);
    if(!subcategory) {
      return res.status(404).send({error: 'Subcategory not found'});
    }

    await Subcategory.deleteOne({_id: req.params.id});
    return res.send({message: `Deleted successful`});

  } catch (e) {
    next(e);
  }
});

module.exports = router;