const mongoose = require('mongoose');
const config = require("./config");
const User = require("./models/User");
const {nanoid} = require("nanoid");
const Category = require("./models/Category");
const Subcategory = require("./models/Subcategory");
const Course = require("./models/Course");

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, admin] = await User.create({
    email: 'user@bilem.com',
    password: '123asdA!',
    displayName: 'User',
    token: nanoid(),
    role: 'user'
  }, {
    email: 'admin@bilem.com',
    password: '123asdA!',
    displayName: 'Admin',
    token: nanoid(),
    role: 'admin'
  });

  const [
    programming, finance, design, business,
    personalGrowth, marketing, art,
    beauty, photo, fitness, music, exam, schoolLessons, smm
  ] = await Category.create({
    title: 'Программирование'
  }, {
    title: 'Финансы и бухгалтерский учет'
  }, {
    title: 'Дизайн'
  }, {
    title: 'Бизнес'
  }, {
    title: 'Личностный рост'
  }, {
    title: 'Маркетинг'
  }, {
    title: 'Искусство и ремесло'
  }, {
    title: 'Красота и косметика'
  }, {
    title: 'Фотография и видео'
  }, {
    title: 'Здоровье и фитнес'
  }, {
    title: 'Музыка'
  }, {
    title: 'Подготовка к экзаменам'
  }, {
    title: 'Школьные дисциплины'
  }, {
    title: 'SMM'
  });

  const [web, analysis, mobileGameDev, gameDev, dataBase, testing, devWithoutCode] = await Subcategory.create({
    category: programming,
    title: 'Веб-разработка',
  }, {
    category: programming,
    title: 'Обработка и анализ данных',
  }, {
    category: programming,
    title: 'Разработка мобильных игр',
  }, {
    category: finance,
    title: 'Экономика',
  }, {
    category: finance,
    title: 'Бух учет',
  }, {
    category: design,
    title: 'UX UI',
  }, {
    category: design,
    title: '3D',
  }, {
    category: business,
    title: 'Менеджмент',
  }, {
    category: business,
    title: 'Управление проектами',
  });

  const [java, javaScript] = await Course.create({
    title: 'Java',
    description: 'Веб-разработка',
    author: user,
    subcategory: web,
    modules: [
      {
        title: 'JavaSpring introduction',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here'
          },
          {
            title: 'Lesson 2',
            video: 'Lesson 2 video url here'
          },
        ]
      },
      {
        title: 'JavaSpring main information',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'Video url'
          },
          {
            title: 'Main info full lesson 2',
            video: 'Full lesson 2  video url here'
          },
        ]
      }
    ],
    price: 1000,
    image: null,
    is_free: false,
    rate: 0.0,
    is_published: false
  }, {
    title: 'Java Script',
    description: 'Веб-разработка',
    author: user,
    subcategory: web,
    modules: [
      {
        title: 'Java Script about info',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here'
          },
          {
            title: 'Lesson 2',
            video: 'Lesson 2 video url here'
          },
        ]
      },
      {
        title: 'Java Script main information',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'Video url'
          },
          {
            title: 'Main info full lesson 2',
            video: 'Full lesson 2  video url here'
          },
        ]
      }
    ],
    price: 0,
    image: null,
    is_free: true,
    rate: 0.0,
    is_published: false
  });

  await mongoose.connection.close();
};

run().catch(e => console.error(e));
