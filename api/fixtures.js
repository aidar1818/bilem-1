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

  const [programming, finance, design, business, personalGrowth, marketing, art, beauty, photo, fitness, music,
    exam, schoolLessons, smm] = await Category.create({
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

  const [web, analysis, mobileGameDev, gameDev, dataBase, testing, devWithoutCode, economic, accounting,
    financing, trading, taxes, cryptocurrency,webDesign, graphDesign, designTools, interface, interior, motion, trheeD,
    entrepreneurship, interaction, management, sales, strategies, operations, projectManagement, commercialLaw,
    businessAnalysis, personnel, industry, electricCommerce, jurisprudence, immovability, personalChange,
    personalProductivity, leadership, parentingAndRelationships, happy, esotericPractices, confidence,
    digital, smmMarketing, marketingBasics, drawing, watercolorPainting, pencilDrawing, painting,sketching,
    drawingPerson, portraitArt, acrylicPainting, pottery, ielts, toefl, pmp, sit, ege, nct, ort] = await Subcategory.create({
    category: programming,
    title: 'Веб-разработка',
  }, {
    category: programming,
    title: 'Обработка и анализ данных',
  }, {
    category: programming,
    title: 'Разработка мобильных игр',
  }, {
    category: programming,
    title: 'Разработка игр',
  }, {
    category: programming,
    title: 'Проектирование и разработка баз данных',
  },  {
    category: programming,
    title: 'Тестирование программного обеспечения',
  },  {
    category: programming,
    title: 'Разработка без кода',
  }, {
    category: finance,
    title: 'Экономика',
  }, {
    category: finance,
    title: 'Бухгалтерский учет и отчетность',
  }, {
    category: finance,
    title: 'Финансы',
  }, {
    category: finance,
    title: 'Инвестирование и трейдинг',
  }, {
    category: finance,
    title: 'Налоги',
  }, {
    category: finance,
    title: 'Криптовалюты и блокчейн',
  }, {
    category: design,
    title: 'Веб дизайн',
  }, {
    category: design,
    title: 'Графический дизайн',
  }, {
    category: design,
    title: 'Инструменты дизайна',
  },{
    category: design,
    title: 'Дизайн пользовательского интерфейса',
  },{
    category: design,
    title: 'Дизайн интерьеров',
  },{
    category: design,
    title: 'Motion дизайн',
  },{
    category: design,
    title: '3D',
  },{
    category: business,
    title: 'Предпринимательство',
  }, {
    category: business,
    title: 'Взаимодействие',
  }, {
    category: business,
    title: 'Менеджмент',
  }, {
    category: business,
    title: 'Продажи',
  }, {
    category: business,
    title: 'Бизнес стратегии',
  }, {
    category: business,
    title: 'Операции',
  }, {
    category: business,
    title: 'Управление проектами',
  }, {
    category: business,
    title: 'Комерческое право',
  }, {
    category: business,
    title: 'Бизнес анализ и работа с данными',
  }, {
    category: business,
    title: 'Кадры',
  }, {
    category: business,
    title: 'Промышленность',
  }, {
    category: business,
    title: 'Электрованная комерация',
  }, {
    category: business,
    title: 'Юриспруденция',
  }, {
    category: business,
    title: 'Недвижемость',
  }, {
    category: personalGrowth,
    title: 'Личностные изменения',
  },{
    category: personalGrowth,
    title: 'Личная продуктивность',
  },{
    category: personalGrowth,
    title: 'Лидерство',
  },{
    category: personalGrowth,
    title: 'Воспитания и отношения',
  },{
    category: personalGrowth,
    title: 'Счастье',
  },{
    category: personalGrowth,
    title: 'Эзотерические практики',
  },{
    category: personalGrowth,
    title: 'Самооценка и уверенность',
  },{
    category: marketing,
    title: 'Интернет маркетинг',
  },{
    category: marketing,
    title: 'SMM',
  },{
    category: marketing,
    title: 'Основы маркетинга',
  },{
    category: art,
    title: 'Рисование',
  },{
    category: art,
    title: 'Акварельная живопись',
  },{
    category: art,
    title: 'Карандашный рисунок',
  },{
    category: art,
    title: 'Живопись',
  },{
    category: art,
    title: 'Создание эскизов',
  },{
    category: art,
    title: 'Рисование человека',
  },{
    category: art,
    title: 'Портретное искусство',
  },{
    category: art,
    title: 'Акриловая живопись',
  },{
    category: art,
    title: 'Гончарное искусство',
  }, {
    category: exam,
    title: 'IELTS',
  },{
    category: exam,
    title: 'TOEFL',
  },{
    category: exam,
    title: 'PMP',
  },{
    category: exam,
    title: 'SIT',
  },{
    category: exam,
    title: 'ЕГЭ',
  },{
    category: exam,
    title: 'НЦТ',
  },{
    category: exam,
    title: 'ОРТ',
  },);

  const [java, cryptoRegency, javaScript, jScript, uxUi, tradingCourse, designIn, designBasic, ieltsCourse, ieltsSpeaking] = await Course.create({
    title: 'Java c нуля',
    description: 'веб-разработка',
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
  },{
    title: 'Продвинутая Java',
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
    title: 'Полное руководство по торговле криптовалютой для начинающих',
    description: 'Криптовалюты - это легко. Мой курс отвечает на самые основополагающие вопросы об устройстве и использовании криптовалют. Для вас он станет крепким фундаментом в понимании криптовалютного рынка.' +
        ' А так же поможет защититься от мошенников и повысит вашу финансовую грамотность.',
    author: user,
    subcategory: cryptocurrency,
    modules: [
      {
        title: 'Базовые понятия о криптовалютах',
        lessons: [
          {
            title: 'Превью курса',
            description: 'Lesson 1 description here'
          },
          {
            title: 'Lesson 2',
            video: 'Lesson 2 video url here'
          },
        ]
      },
      {
        title: 'Создание криптовалютного портфеля',
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
    rate: 4.7,
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
    rate: 4.7,
    is_published: false
  },{
    title: 'Java Script с нуля',
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
    price: 600,
    image: null,
    is_free: false,
    rate: 5,
    is_published: false
  },{
    title: 'UX/UI',
    description: 'Веб-дизайн',
    author: user,
    subcategory: webDesign,
    modules: [
      {
        title: 'UX DESIGN FOUNDATIONS',
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
        title: 'UX/UI main information',
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
    price: 700,
    image: null,
    is_free: false,
    rate: 4.7,
    is_published: false
  }, {
    title: 'Трейдинг 2022',
    description: 'Трейдинг',
    author: user,
    subcategory: trading,
    modules: [
      {
        title: 'Trading about info',
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
        title: 'Trading main information',
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
    rate: 5,
    is_published: false
  },  {
    title: 'Дизайн интерьера',
    description: 'Пошаговое руководство по созданию интерьера',
    author: user,
    subcategory: interior,
    modules: [
      {
        title: 'Теория',
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
        title: 'Практика',
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
    price: 800,
    image: null,
    is_free: false,
    rate: 3.5,
    is_published: false
  }, {
    title: 'Основы дизайна интерьера',
    description: 'Узнайте как создать интерьер самостоятельно с любым бюджетом',
    author: user,
    subcategory: interior,
    modules: [
      {
        title: 'Введение',
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
        title: 'Основы композиции',
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
      },
      {
        title: 'Семь типов цветовых контрастов',
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
    rate: 4.7,
    is_published: false
  }, {
    title: 'Подготовка к IElTS',
    description: 'подготовка к IElTS за три месяца',
    author: user,
    subcategory: exam,
    modules: [
      {
        title: 'Введение',
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
        title: 'Основы композиции',
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
      },
      {
        title: 'Семь типов цветовых контрастов',
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
    rate: 3.7,
    is_published: false
  }, {
    title: 'IElTS speaking',
    description: 'Эффективный курс по разговорной части IELTS',
    author: user,
    subcategory: exam,
    modules: [
      {
        title: 'Введение',
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
        title: 'Основы композиции',
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
      },
      {
        title: 'Семь типов цветовых контрастов',
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
    price: 500,
    image: null,
    is_free: false,
    rate: 3.7,
    is_published: false
  });

  await mongoose.connection.close();
};

run().catch(e => console.error(e));
