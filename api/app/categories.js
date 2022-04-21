const express = require('express');
const Category = require("../models/Category");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const mongoose = require("mongoose");
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const allCategories = await Category.find();
    return res.send(allCategories);
  } catch (e) {
    next(e);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send({message: 'Not found!'});
    }

    return res.send(category);
  } catch (e) {
    next(e);
  }
});

router.post('/', auth, permit('admin'),  async (req, res, next) => {
  try {
    if(!req.body.title) {
      return res.status(400).send({message: 'Title is required !'});
    }

    const newCategory = new Category({
      title: req.body.title
    });

    await newCategory.save();

    return res.send(newCategory);
  } catch (e) {
    next(e);
  }
});

router.put('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send({error: 'Category not found'});
    }

    category.title = req.body.title;

    await category.save();

    return res.send(category);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

router.delete('/:id', auth, permit('admin'),  async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if(!category) {
      return res.status(404).send({message: `Категория не найдена!`});
    }
    await Category.deleteOne({_id: req.params.id});
    return res.send({message: `Категория была успешно удалена!`});
  } catch (e) {
    next(e);
  }
});

module.exports = router;
