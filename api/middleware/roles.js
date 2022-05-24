const User = require('../models/User');

const roles = async (req, res, next) => {
  const token = req.get('Authorization');

  if (token) {
    req.user = await User.findOne({token}).populate(
      {
        path: 'myCourses.course favoriteCourses',
        populate: 'author subcategory',
      });
  }

  next();
}
module.exports = roles;