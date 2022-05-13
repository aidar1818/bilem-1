const express = require('express');
const mongoose = require("mongoose");
const User = require("../models/User");
const config = require("../config");
const axios = require('axios');

require('dotenv').config();
const nodemailer = require('nodemailer');
const {customAlphabet} = require('nanoid');
const auth = require("../middleware/auth");
const nanoid = customAlphabet('1234567890', 6);

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    return res.send(req.user);
  } catch (e) {
    next(e);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      displayName: req.body.displayName
    });

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

router.post('/sessions', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(400).send(
          {error: 'Вам необходимо зарегестрироваться!'}
      );
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'Неверный пароль!'});
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
});

router.post('/facebookLogin', async (req, res, next) => {
  try {
    const inputToken = req.body.authToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    const response = await axios.get(debugTokenUrl);

    if (response.data.data.error) {
      return res.status(401).send({message: 'Facebook token incorrect'});
    }

    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({message: 'Wrong User ID'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if (!user) {
      user = new User({
        email: req.body.email,
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name
      });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
});

router.post('/googleLogin', async (req, res, next) => {
  try {
    const accessToken = req.body.accessToken;

    const debugTokenUrl = `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

    const response = await axios.get(debugTokenUrl);

    if (response.error) {
      return res.status(401).send({message: 'Google token is incorrect!'});
    }

    if (req.body.id !== response.data.id) {
      return res.status(401).send({message: 'Wrong user ID!'});
    }

    let user = await User.findOne({googleId: req.body.id});

    if (!user) {
      user = new User({
        email: req.body.email,
        password: nanoid(),
        googleId: req.body.id,
        displayName: req.body.name,
      });
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
});

router.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const message = {message: 'OK'};

    if (!token) return res.send(message);

    const user = await User.findOne({token});

    if (!user) return res.send(message);

    user.generateToken();
    await user.save();

    return res.send(message);
  } catch (e) {
    next(e);
  }
});

router.post('/recovery', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: user.email,
      subject: 'Код для подтверждения пароля',
      text: nanoid(),
    };

    transporter.sendMail(mailOptions);

    const updateUser = await User.findByIdAndUpdate({_id: user._id});
    updateUser.code = mailOptions.text;
    await updateUser.save();

    return res.send({email: updateUser.email, code: updateUser.code});
  } catch (error) {
    next(error)
  }
});

router.post('/checkCode', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});

    if (user.code !== req.body.code) {
      return res.status(400).send({error: 'Неверный код!'})
    }

    return res.send(user.code);
  } catch (error) {
    next(error);
  }
});

router.put('/editPassword', async (req, res, next) => {
  try {
    const user = await User.findOne({email: req.body.email});
    user.password = req.body.password;
    await user.save();

    return res.send(user);
  } catch (error) {
    next(error);
  }
});

router.put('/userEditProfile', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.body._id);
    const update = req.body;
    user.email = update.email;
    user.displayName = update.displayName;
    user.aboutMe = update.aboutMe;

    await user.save();

    return res.send(user);
  } catch (error) {
    next(error);
  }
});

router.post('/addSocialNetworks', auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);

    if(!user) {
      return res.status(400).send({error: "Пользователь с таким ID не найден!"});
    }

    user.socialNetworks = {
      fb: req.body.fb,
      github: req.body.github,
      vk: req.body.vk,
      tw: req.body.tw,
      instagram: req.body.instagram,
      skype: req.body.skype,
      tme: req.body.tme,
      website: req.body.website,
      youtube: req.body.youtube,
    };

    await user.save();

    return res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

