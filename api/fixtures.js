const mongoose = require('mongoose');
const config = require('./config');
const User = require('./models/User');
const {nanoid} = require('nanoid');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Course = require('./models/Course');
const Review = require('./models/Review');

const run = async () => {
  await mongoose.connect(config.mongo.db, config.mongo.options);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [user, user2, user3, user4, admin] = await User.create(
    {
      email: 'user@bilem.com',
      password: '123asdA!',
      displayName: 'User',
      token: nanoid(),
      role: 'user',
      aboutMe: 'Изучаю память в лаборатории когнитивных исследований НИУ ВШЭ, работаю над кандидатской диссертацией.\n' +
        '\n' +
        'Дважды ездила на стажировку в Гарвард (Harvard Medical School, Harvard Psychology Department), училась по обмену на медицинском факультете университета Хельсинки. Instagram Tik-Tok YouTube\n' +
        '\n' +
        'С 2017 г. лектор культурной платформы "Синхронизация", куратор Школы лекторов фонда «Эволюция», модератор "Бранч с ученым" от Политеха',
      socialNetworks: [{
        fb: 'https://www.facebook.com',
        github: 'https://github.com',
        vk: 'https://vk.com',
        tw: 'https://twitter.com',
        instagram: 'https://www.instagram.com',
        skype: 'https://www.skype.com',
        tme: 'https://t.me',
        website: 'http://localhost:4200',
        youtube: 'https://www.youtube.com',
      }]
    },
    {
      email: 'user2@bilem.com',
      password: '123asdA!',
      displayName: 'User 2',
      token: nanoid(),
      role: 'user'
    },
    {
      email: 'user3@bilem.com',
      password: '123asdA!',
      displayName: 'User 3',
      token: nanoid(),
      role: 'user'
    },
    {
      email: 'user4@bilem.com',
      password: '123asdA!',
      displayName: 'User 4',
      token: nanoid(),
      role: 'user',
      aboutMe: 'Изучаю память в лаборатории когнитивных исследований НИУ ВШЭ, работаю над кандидатской диссертацией.\n' +
        '\n' +
        'Дважды ездила на стажировку в Гарвард (Harvard Medical School, Harvard Psychology Department), училась по обмену на медицинском факультете университета Хельсинки. Instagram Tik-Tok YouTube',
      socialNetworks: [{
        fb: 'https://www.facebook.com',
        github: 'https://github.com',
        vk: 'https://vk.com',
        tw: 'https://twitter.com',
      }]
    },
    {
      email: 'admin@bilem.com',
      password: '123asdA!',
      displayName: 'Admin',
      token: nanoid(),
      role: 'admin'
    },
  );

  const [programming, finance, design, business, personalGrowth, marketing, art, beauty, photo, fitness, music,
    exam, schoolLessons] = await Category.create({
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
  });

  const [web, analysis, mobileGameDev, gameDev, dataBase, testing, devWithoutCode, economic, accounting,
    financing, trading, taxes, cryptocurrency, webDesign, graphDesign, designTools, interface, interior, motion, trheeD,
    entrepreneurship, interaction, management, sales, strategies, operations, projectManagement, commercialLaw,
    businessAnalysis, personnel, industry, electricCommerce, jurisprudence, immovability, personalChange,
    personalProductivity, leadership, parentingAndRelationships, happy, esotericPractices, confidence,
    digital, smmMarketing, marketingBasics, drawing, watercolorPainting, pencilDrawing, painting, sketching,
    drawingPerson, portraitArt, acrylicPainting, pottery, ielts, toefl, pmp, sit, ege, nct, ort, makeUp, beauties, skinCare,
    nailDesign, cosmetics, hairStyle, perfume, digitalPhotography, photography, photoVideoTools, mobilography,
    fitnessCourse, health, sport, diet, yoga, mentalHealth, dance, meditation, musicTools, musicalProduction, musicFundamentals,
    vocals, musicSoftware, mathematics, russianlanguage, kyrgyzlanguage, chemistry, biology, physics, story, economy,
    literatureOfTheRussianLanguage, literatureOfTheKyrgyzLanguage, english, geography, geometry] = await Subcategory.create({
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
  }, {
    category: programming,
    title: 'Тестирование программного обеспечения',
  }, {
    category: programming,
    title: 'Разработка без кода',
  }, {
    category: finance,
    title: 'Экономика. Финансы',
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
  }, {
    category: design,
    title: 'Дизайн пользовательского интерфейса',
  }, {
    category: design,
    title: 'Дизайн интерьеров',
  }, {
    category: design,
    title: 'Motion дизайн',
  }, {
    category: design,
    title: '3D',
  }, {
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
  }, {
    category: personalGrowth,
    title: 'Личная продуктивность',
  }, {
    category: personalGrowth,
    title: 'Лидерство',
  }, {
    category: personalGrowth,
    title: 'Воспитания и отношения',
  }, {
    category: personalGrowth,
    title: 'Счастье',
  }, {
    category: personalGrowth,
    title: 'Эзотерические практики',
  }, {
    category: personalGrowth,
    title: 'Самооценка и уверенность',
  }, {
    category: marketing,
    title: 'Интернет маркетинг',
  }, {
    category: marketing,
    title: 'SMM',
  }, {
    category: marketing,
    title: 'Основы маркетинга',
  }, {
    category: art,
    title: 'Рисование',
  }, {
    category: art,
    title: 'Акварельная живопись',
  }, {
    category: art,
    title: 'Карандашный рисунок',
  }, {
    category: art,
    title: 'Живопись',
  }, {
    category: art,
    title: 'Создание эскизов',
  }, {
    category: art,
    title: 'Рисование человека',
  }, {
    category: art,
    title: 'Портретное искусство',
  }, {
    category: art,
    title: 'Акриловая живопись',
  }, {
    category: art,
    title: 'Гончарное искусство',
  }, {
    category: exam,
    title: 'IELTS',
  }, {
    category: exam,
    title: 'TOEFL',
  }, {
    category: exam,
    title: 'PMP',
  }, {
    category: exam,
    title: 'SIT',
  }, {
    category: exam,
    title: 'ЕГЭ',
  }, {
    category: exam,
    title: 'НЦТ',
  }, {
    category: exam,
    title: 'ОРТ',
  }, {
    category: beauty,
    title: 'Визаж и макияж',
  }, {
    category: beauty,
    title: 'Красота',
  }, {
    category: beauty,
    title: 'Уход за кожей',
  }, {
    category: beauty,
    title: 'Дизайн маникюра',
  }, {
    category: beauty,
    title: 'Косметика',
  }, {
    category: beauty,
    title: 'Укладка волос',
  }, {
    category: beauty,
    title: 'Духи и парфюмерия',
  }, {
    category: photo,
    title: 'Цифровая фотография',
  }, {
    category: photo,
    title: 'Фотография',
  }, {
    category: photo,
    title: 'Инструменты для фотографии и видео',
  }, {
    category: photo,
    title: 'Мобилография',
  }, {
    category: fitness,
    title: 'Фитнесс',
  }, {
    category: fitness,
    title: 'Здоровье',
  }, {
    category: fitness,
    title: 'Спорт',
  }, {
    category: fitness,
    title: 'Питание и диета',
  }, {
    category: fitness,
    title: 'Йога',
  }, {
    category: fitness,
    title: 'Психическое здоровье',
  }, {
    category: fitness,
    title: 'Танцы',
  }, {
    category: fitness,
    title: 'Медитация',
  }, {
    category: music,
    title: 'Инструменты',
  }, {
    category: music,
    title: 'Музыкальное производство',
  }, {
    category: music,
    title: 'Основы музыки',
  }, {
    category: music,
    title: 'Вокал',
  }, {
    category: music,
    title: 'Музыкальное ПО',
  }, {
    category: schoolLessons,
    title: 'Математика',
  }, {
    category: schoolLessons,
    title: 'Русский язык',
  }, {
    category: schoolLessons,
    title: 'Кыргызский язык',
  }, {
    category: schoolLessons,
    title: 'Химия',
  }, {
    category: schoolLessons,
    title: 'Биология',
  }, {
    category: schoolLessons,
    title: 'Физика',
  }, {
    category: schoolLessons,
    title: 'История',
  }, {
    category: schoolLessons,
    title: 'Экономика. Школьные предметы',
  }, {
    category: schoolLessons,
    title: 'Литература русского языка',
  }, {
    category: schoolLessons,
    title: 'Литература кыргызкого языка',
  }, {
    category: schoolLessons,
    title: 'Английский язык',
  }, {
    category: schoolLessons,
    title: 'География',
  }, {
    category: schoolLessons,
    title: 'Геометрия',
  });

  const [java, cryptoRegency, javaScript, jScript, uxUi, tradingCourse, designIn, designBasic, ieltsCourse, ieltsSpeaking] = await Course.create({
    title: 'Java с нуля',
    description: 'веб-разработка',
    information: 'Курс по программированию на языке Java для учеников центров Легасофт и IT-CUBE города Смоленска 14 - 16 лет. Курс рассчитан для новичков в программировании. За 4 модуля вы обучитесь основам программирования,  напишите несколько проектов, работая в команде, и узнаете несколько технологий, которые используют профессиональные разработчики.',
    author: user2,
    subcategory: web,
    modules: [
      {
        title: 'JavaSpring introduction',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here',
            video: 'tDKF2KrFDF0',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: 'Zf8kizU6S1M',
          },
        ]
      },
      {
        title: 'JavaSpring main information',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'tDKF2KrFDF0',
          },
          {
            title: 'Main info full lesson 2',
            video: 'AM_WxaR6Spc',
          },
        ]
      }
    ],
    price: 1000,
    image: null,
    is_free: false,
    rate: 0.0,
    is_published: true
  }, {
    title: 'Продвинутая Java',
    description: 'Веб-разработка',
    information: 'Данный курс предназначен для тех, кто только начинает изучать Java. Мы начнем с самых азов: компиляция и запуск Java-программ, синтаксис языка, система типов, основы объектно-ориентированного программирования. Далее обсудим наиболее важные классы стандартной библиотеки, включая нововведения Java 8. Для закрепления знаний в курсе предусмотрены контрольные вопросы и практические задания.',
    author: user3,
    subcategory: web,
    modules: [
      {
        title: 'JavaSpring introduction',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here',
            video: 'iM445BnBhpw',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: '0Cdsk2BeNA8',
          },
        ]
      },
      {
        title: 'JavaSpring main information',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'FqcJt4_tKEw',
          },
          {
            title: 'Main info full lesson 2',
            video: '0L57GpJJK2I',
          },
        ]
      }
    ],
    price: 1000,
    image: null,
    is_free: false,
    rate: 0.0,
    is_published: true
  }, {
    title: 'Полное руководство по торговле криптовалютой для начинающих',
    description: 'Криптовалюты - это легко. Мой курс отвечает на самые основополагающие вопросы об устройстве и использовании криптовалют. Для вас он станет крепким фундаментом в понимании криптовалютного рынка.' +
      ' А так же поможет защититься от мошенников и повысит вашу финансовую грамотность.',
    information: 'Курс об эффективности не технических решений в кибербезопасности. Организации тратят огромные деньги на информационную безопасность своих систем, но преступники разбивают эту дорогую броню с помощью законов психологии. Эффективность существующих форм обучения сравнительно мала. Через месяц сотрудники совершают те же ошибки.',
    author: user,
    subcategory: cryptocurrency,
    modules: [
      {
        title: 'Базовые понятия о криптовалютах',
        lessons: [
          {
            title: 'Превью курса',
            description: 'Lesson 1 description here',
            video: 'EadeOYFAzJ4',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: 'F11biNXkcC4',
          },
        ]
      },
      {
        title: 'Создание криптовалютного портфеля',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'x6GSUrdTfDY',
          },
          {
            title: 'Main info full lesson 2',
            video: 'l1bK8sELZVI',
          },
        ]
      }
    ],
    price: 0,
    image: null,
    is_free: true,
    rate: 4.7,
    is_published: true
  }, {
    title: 'Java Script',
    description: 'В данном курсе рассмотрены основы программирования на JavaScript а также некоторые инструменты и модели данных, необходимые для практического использования JavaScript.',
    information: 'Цель данного курса - познакомить слушателей с основами программирования на JavaScript и подготовить их для практического применения данного инструмента.',
    author: user2,
    subcategory: web,
    modules: [
      {
        title: 'Java Script about info',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here',
            video: 'HuPK6AwgzJc',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: 'CxgOKJh4zWE',
          },
        ]
      },
      {
        title: 'Java Script main information',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'wdViO9OcQzs',
          },
          {
            title: 'Main info full lesson 2',
            video: 'Bluxbh9CaQ0',
          },
        ]
      }
    ],
    price: 0,
    image: null,
    is_free: true,
    rate: 4.7,
    is_published: true
  }, {
    title: 'Java Script с нуля',
    description: 'В данном курсе рассмотрены основы программирования на JavaScript а также некоторые инструменты и модели данных, необходимые для практического использования JavaScript.',
    information: 'Цель данного курса - познакомить слушателей с основами программирования на JavaScript и подготовить их для практического применения данного инструмента.',
    author: user,
    subcategory: web,
    modules: [
      {
        title: 'Java Script about info',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here',
            video: 'nyd2_NHpyek',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: 'rubOd5v9kxc',
          },
        ]
      },
      {
        title: 'Java Script main information',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'FX2fiUvrYP4',
          },
          {
            title: 'Main info full lesson 2',
            video: 'egZOlsEEJ7Q',
          },
        ]
      }
    ],
    price: 600,
    image: null,
    is_free: false,
    rate: 5,
    is_published: true
  }, {
    title: 'UX/UI',
    description: 'Веб-дизайн',
    information: 'UX/UI дизайн и аналитика – новые направления в области информационных технологий, которые ближе всего стоят к профессии веб-разработчик. Дизайнер интерфейсов проектирует взаимодействие пользователя с сайтом, приложением или каким-либо информационным сервисом и создает визуальные элементы, переходы, систему и прототип интуитивно понятного интерфейса. Данная профессия включает в себя постоянное взаимодействие со множеством инструментов для прототипирования, которые включают в себя такие программы, как Figma, InVision Studio, Sketch, Adobe Illustrator, Adobe After Effects, ColorHexa, Fontjoy и др',
    author: user,
    subcategory: webDesign,
    modules: [
      {
        title: 'UX DESIGN FOUNDATIONS',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here',
            video: 'mciwdFc2Ut8',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: 'RMbIoRXZhbA'
          },
        ]
      },
      {
        title: 'UX/UI main information',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'JJLvj1AnGkU',
          },
          {
            title: 'Main info full lesson 2',
            video: 'kEvV71dfFDk',
          },
        ]
      }
    ],
    price: 700,
    image: null,
    is_free: false,
    rate: 4.7,
    is_published: true
  }, {
    title: 'Трейдинг 2022',
    description: 'Трейдинг',
    information: 'Курс подготовлен профессиональными трейдерами — это значит, что мы зарабатываем с торговли на финансовых рынках. Все специалисты торгуют как на свои средства, так и на средства инвесторов.',
    author: user3,
    subcategory: trading,
    modules: [
      {
        title: 'Trading about info',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here',
            video: 'w0XqvluPP_w',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: 'k4tIm1yQsok'
          },
        ]
      },
      {
        title: 'Trading main information',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'Ms0RZ67KPTY',
          },
          {
            title: 'Main info full lesson 2',
            video: 'N_jRhRjcOYo',
          },
        ]
      }
    ],
    price: 0,
    image: null,
    is_free: true,
    rate: 5,
    is_published: true
  }, {
    title: 'Дизайн интерьера',
    description: 'Пошаговое руководство по созданию интерьера',
    information: 'Задачи и цели: Ознакомить учащихся с основными качествами интерьера, его особенностями; Воспитывать эстетический вкус на основе композиционного построения интерьера; Развивать самостоятельную деятельность при выполнении практической работы;',
    author: user2,
    subcategory: interior,
    modules: [
      {
        title: 'Теория',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here',
            video: 'gGZbfjr5GsY',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: 'kR-kxeq9nyA',
          },
        ]
      },
      {
        title: 'Практика',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'SHb4TELxeAo',
          },
          {
            title: 'Main info full lesson 2',
            video: '43yT1FIZ06c',
          },
        ]
      }
    ],
    price: 800,
    image: null,
    is_free: false,
    rate: 3.5,
    is_published: true
  }, {
    title: 'Основы дизайна интерьера',
    description: 'Узнайте как создать интерьер самостоятельно с любым бюджетом',
    information: 'Задачи и цели: Ознакомить учащихся с основными качествами интерьера, его особенностями; Воспитывать эстетический вкус на основе композиционного построения интерьера; Развивать самостоятельную деятельность при выполнении практической работы;',
    author: user,
    subcategory: interior,
    modules: [
      {
        title: 'Введение',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here',
            video: 'YnjPDKPaeIc',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: 'qp-IRNzmfsY',
          },
        ]
      },
      {
        title: 'Основы композиции',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'S21jy9zSDkA'
          },
          {
            title: 'Main info full lesson 2',
            video: '_Xpa-X3C3Ss'
          },
        ]
      },
      {
        title: 'Семь типов цветовых контрастов',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: '82eLiXmIHd8',
          },
          {
            title: 'Main info full lesson 2',
            video: 'JIxVZo899Jg',
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
    information: 'IELTS Academic Express is a self-paced course that provides with a quick yet effective overview of the IELTS Academic exams, each section, types of tasks and effective strategies.',
    author: user,
    subcategory: exam,
    modules: [
      {
        title: 'Введение',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here',
            video: 'T7iB9fdVHNM',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: '4cOl9QnQLZE',
          },
        ]
      },
      {
        title: 'Основы композиции',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'u10oO5WbqDE',
          },
          {
            title: 'Main info full lesson 2',
            video: 'T7iB9fdVHNM',
          },
        ]
      },
      {
        title: 'Семь типов цветовых контрастов',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'y1T43fQf55I',
          },
          {
            title: 'Main info full lesson 2',
            video: '3GDWXTBJpfc',
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
    information: 'IELTS Academic Express is a self-paced course that provides with a quick yet effective overview of the IELTS Academic exams, each section, types of tasks and effective strategies.',
    author: user,
    subcategory: exam,
    modules: [
      {
        title: 'Введение',
        lessons: [
          {
            title: 'Lesson 1',
            description: 'Lesson 1 description here',
            video: 'Zzo1UQdY5GY',
            comments: [
              {
                user: user,
                text: 'Отличный урок!',
              },{
                user: user2,
                text: 'Интересная тема!',
              },{
                user: user3,
                text: 'Если честно я не очень поняла...',
              },
            ]
          },
          {
            title: 'Lesson 2',
            video: 'c39vD7wycPc',
          },
        ]
      },
      {
        title: 'Основы композиции',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: '4udSGtJ6Bhg',
          },
          {
            title: 'Main info full lesson 2',
            video: 'vM2L8xBACao',
          },
        ]
      },
      {
        title: 'Семь типов цветовых контрастов',
        lessons: [
          {
            title: 'Main info full lesson 1',
            description: 'Full lesson 1 description here',
            video: 'lobOq-oiE0U',
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

  await Review.create(
    {
      user: user2,
      course: javaScript,
      text: 'Отличный курс',
      rate: 5
    },
    {
      user: user3,
      course: javaScript,
      text: 'Всем советую',
      rate: 4
    },
    {
      user: user4,
      course: javaScript,
      text: 'Зря время потерял',
      rate: 2
    },
    {
      user: user,
      course: jScript,
      text: 'Отличный курс',
      rate: 5
    },
    {
      user: user4,
      course: jScript,
      text: 'Всем советую',
      rate: 5
    },
    {
      user: user3,
      course: jScript,
      text: 'Зря время потерял',
      rate: 2
    }, {
      user: user2,
      course: designIn,
      text: 'Отличный курс',
      rate: 5
    }
  )

  await mongoose.connection.close();
};

run().catch(e => console.error(e));
