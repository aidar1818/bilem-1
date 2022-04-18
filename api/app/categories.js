const express = require('express');
const Category = require("../models/Category");
const auth = require("../middleware/auth");
const permit = require("../middleware/permit");
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const allCategories = await Category.find();
    return res.send(allCategories);
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