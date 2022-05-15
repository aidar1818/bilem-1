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
                        description: 'Spring Framework is a Java platform that provides comprehensive infrastructure support for developing Java applications. Spring handles the infrastructure so you can focus on your application.\n' +
                            '\n' +
                            'Spring enables you to build applications from “plain old Java objects” (POJOs) and to apply enterprise services non-invasively to POJOs. This capability applies to the Java SE programming model and to full and partial Java EE.\n' +
                            '\n' +
                            'Examples of how you, as an application developer, can use the Spring platform advantage:\n' +
                            '\n' +
                            'Make a Java method execute in a database transaction without having to deal with transaction APIs.\n' +
                            '\n' +
                            'Make a local Java method a remote procedure without having to deal with remote APIs.\n' +
                            '\n' +
                            'Make a local Java method a management operation without having to deal with JMX APIs.\n' +
                            '\n' +
                            'Make a local Java method a message handler without having to deal with JMS APIs.',
                        video: 'https://youtu.be/gq4S-ovWVlM',
                        image: 'javaSpring-introduction.png',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
                                user: user3,
                                text: 'Если честно я не очень поняла...',
                            },
                        ]
                    },
                    {
                        title: 'Modules',
                        description: 'The Spring Framework consists of features organized into about 20 modules. These modules are grouped into Core Container, Data Access/Integration, Web, AOP (Aspect Oriented Programming), Instrumentation, and Test, as shown in the following diagram.',
                        video: 'https://youtu.be/GB8k2-Egfv0',
                        image: 'javaSpring-introduction.png',
                    },
                ]
            },
            {
                title: 'JavaSpring main information',
                lessons: [
                    {
                        title: 'Usage scenarios',
                        description: 'The building blocks described previously make Spring a logical choice in many scenarios, from applets to full-fledged enterprise applications that use Spring\'s transaction management functionality and web framework integration.\n' +
                            '\n',
                        video: 'https://youtu.be/Z5gubdHLJIc',
                        image: 'spring-overview.png'
                    },
                    {
                        title: 'Main info full lesson 2',
                        description: 'Spring s declarative transaction management features make the web application fully transactional, just as it would be if you used EJB container-managed transactions. All your custom business logic can be implemented with simple POJOs and managed by Spring s IoC container. Additional services include support for sending email and validation that is independent of the web layer, which lets you choose where to execute validation rules. Spring s ORM support is integrated with JPA, Hibernate, JDO and iBatis; for example, when using Hibernate, you can continue to use your existing mapping files and standard Hibernate SessionFactory configuration. Form controllers seamlessly integrate the web-layer with the domain model, removing the need for ActionForms or other classes that transform HTTP parameters to values for your domain model.',
                        video: 'https://youtu.be/7c6ZTF6cF88',
                        image: 'overview-thirdparty-web.png'
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
                title: 'Java Spring introduction',
                lessons: [
                    {
                        title: 'Java Spring introduction',
                        description: 'Spring Framework is a Java platform that provides comprehensive infrastructure support for developing Java applications. Spring handles the infrastructure so you can focus on your application.\n' +
                            '\n' +
                            'Spring enables you to build applications from “plain old Java objects” (POJOs) and to apply enterprise services non-invasively to POJOs. This capability applies to the Java SE programming model and to full and partial Java EE.\n' +
                            '\n' +
                            'Examples of how you, as an application developer, can use the Spring platform advantage:\n' +
                            '\n' +
                            'Make a Java method execute in a database transaction without having to deal with transaction APIs.\n' +
                            '\n' +
                            'Make a local Java method a remote procedure without having to deal with remote APIs.\n' +
                            '\n' +
                            'Make a local Java method a management operation without having to deal with JMX APIs.\n' +
                            '\n' +
                            'Make a local Java method a message handler without having to deal with JMS APIs.',
                        video: 'https://youtu.be/gq4S-ovWVlM',
                        image: 'javaSpring-introduction.png',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
                                user: user3,
                                text: 'Если честно я не очень поняла...',
                            },
                        ]
                    },
                    {
                        title: 'Modules',
                        description: 'The Spring Framework consists of features organized into about 20 modules. These modules are grouped into Core Container, Data Access/Integration, Web, AOP (Aspect Oriented Programming), Instrumentation, and Test, as shown in the following diagram.',
                        video: 'https://youtu.be/GB8k2-Egfv0',
                        image: 'javaSpring-introduction.png',
                    },
                ]
            },
            {
                title: 'JavaSpring main information',
                lessons: [
                    {
                        title: 'Usage scenarios',
                        description: 'The building blocks described previously make Spring a logical choice in many scenarios, from applets to full-fledged enterprise applications that use Spring\'s transaction management functionality and web framework integration.\n' +
                            '\n',
                        video: 'https://youtu.be/Z5gubdHLJIc',
                        image: 'spring-overview.png'
                    },
                    {
                        title: 'Main info full lesson 2',
                        description: 'Spring s declarative transaction management features make the web application fully transactional, just as it would be if you used EJB container-managed transactions. All your custom business logic can be implemented with simple POJOs and managed by Spring s IoC container. Additional services include support for sending email and validation that is independent of the web layer, which lets you choose where to execute validation rules. Spring s ORM support is integrated with JPA, Hibernate, JDO and iBatis; for example, when using Hibernate, you can continue to use your existing mapping files and standard Hibernate SessionFactory configuration. Form controllers seamlessly integrate the web-layer with the domain model, removing the need for ActionForms or other classes that transform HTTP parameters to values for your domain model.',
                        video: 'https://youtu.be/7c6ZTF6cF88',
                        image: 'overview-thirdparty-web.png'
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
                        title: 'Основные понятия криптовалют',
                        description: 'Криптовалюта — это любой вид валюты в цифровой или виртуальной форме, а это означает, что ее не существует в физическом мире. Все цифровые деньги "живут" только в сетевом пространстве. Важно отметить, что они ничем не обеспечены. Майнить ("добывать") криптовалюту может любой желающий, но следует знать, что есть ограничения на добычу криптовалюты, поэтому стоимость криптовалюты зачастую растет с течением времени.',
                        video: 'https://www.banknn.ru/zhurnal/stati/chto-takoe-kriptovalyuta-prostymi-slovami',
                        image: '2.jpg',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
                                user: user3,
                                text: 'Если честно я не очень поняла...',
                            },
                        ]
                    },
                    {
                        title: 'Золотой стандарт',
                        description: 'Отвечая в первый раз на вопрос, что такое криптовалюта и как ей пользоваться, лучше всего присмотреться к биткоину. Биткоин — это золотой стандарт и первая монета рынка криптовалют. Биржевое обозначение биткоина – BTC. С английского это слово примерно переводится как монета величиной с один бит или минимальная монетка.',
                        video: 'https://www.youtube.com/watch?v=sq7yGozBreo',
                        image: 'bitcoin.jpeg',
                    },
                ]
            },
            {
                title: 'Создание криптовалютного портфеля',
                lessons: [
                    {
                        title: 'Что такое криптовалютный портфель?',
                        description: 'Криптовалютный портфель — комплексное объединение разнообразных криптовалютных активов инвестора в правильной пропорции. Ключевая задача криптовалютного портфеля: обеспечить минимальную рисковость и максимальный доход для инвестора.\n' +
                            '\n' +
                            'В отличие от инвестиционного портфеля фондового рынка, диверсификация рисков в данном случае осуществляется не при помощи инвестирования в различные активы, а приобретением одного актива — криптовалюты – в разных токенах.',
                        video: 'https://www.youtube.com/watch?v=agKU6V9k6-M',
                        image: 'portfel4.jpg',
                    },
                    {
                        title: 'Как собрать портфель криптовалют?',
                        description: 'Основным принципом правильного распределения активов в инвестиционном портфеле является разнообразие активов. Криптовалютный портфель должен содержать все инструменты для заработка и снижения риска в правильных пропорциях. Большая часть его составляющих должна состоять из популярных криптовалют со стабильным ростом и востребованностью среди пользователей. Опытными инвесторами разработано несколько оптимальных стратегий формирования криптовалютного портфеля.',
                        video: 'https://youtu.be/c4AhTOkALDQ',
                        image: 'portfel3.jpg'
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
                title: 'Что такое JavaScript?',
                lessons: [
                    {
                        title: 'Что JavaScript делает на вашей странице?',
                        description: 'Код JavaScript выполняется JavaScript-движком браузера, после того как код HTML и CSS был обработан и сформирован в веб-страницу. Это гарантирует, что структура и стиль страницы уже сформированы к моменту запуска JavaScript.\n' +
                            '\n' +
                            'Это хорошо, так как часто использование JavaScript заключается в динамическом изменении HTML и CSS в целях обновления пользовательского интерфейса посредством Document Object Model API (как упоминалось выше). Если бы запуск JavaScript осуществлялся прежде загрузки HTML и CSS, то это привело бы к возникновению ошибок.  ',
                        video: 'HuPK6AwgzJc',
                        image: 'javascript.jpeg',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
                                user: user3,
                                text: 'Если честно я не очень поняла...',
                            },
                        ]
                    },
                    {
                        title: 'Безопасность браузера',
                        description: 'Каждая вкладка браузера представляет собой отдельную коробку для запуска кода (в техническом языке, эти коробки называются "средами исполнения") — это значит, что в большинстве случаев код на каждой вкладке запускается полностью отдельно, а код одной вкладки не может напрямую влиять на код другой вкладки или на другом веб-сайте. Это хорошая мера безопасности — если бы это было иначе, пираты могли написать код, который крал информацию с других сайтов или делал другие плохие вещи.',
                        video: 'https://www.youtube.com/watch?v=y36BHRMRPo8',
                    },
                ]
            },
            {
                title: 'Где применяется JavaScript',
                lessons: [
                    {
                        title: 'Клиентская часть веб—приложений (frontend). ',
                        description: 'Это интерфейс страницы, то есть всё, что видит пользователь: контент, кнопки, формы обратной связи, меню. С помощью JS интерфейс реагирует на действия пользователя (клики мыши, нажатия клавиш), также язык отвечает за запоминание данных и автозаполнение форм.',
                        video: 'https://www.youtube.com/watch?v=9mZmc6a0tmM',
                        image: '1590690600-front-end-back-end-1080x608.png'
                    },
                    {
                        title: 'Серверная часть веб—приложений (backend).',
                        description: 'Серверный код пишут на платформе Node.js. На JS работают, например, запросы AJAX (asynchronous javascript and XML), которые отправляются на сервер в фоновом режиме, без перезагрузки веб-страницы, и push-уведомления — всплывающие сообщения в браузере, которые реализуются с помощью технологии Comet. Такие уведомления приходят со специального Comet-сервера, который постоянно поддерживает соединение с браузером. Как раз с помощью JavaScript устанавливается это соединение.',
                        video: 'https://www.youtube.com/watch?v=m4tn1r44oeE',
                        image: '1590690600-front-end-back-end-1080x608.png'
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
                title: 'Что такое JavaScript?',
                lessons: [
                    {
                        title: 'Что JavaScript делает на вашей странице?',
                        description: 'Код JavaScript выполняется JavaScript-движком браузера, после того как код HTML и CSS был обработан и сформирован в веб-страницу. Это гарантирует, что структура и стиль страницы уже сформированы к моменту запуска JavaScript.\n' +
                            '\n' +
                            'Это хорошо, так как часто использование JavaScript заключается в динамическом изменении HTML и CSS в целях обновления пользовательского интерфейса посредством Document Object Model API (как упоминалось выше). Если бы запуск JavaScript осуществлялся прежде загрузки HTML и CSS, то это привело бы к возникновению ошибок.  ',
                        video: 'HuPK6AwgzJc',
                        image: 'javascript.jpeg',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
                                user: user3,
                                text: 'Если честно я не очень поняла...',
                            },
                        ]
                    },
                    {
                        title: 'Безопасность браузера',
                        description: 'Каждая вкладка браузера представляет собой отдельную коробку для запуска кода (в техническом языке, эти коробки называются "средами исполнения") — это значит, что в большинстве случаев код на каждой вкладке запускается полностью отдельно, а код одной вкладки не может напрямую влиять на код другой вкладки или на другом веб-сайте. Это хорошая мера безопасности — если бы это было иначе, пираты могли написать код, который крал информацию с других сайтов или делал другие плохие вещи.',
                        video: 'https://www.youtube.com/watch?v=y36BHRMRPo8',
                    },
                ]
            },
            {
                title: 'Где применяется JavaScript',
                lessons: [
                    {
                        title: 'Мобильные приложения на Android, iOS, Windows Mobile',
                        description: 'когда нужно кросс-платформенное приложение или адаптация веб-приложения, а языков Kotlin (для Android) и Swift (для iOS) недостаточно, то используется JavaScript.',
                        video: 'https://www.youtube.com/watch?v=9mZmc6a0tmM',
                        image: '1590690600-front-end-back-end-1080x608.png'
                    },
                    {
                        title: 'Серверная часть веб—приложений (backend).',
                        description: 'Серверный код пишут на платформе Node.js. На JS работают, например, запросы AJAX (asynchronous javascript and XML), которые отправляются на сервер в фоновом режиме, без перезагрузки веб-страницы, и push-уведомления — всплывающие сообщения в браузере, которые реализуются с помощью технологии Comet. Такие уведомления приходят со специального Comet-сервера, который постоянно поддерживает соединение с браузером. Как раз с помощью JavaScript устанавливается это соединение.',
                        video: 'https://www.youtube.com/watch?v=m4tn1r44oeE',
                        image: '1590690600-front-end-back-end-1080x608.png'
                    },
                ]
            },
            {
                title: 'Как работает JavaScript в браузере',
                lessons: [
                    {
                        title: 'Алгоритм',
                        description: 'Действия пользователя на странице вызывают события: клик на кнопке запускает анимацию, захват мышкой и перемещение курсора двигают объект по странице. Каждое из этих действий выполняется с помощью скриптов, написанных на JavaScript. У них есть определенный алгоритм работы.',
                        video: 'https://www.youtube.com/watch?v=OC7NA44S7bQ',
                    },
                    {
                        title: 'Контекст выполнения',
                        description: 'Было бы круто, чтобы вы запомнили эту фразу, потому что она очень важна. Скажем, что этот контекст выполнения является большим контейнером, вызываемым, когда браузер хочет запустить какой-то код JavaScript.\n' +
                            '\n' +
                            'В этом контейнере есть два компонента: 1. Компонент памяти. 2. Компонент кода.\n' +
                            '\n' +
                            'Компонент памяти также известен как переменная среды. В этом компоненте памяти переменные и функции хранятся в виде пар ключ-значение.\n' +
                            '\n' +
                            'Компонент кода - это место в контейнере, где код выполняется по одной строке за раз. У этого компонента кода тоже есть необычное название, а именно «Поток выполнения» (Thread of Execution).',
                        video: 'https://www.youtube.com/watch?v=OC7NA44S7bQ',
                        image: 'jsWork.png'
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
                        title: 'Что такое UX/UI, прямым текстом',
                        description: 'UX — это User Experience (дословно: «опыт пользователя»). То есть это то, какой опыт/впечатление получает пользователь от работы с вашим интерфейсом. Удается ли ему достичь цели и на сколько просто или сложно это сделать.\n' +
                            '\n' +
                            'А UI — это User Interface (дословно «пользовательский интерфейс») — то, как выглядит интерфейс и то, какие физические характеристики приобретает. Определяет, какого цвета будет ваше «изделие», удобно ли будет человеку попадать пальцем в кнопочки, читабельным ли будет текст и тому подобное…\n' +
                            '\n' +
                            'UX/UI дизайн — это проектирование любых пользовательских интерфейсов в которых удобство использования так же важно как и внешний вид.',
                        video: 'https://www.youtube.com/watch?v=MSnt9cznhTc',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
                                user: user3,
                                text: 'Если честно я не очень поняла...',
                            },
                        ]
                    },
                    {
                        title: 'Что такое UX и UI дизайн, другими словами',
                        description: 'UX/UI дизайн не относится только к смартфонам и веб-сайтам. Более того, профессия UX/UI дизайнера существовала с незапамятных времен. Просто раньше она так не называлась. Точнее, раньше она вообще никак не называлась, а была частью других профессий. Вот первый пример: когда Вильгельм Шиккард в 1623 году изобретал арифмометр, он уже был UX/UI дизайнером.',
                        video: 'https://www.youtube.com/watch?v=mciwdFc2Ut8',
                        image: 'ux.jpg',
                    },
                ]
            },
            {
                title: 'UX/UI main information',
                lessons: [
                    {
                        title: 'Где используют UX и UI в Digital',
                        description: 'User Experience и User Interface стали главными инструментами работы над интерфейсами сайтов, сервисов, мобильных приложений в конце 2000-х годов, когда стало ясно, что базовыми характеристиками любого цифрового продукта должны быть функциональность и удобство.\n' +
                            '\n' +
                            'Чтобы понять, чем отличается UX от UI, достаточно представить весь процесс работы над дизайном digital продукта. UI — один из этапов, всего лишь инструмент, помогающий визуально оформить идеи UX дизайнера. Часто эти две специализации объединяют, а UX специалист обладает навыками UI дизайна. Но это условие вовсе не обязательно. Для юзабилити одинаково важны и пользовательский опыт, и пользовательский интерфейс, отличие UX от UI здесь не играет роли.',
                        video: 'https://www.youtube.com/watch?v=0bvcjQTWkAo',
                    },
                    {
                        title: 'Как стать UX и UI дизайнером',
                        description: 'Со времен появления тренда на UX/UI профессия дизайнера ощутимо усложнилась. Теперь уже мало уметь рисовать макеты и гармонично сочетать цвета. Обычно дизайном User Experience занимается целая команда, т.к. одному человеку не под силу охватить все процессы.\n' +
                            '\n' +
                            'Как стать UX/UI дизайнером? В первую очередь нужно решить, по какому пути идти. Нравится наводить красоту, визуализировать идеи? Значит, ваша область — UI. Многие начинают с визуализаций и, постепенно расширяя круг своих интересов, приходят к полноценному проектированию UX',
                        video: 'https://www.youtube.com/watch?v=RMbIoRXZhbA',
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
                title: 'Что такое трейдинг?',
                lessons: [
                    {
                        title: 'Трейдинг — путь к финансовой независимости',
                        description: 'Вы задумывались когда-нибудь, как выглядит профессия мечты? Например, она должна быть интересной, с гибким графиком работы, без привязки к месту и отсутствием начальника. А еще с заработной платой выше средней по Украине. Этими преимуществами обладает трейдинг.  \n' +
                            '\n' +
                            '\n' +
                            '\n' +
                            'Трейдеру не нужно выслуживаться перед боссом: писать длинные отчеты, пускать пыль в глаза. Эффективность работы видна и без саморекламы — это его доход в цифрах, поэтому субъективное мнение исключается. Вас не обойдут коллеги со связями или те, кто умеет показать себя в лучшем свете. Такая работа учит держать себя в руках, не ломаться от неудач и не расслабляться после успехов. ',
                        video: 'https://www.youtube.com/watch?v=9-z2o_TywCg',
                        image: 'traid.jpeg',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
                                user: user3,
                                text: 'Если честно я не очень поняла...',
                            },
                        ]
                    },
                    {
                        title: 'Интернет-трейдинг — высокоскоростная торговля',
                        description: '26 марта 2009 года в Украине появился интернет-трейдинг на рынке ценных бумаг. В этот день «Украинская биржа» открыла первые онлайн-торги. Такой способ отличался от классической схемы заключения сделок по телефону или от работы в яме на бирже. ',
                        video: 'https://www.youtube.com/watch?v=tsVgMrEiFRw'
                    },
                ]
            },
            {
                title: 'Виды трейдинга',
                lessons: [
                    {
                        title: 'Скальпинг.',
                        description: ' Стратегия подразумевает закрытие сделки, как только достигнута прибыль в несколько пунктов. Время на операцию — несколько секунд или минут. Увеличение дохода наблюдается за счет большого количества заявок — около 100 в день. Подходит выносливым трейдерам с быстрой реакцией и способностью работать под большим напряжением. Обратите внимание, что за каждую операцию берется комиссия. А чем их больше, тем больше расходы',
                        video: 'https://www.youtube.com/watch?v=2Ev8l0xcdEE',
                    },
                    {
                        title: 'Активный интрадей',
                        description: ' До десятка заявок в течение дня. Специалист работает по 3-х и 5-минутным графикам. Прибыль от сделки — 2-6%. Важно отслеживать риски и вовремя закрывать позиции. Эксперт должен быть дисциплинированным, уметь работать с графиками, вести статистику, анализировать и отслеживать изменения на протяжении дня. А также уметь остановиться, чтобы не потерять дневной заработок',
                        video: 'https://www.youtube.com/watch?v=rSJYLZKhMd0',
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
                title: 'Пошаговая инструкция по созданию функционального интерьера квартиры',
                lessons: [
                    {
                        title: 'Функциональный дизайн – это как?',
                        description: 'Функциональный дизайн – это такой вид дизайна, который объединяет внешнюю красоту и удобство использования квартиры по назначению – для того, чтобы в ней ЖИТЬ. На первый взгляд звучит достаточно просто и очевидно? На деле не так. Сколько же мы видели примеров интерьеров, которые были построены по модели “так будет красиво” или “я – дизайнер, я так вижу…”. Последний вариант, кстати, достаточно актуален, особенно для начинающих дизайнеров. Многие думают, что чем сложнее для восприятия интерьер я создам, тем я буду “дизайнеристее”, а потом такую работу можно еще и на тематические сайты и форумы отправить, где все дизайнеры однозначно поставят “лайк”',
                        video: 'https://www.youtube.com/watch?v=jfHUzASld3c',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
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
                title: 'С чего начать проектировать функциональный дизайн интерьера? ',
                lessons: [
                    {
                        title: 'Этап 1. Анализ потребностей жителей квартиры',
                        description: 'Удобный для жизни интерьер квартиры начинается с анализа потребностей жильцов дома. Кто обитает в квартире чаще всего? Что делают ее жители? Какие функциональные зоны в квартире им нужны?\n' +
                            '\n' +
                            'Пошаговая инструкция по созданию функционального интерьера квартирыМы создали небольшой чек-лист, который мы используем в диалоге с клиентом для того, чтобы определить какой тип дизайна стоит использовать в конкретном случае. Он состоит из наводящих вопросов, мы представим несколько из них:' +
                            'Часто ли вы собираете гостей у себя дома? Много ли их обычно бывает?\n' +
                            'Любите ли вы готовить?\n' +
                            'Занимаетесь ли вы дома спортом?\n' +
                            'Как обычно вы проводите досуг?',

                    },
                    {
                        title: 'Этап 2. Разработка планировочного решения',
                        description: 'Это следующий шаг разработки дизайн-проекта интерьера квартиры, который даст нам представление о том что и как будет стоять в квартире: мебель, перегородки, зонирование пространства. На данном этапе важно соотнести первый шаг и промежуточные итоги шага текущего, чтобы совпадало назначение квартиры и ее зон и желания клиента. Планировочное решение должно полностью соответствовать потребностям жителей квартиры. Только так получится действительно функциональный интерьер.\n' +
                            '\n' +
                            'Планировочное решение должно содержать сведения о:\n' +
                            '\n' +
                            'Расположении стеновых перегородок (в том числе данные о возведении и демонтаже);\n' +
                            'Расположение оконных и дверных проемов;\n' +
                            'Расположение мебели.',
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
                        title: 'Единство и гармония',
                        description: 'Создавая интерьер, нужно думать о доме как о едином целом пространстве, состоящим из отдельных помещений, связанных между собой   залами и лестницами. Поэтому естественно то, что общий стиль и идея распространяются на весь дом. Это не означает, что все элементы   дизайна интерьера должны быть одинаковыми. Они должны сочетаться и дополнять друг друга для художественного усиления всей композиции.',
                        video: 'https://www.youtube.com/watch?v=jOXPHR9Mpek',
                        image: 'интерьер.jpeg',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
                                user: user3,
                                text: 'Если честно я не очень поняла...',
                            },
                        ]
                    },
                    {
                        title: 'Фокусная точка',
                        description: 'Злейший враг дизайна интерьера – это скука.\n' +
                            '\n' +
                            '    Верно спроектированная комната, в зависимости от ее размера, всегда имеет один или несколько фокусов. Фокус должен быть   доминирующим, привлекая внимание и пробуждая интерес зрителя. Таким образом, фокус должен производить неизгладимое впечатление и должен стать неотъемлемой частью декора, связанной стилем, цветом, масштабом или темой. Камин или плоский телевизор - это   первое, что приходит на ум большинству людей, когда мы говорим о фокусе комнаты.\n' +
                            '\n' +
                            '    Если в вашем пространстве отсутствует естественный фокус, например камин, всегда есть возможность его создать, акцентируя внимание на конкретном предмете мебели, произведении искусства или на контрастном цветовом пятне в одной зоне. При этом старайтесь сохранять   равновесие, чтобы фокус не отвлекал на себя все внимание.',
                        image: 'hai.jpeg',
                    },
                ]
            },
            {
                title: 'Основы композиции',
                lessons: [
                    {
                        title: 'Повторение',
                        description: 'Повторение - это использование одного и того же элемента в пространстве более одного раза. Вы можете повторить рисунок, цвет, текстуру, линию или любой другой элемент, или даже нескольких элементов.',
                        video: 'https://www.youtube.com/watch?v=pzWAmmdWceA',
                        image: 'pravila-dizaina-3-2.jpg',
                    },
                    {
                        title: 'Прогрессия ',
                        description: ' Прогрессия - это увеличение или уменьшение одного или нескольких качеств элемента. Наиболее очевидной реализацией этого приема -это градация элемента по размеру. Даже размещение нескольких свечей разных размеров на обычном подносе гарантировано   вызывает интерес своей естественной прогрессией. Прогрессии можно добиться и с помощью цвета. Например, в монохроматической   цветовой схеме, где каждый элемент слегка отличается от другого оттенком одного и того же цвета.',
                        video: 'https://www.youtube.com/watch?v=rK_IM8LhL_4',
                        image: 'progressi.jpeg',
                    },
                ]
            },
            {
                title: 'Баланс',
                lessons: [
                    {
                        title: 'Симметричный баланс',
                        description: 'как правило, встречается в типичных традиционных интерьерах. Он определяется наличием одних и тех же   предметов, повторяющихся в одинаковых позициях по обе стороны от вертикальной оси. Например, вы можете наблюдать в интерьерах   старых домов, где одна половина комнаты с точностью, зеркально отображается на другой половине. Симметрия в интерьере создает чувства   спокойствия и порядка. Этот вид баланса напоминает подобие строения человеческого тела, поэтому мы и чувствуем себя комфортно в такой   сбалансированной среде.',
                        video: 'https://www.youtube.com/watch?v=TxuATPq6XTE',
                    },
                    {
                        title: 'Асимметричный баланс ',
                        description: 'широко используется в современной практике. Он достигается с помощью разнородных предметов, имеющих   одинаковый визуальный вес или привлекательность. Асимметричный баланс является более беспорядочным и менее надуманным, но гораздо более трудоемким для достижения гармонии. Асимметрия предполагает наличие движения и поэтому интерьер выглядит более динамичным .',
                        video: 'https://www.youtube.com/watch?v=avMmJALHBhw',
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
                title: 'Виды IELTS: ',
                lessons: [
                    {
                        title: 'General',
                        description: 'Но, прежде чем выбрать, лучше уточнить, какой модуль нужен именно для этого учебного заведения или компании. Иногда организации, предлагающие работу, просят тест на Academic. А для обучения, связанного с работой, вдруг необходим модуль General.\n' +
                            '\n' +
                            'Оба модуля одинаковы по наполнению. Состоят из четырех частей: Listening (аудирование), Reading (чтение), Writing (письмо) и Speaking (разговорная речь).',
                        video: 'https://www.youtube.com/watch?v=q1gb0H_2tKg',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
                                user: user3,
                                text: 'Если честно я не очень поняла...',
                            },
                        ]
                    },
                    {
                        title: 'Academic',
                        description: 'Обычно IELTS General требуют, если человек собирается устраиваться на работу, иммигрировать или получать среднее образование. IELTS Academic же необходим будущим студентам иностранных вузов.',
                        video: 'https://www.youtube.com/watch?v=9KijVQDFyi0',
                    },
                ]
            },
            {
                title: 'Из чего состоит экзамен?',
                lessons: [
                    {
                        title: 'Writing',
                        description: 'Writing для IELTS Academic труднее, чем для IELTS General. Описывать нужно графики, таблицы, карты, процессы, а также создать эссе академического характера.\n' +
                            '\n' +
                            'У IELTS General темы простые – написать письмо другу и эссе о своей квартире, например.',
                        video: 'https://www.youtube.com/watch?v=CK_PE9ILJjQ',
                    },
                    {
                        title: 'Reading',
                        description: 'То же самое касается и Reading. Сдающие тест на IELTS Academic, читают длинные научно-популярные тексты, состоящие из сложнейших слов и терминов.\n' +
                            '\n' +
                            'Чтение же в IELTS General – это проверка, насколько вы понимаете тексты на общие темы. Потребуется прочитать, к примеру, журнальную статью, рекламное объявление, рассказ о животных',
                        video: 'https://www.youtube.com/watch?v=NUIU22KcJ4Q',
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
                        title: 'Speaking',
                        description: 'Разговорная часть занимает на тесте всего 10-15 минут. По сути, это просто беседа с экзаменатором, состоящая из трех этапов: разговор о хобби и интересах, подготовка речи на заданную тему и ответы на дополнительные вопросы.',
                        video: 'https://www.youtube.com/watch?v=MU8xhYgHT0U',
                        comments: [
                            {
                                user: user,
                                text: 'Отличный урок!',
                            }, {
                                user: user2,
                                text: 'Интересная тема!',
                            }, {
                                user: user3,
                                text: 'Если честно я не очень поняла...',
                            },
                        ]
                    },
                    {
                        title: 'Сколько надо времени чтобы подготовиться к IELTS',
                        description: 'На то, сколько времени занимает подготовка к IELTS, влияет уровень владения английским языком. Плюс многое зависит от того, какой балл вы планируете получить на экзамене и сколько времени готовы пожертвовать на подготовку. У кого-то уйдут годы, а кому-то достаточно нескольких месяцев.\n' +
                            '\n' +
                            'У каждого репетитора и каждой языковой школы имеется своя статистика. Для примера возьмем онлайн-школу EnglishDen.',
                        video: 'https://www.youtube.com/watch?v=YdMrkcpPGq4',
                    },
                ]
            },
            {
                title: 'Особенности подготовки к Speaking',
                lessons: [
                    {
                        title: 'Улучшайте слух',
                        description: 'Слушайте английскую речь и повторяйте каждое предложение за спикером. Это улучшит акцент, поможет выработать нужный темп и ритм речи.',
                        video: 'https://www.youtube.com/watch?v=5DjHMLyRm7g',
                    },
                    {
                        title: 'Окружите себя английским',
                        description: 'Найдите людей, с которыми будете разговаривать – шерстите тематические форумы и регистрируйтесь на сайтах знакомств. Главное, чтобы собеседник был носителем языка.',
                        video: 'https://www.youtube.com/watch?v=TneqhthYz_w',
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
