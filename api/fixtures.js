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

    const [user, user2, user3, user4, admin, user5, user6, user7, user8, user9, user10, user11, user12, user13, user14, user15, user16, user17, user18, user19, user20] = await User.create(
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
        {
            email: 'user5@bilem.com',
            password: '123asdA!',
            displayName: 'Bill Murray',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Родился в Эванстоне, штат Иллинойс, 21 сентября 1950 года[1]. Он был пятым из девяти детей в семье ирландских католиков.\n' +
                '\n' +
                'Родители-ирландцы отправили детей в иезуитскую школу, однако учёба Мюррея практически не занимала. Он рисовал карикатуры на учителей и играл в школьном театре..\n' +
                '\n' +
                'Билл Мюррей практически не бывал на занятиях, баловался марихуаной и нередко ночевал в полицейском участке. Однажды в Денверском аэропорту, когда он решил пошутить и заявил, что в его багаже спрятана бомба, охрана поспешила обыскать Мюррея, но вместо бомбы обнаружила марихуану..\n +' +
                '\n' +
                'Вскоре Мюррею предложили войти в основную труппу шоу «Субботним вечером в прямом эфире». Эта передача завоевала такую популярность, что Мюррея пригласили в Голливуд. Первым успехом актёра стала роль второго плана в известной комедии «Тутси».',
        },
        {
            email: 'user6@bilem.com',
            password: '123asdA!',
            displayName: 'Fernando Torres',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Испанский футболист, дебютировавший в 2003 году в матче против сборной Португалии.\n' +
                '\n' +
                'Он более 100 раз выходил на поле в составе сборной Испании и является третьим лучшим бомбардиром своей страны за всё время.\n' +
                '\n' +
                'В составе сборной Испании он участвовал в шести крупных турнирах: Евро-2004, чемпионат мира 2006 года, Евро-2008, чемпионат мира 2010 года, Евро-2012 и чемпионат мира 2014 года.\n +' +
                '\n' +
                'Испания выиграла три турнира с 2008 по 2012 год, причём Торрес забивал в финалах Евро-2008 и Евро-2012. Он забил победный гол на чемпионате Европы 2008 года и получил «Золотую бутсу» как лучший бомбардир в 2012 году.',
        },
        {
            email: 'user7@bilem.com',
            password: '123asdA!',
            displayName: 'Glen Cook',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Глен Кук родился в Нью-Йорке, вырос в Калифорнии. Ещё в начальной школе Глен Кук начал писать; в средней школе он уже писал отдельные статьи для школьной газеты.\n' +
                '\n' +
                'После окончания средней школы служил в Военно-Морском Флоте США (в ударном подразделении 3-го батальона морской пехоты).\n' +
                '\n' +
                'В это же время Кук решил попробовать себя на литературном поприще. В 1970 году он прослушал курс Кларионовского семинара. В том же году вышел его первый роман «Болотная академия» (под псевдонимом Грег Стивенс).\n +' +
                '\n' +
                'Всё это время Кук продолжал работать на заводе. По словам автора, работа его была слишком простой и оставляла много свободного времени для творчества.',
        },
        {
            email: 'user8@bilem.com',
            password: '123asdA!',
            displayName: 'Bill Hader',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Американский актёр, комик, сценарист, продюсер и режиссёр. Лауреат трёх премий «Эмми».\n' +
                '\n' +
                'Добился известности благодаря работе над варьете-шоу «Saturday Night Live», принёсшей ему две номинации на премию «Эмми», а также награду Пибоди.',
        },
        {
            email: 'user9@bilem.com',
            password: '123asdA!',
            displayName: 'Владимир Путин',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Российский государственный, политический и военный деятель.\n' +
                '\n' +
                'Действующий президент Российской Федерации, председатель Государственного Совета Российской Федерации и верховный главнокомандующий Вооружёнными силами Российской Федерации с 7 мая 2012 года.\n' +
                '\n' +
                'Ранее занимал должность президента с 7 мая 2000 года по 7 мая 2008 года, также в 1999—2000 и 2008—2012 годах занимал должность председателя правительства Российской Федерации.\n +' +
                '\n' +
                'Первым лицом государства стал 31 декабря 1999 года, когда после отставки президента России Бориса Ельцина был назначен исполняющим обязанности президента. Впервые избран президентом России 26 марта 2000 года, а затем переизбирался в 2004, 2012 и 2018 годах. Перед выборами 2012 года срок президентских полномочий был увеличен с 4 до 6 лет. После принятия поправок к Конституции Российской Федерации получил право выставлять свою кандидатуру и на президентских выборах в 2024 году.',
        },
        {
            email: 'user10@bilem.com',
            password: '123asdA!',
            displayName: 'Двинятин Фёдор',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Российский филолог-русист.\n' +
                '\n' +
                'В период с 1986 по 1991 год учился на филологическом факультете Ленинградского государственного университета (ЛГУ, ныне СПбГУ) и получил диплом по специальности «филолог-русист». На кафедре русского языка того же университета прошёл аспирантуру и защитил в 1996 году кандидатскую диссертацию по теме «Лингвопоэтический анализ Торжественных слов св. Кирилла Туровского».\n' +
                '\n' +
                'Эксперт книжного проекта «Полка» (2018). Лектор проекта Storytel (2018). В 2018—2021 годах председатель Методической комиссии Всероссийской олимпиады студентов «Я — профессионал!» по направлению «Филология», лектор Зимней филологической школы (2019), Зимней социогуманитарной школы (2020) и Социогуманитарного форума (2021) СПбГУ.\n +' +
                '\n' +
                'Ведущий культурологической программы «Кругозор» на «Радио России».',
        },
        {
            email: 'user11@bilem.com',
            password: '123asdA!',
            displayName: 'Ковальчук Никита',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Российский телеведущий, видеоблогер, тренер-аналитик и главный тренер латвийской женской команды «Метта».\n' +
                '\n' +
                'Работал спортивным комментатором телеканалов «Россия-2» и «Спорт-1», ведущим программы «Картавый футбол 2.0». Создатель и ведущий YouTube-канала «Картавый футбол». Известен также под псевдонимом Картавый Ник.\n' +
                '\n' +
                'По собственным воспоминаниям, первый раз попал в телевизор в начале 2000-х годов, участвуя в одном из выпусков еженедельного музыкального хит-парада «Золотой граммофон» с Андреем Малаховым на «Первом канале».\n +' +
                '\n' +
                'После закрытия «России-2» перешёл на телеканал «360° Подмосковье», где стал ведущим программы «Самое Яркое». Работал в travel-сегменте, делал цикл программ на тему путешествий.',
        },
        {
            email: 'user12@bilem.com',
            password: '123asdA!',
            displayName: 'Allen Iverson',
            token: nanoid(),
            role: 'user',
            aboutMe: 'The 2004–2005 season saw Iverson and the Sixers bounce back under the tutelage of new head coach Jim O\'Brien, and additions of their first round draft pick Andre Iguodala, and All-Star forward Chris Webber, who was acquired in a mid-season trade.\n' +
                '\n' +
                'On February 12, 2005, Iverson scored a career-high 60 points on 24-for-27 shooting from the free throw line to go along with 6 assists and 5 steals in a 112–99 win over the Orlando Magic. On April 8, 2005, Iverson recorded 23 points, 7 rebounds and a career-high 16 assists in a 103–98 win over the Cleveland Cavaliers.\n' +
                '\n' +
                'A rejuvenated Iverson won his fourth NBA scoring title with 31 points and averaged 8 assists for the year, and helped the 76ers climb back into the postseason with a 43–39 record. They would go on to lose to the eventual Eastern Conference champion Detroit Pistons, who were led by Larry Brown, in the first round. In the series, Iverson had three double-doubles, including a 37-point, 15-assist performance in Philadelphia\'s lone win of the series.\n' +
                '\n' +
                'Despite O\'Brien helping the team back into the postseason, disagreements with players and management led to his firing after just one season. He was replaced by Sixers\' legend Maurice Cheeks, in a personnel move Iverson praised, as Cheeks had been an assistant coach with the team when they reached the NBA Finals in 2001. During the 2005–2006 season, Iverson averaged a career-high 33.0 points per game. The Sixers, however, missed the playoffs for the second time in three years.',
        },
        {
            email: 'user13@bilem.com',
            password: '123asdA!',
            displayName: 'Гермиона Грейнджер',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Поступив в Хогвартс, Гермиона делила комнату с Лавандой Браун, Парвати Патил и ещё с двумя другими гриффиндорскими девочками.\n' +
                '\n' +
                'Благодаря её ответственности, хорошей успеваемости и примерному поведению, на пятом курсе Гермиону назначили старостой факультета.\n' +
                '\n' +
                'К сожалению, Гермиона была вынуждена покинуть школу после шестого курса из-за того, что хотела вместе с Роном помочь Гарри Поттеру найти крестражи. Однако, после окончания Второй магической войны она вернулась в Хогвартс, в 1999 году окончила обучение на седьмом курсе и сдала ЖАБА вместе с лучшими подругами — Джинни Уизли и Полумной Лавгуд.',
        },
        {
            email: 'user14@bilem.com',
            password: '123asdA!',
            displayName: 'Арагорн',
            token: nanoid(),
            role: 'user',
            aboutMe: 'В 20-летнем возрасте Арагорн узнал своё настоящее имя и родословную от своего родственника и воспитателя Элронда, который вручил Арагорну Кольцо Барахира и обломки Нарсила. От Скипетра Аннуминаса Арагорн отказался, мотивируя тем, что «не пришло время». В тот же год Арагорн повстречал и полюбил Арвен, 2700-летнюю дочь Элронда, вернувшуюся из Лориэна, родины своей матери. После разговора с ней Арагорн на тридцать лет покинул Ривенделл и стал 16-м предводителем дунэдайн (остатков своего народа, рассеянного в ходе гражданских и региональных войн столетиями ранее), сражаясь со слугами Саурона.\n' +
                '\n' +
                'В 2956 году Т. Э. он повстречался с Гэндальфом и стал его другом.\n' +
                '\n' +
                'В 2957—2980 гг. Т. Э. Арагорн инкогнито проходил службу под именем Торонгила в армии короля Рохана Тенгеля (отца короля Теодена) и Наместника Гондора Эктелиона II (отца Дэнетора). Он стремился противодействовать растущей угрозе со стороны Саурона и его союзников, что способствовало росту морального духа у защитников Запада. В битвах он приобрел бесценный опыт, который впоследствии применил в Войне Кольца. В 2980 году с небольшой эскадрой гондорских кораблей он выступил в поход на захваченный пиратами Умбар, потопил многие их корабли и захватил в плен их командиров. Однако после победы в Умбаре Торонгил, к огорчению своих людей и наместника Эктелиона II, покинул войско и в одиночку ушёл на Восток в сторону Мордора.',
        },
        {
            email: 'user15@bilem.com',
            password: '123asdA!',
            displayName: 'J. R. R. Tolkien',
            token: nanoid(),
            role: 'user',
            aboutMe: 'From 1925 to 1945, Tolkien was the Rawlinson and Bosworth Professor of Anglo-Saxon and a Fellow of Pembroke College, both at the University of Oxford. He then moved within the same university, to become the Merton Professor of English Language and Literature and Fellow of Merton College, positions he held from 1945 until his retirement in 1959. Tolkien was a close friend of C. S. Lewis, a co-member of the informal literary discussion group The Inklings. He was appointed a Commander of the Order of the British Empire by Queen Elizabeth II on 28 March 1972.\n' +
                '\n' +
                'After Tolkien\'s death, his son Christopher published a series of works based on his father\'s extensive notes and unpublished manuscripts, including The Silmarillion. These, together with The Hobbit and The Lord of the Rings, form a connected body of tales, poems, fictional histories, invented languages, and literary essays about a fantasy world called Arda and, within it, Middle-earth.[b] Between 1951 and 1955, Tolkien applied the term legendarium to the larger part of these writings.\n' +
                '\n' +
                'While many other authors had published works of fantasy before Tolkien, the great success of The Hobbit and The Lord of the Rings led directly to a popular resurgence of the genre. This has caused Tolkien to be popularly identified as the "father" of modern fantasy literature—or, more precisely, of high fantasy.',
        },
        {
            email: 'user16@bilem.com',
            password: '123asdA!',
            displayName: 'Николай Некрасов',
            token: nanoid(),
            role: 'user',
            aboutMe: 'В 1832 году Некрасову исполнилось 11 лет, и он поступил в гимназию, где проучился до пятого класса. Учеба давалась ему тяжело, отношения с гимназическим начальством не ладились — в частности, из-за едких сатирических стихов, которые он начал сочинять в 16 лет. Поэтому в 1837 году Некрасов отправился в Петербург, где должен был, согласно желанию отца, поступить на военную службу.\n' +
                '\n' +
                'В Петербурге юный Некрасов через своего товарища по гимназии познакомился с несколькими студентами, после чего понял, что образование интересовало его больше, чем военное дело. Вопреки требованиям отца и угрозам оставить его без материального содержания, Некрасов начал готовиться к вступительным экзаменам в университет, однако провалил их, после чего стал вольнослушателем филологического факультета.\n' +
                '\n' +
                'Некрасов-старший выполнил свой ультиматум и оставил непокорного сына без финансовой помощи. Все свободное от учебы время у Некрасова уходило на поиски работы и крыши над головой: доходило до того, что он не мог позволить себе пообедать. Некоторое время он снимал комнату, но в итоге не смог оплачивать ее и оказался на улице, а затем попал в приют для нищих. Именно там Некрасов открыл для себя новую возможность заработка — писал за небольшую плату прошения и жалобы.',
        },
        {
            email: 'user17@bilem.com',
            password: '123asdA!',
            displayName: 'Пётр I',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Пётр I Алексе́евич, прозванный Вели́ким (30 мая [9 июня] 1672 года — 28 января [8 февраля] 1725 года) — последний царь всея Руси (с 1682 года) и первый Император Всероссийский (с 1721 года).\n' +
                '\n' +
                'Представитель династии Романовых. Был провозглашён царём в 10-летнем возрасте, стал править самостоятельно с 1689 года. Формальным соправителем Петра был его брат Иван (до своей смерти в 1696 году).\n' +
                '\n' +
                'С юных лет проявляя интерес к наукам и заграничному образу жизни, Пётр первым из русских царей совершил длительное путешествие в страны Западной Европы. По возвращении из него, в 1698 году, Пётр развернул масштабные реформы российского государства и общественного уклада. Одной из заслуг Петра стало расширение территорий России в Прибалтийском регионе после победы в Великой Северной войне, что позволило ему принять в 1721 году титул российского императора.',
        },
        {
            email: 'user18@bilem.com',
            password: '123asdA!',
            displayName: 'John F. Kennedy',
            token: nanoid(),
            role: 'user',
            aboutMe: 'In September 1936, Kennedy enrolled at Harvard College, and his application essay stated: "The reasons that I have for wishing to go to Harvard are several. I feel that Harvard can give me a better background and a better liberal education than any other university. I have always wanted to go there, as I have felt that it is not just another college, but is a university with something definite to offer. Then too, I would like to go to the same college as my father. To be a \'Harvard man\' is an enviable distinction, and one that I sincerely hope I shall attain."[26] He produced that year\'s annual "Freshman Smoker", called by a reviewer "an elaborate entertainment, which included in its cast outstanding personalities of the radio, screen and sports world".[27]\n' +
                '\n' +
                'He tried out for the football, golf, and swimming teams and earned a spot on the varsity swimming team.[28] Kennedy also sailed in the Star class and won the 1936 Nantucket Sound Star Championship.[29] In July 1937, Kennedy sailed to France—taking his convertible—and spent ten weeks driving through Europe with Billings.[30] In June 1938, Kennedy sailed overseas with his father and older brother to work at the American embassy in London, where his father was President Franklin D. Roosevelt\'s U.S. Ambassador to the Court of St. James\'s.[31]\n' +
                '\n' +
                'In 1939, Kennedy toured Europe, the Soviet Union, the Balkans, and the Middle East in preparation for his Harvard senior honors thesis. He then went to Berlin, where the U.S. diplomatic representative gave him a secret message about war breaking out soon to pass on to his father, and to Czechoslovakia before returning to London on September 1, 1939, the day that Germany invaded Poland to mark the beginning of World War II.[32] Two days later, the family was in the House of Commons for speeches endorsing the United Kingdom\'s declaration of war on Germany. Kennedy was sent as his father\'s representative to help with arrangements for American survivors of SS Athenia before flying back to the U.S. from Foynes, Ireland, on his first transatlantic flight.',
        },
        {
            email: 'user19@bilem.com',
            password: '123asdA!',
            displayName: 'Ганниба́л Ба́рка',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Ганниба́л Ба́рка (247—183 до н. э.) — карфагенский военачальник. Считается одним из величайших полководцев и государственных деятелей древности. Был заклятым врагом Римской республики и последним значимым лидером Карфагена перед его падением в серии Пунических войн.\n' +
                '\n' +
                'Ганнибал родился в 247 году до н. э. в семье карфагенского полководца Гамилькара Барки. В возрасте девяти лет дал клятву быть врагом Рима. Став главнокомандующим карфагенскими войсками в Испании, развязал вторую Пуническую войну, напав на Сагунт. В 218 году до н. э. вторгся в Италию и нанёс римлянам несколько поражений, в том числе при Каннах. Но римляне сумели перехватить инициативу и перейти в наступление в Испании, а затем и в Африке. Вызванный на помощь Карфагену в Африку, Ганнибал потерпел поражение при Заме, после которого Карфаген был вынужден заключить мир с Римом. В 196 году до н. э. был обвинён в антиримских настроениях и ушёл в изгнание. Покончил жизнь самоубийством в 183 году до н. э., не желая сдаваться римлянам.\n' +
                '\n' +
                'Ганнибал считается одним из величайших военных стратегов в истории Европы, а также одним из величайших полководцев древности, наряду с Александром Македонским, Юлием Цезарем, Сципионом Африканским и Пирром Эпирским. Военный историк Теодор Айро Додж даже назвал Ганнибала «отцом стратегии», так как его враги, римляне, заимствовали у него некоторые элементы его стратегии[1]. Такая оценка создала ему высокую репутацию в современном мире, он считается великим стратегом, наряду с Наполеоном Бонапартом.',
        },
        {
            email: 'user20@bilem.com',
            password: '123asdA!',
            displayName: 'Королёв Сергей',
            token: nanoid(),
            role: 'user',
            aboutMe: 'Серге́й Па́влович Королёв (30 декабря 1906 [12 января 1907], Житомир, Волынская губерния, Российская империя — 14 января 1966, Москва) — советский учёный, конструктор ракетно-космических систем[2], председатель Совета главных конструкторов СССР (1946—1966), академик АН СССР (1958).\n' +
                '\n' +
                'Сергей Королёв является одним из основных создателей советской ракетно-космической техники, обеспечившей стратегический паритет и сделавшей Союз Советских Социалистических Республик передовой ракетно-космической державой, и ключевой фигурой в освоении человеком космоса, основателем практической космонавтики. В официальных документах СССР его называли просто «Главный конструктор».[3] Под его руководством был организован и осуществлён запуск первого искусственного спутника Земли и первого космонавта планеты Юрия Гагарина. Дважды Герой Социалистического Труда, лауреат Ленинской премии. Член КПСС с июля 1953 года[4]. Скончался 14 января 1966 года в Москве, похоронен в некрополе у Кремлёвской стены.',
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
        financing, trading, taxes, cryptocurrency, webDesign, graphDesign, designTools, interface, interior, motion, threeD,
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
        promoVideo: 'pCJsAzWecbk',
        description: 'веб-разработка',
        information: 'Курс по программированию на языке Java для учеников центров Легасофт и IT-CUBE города Смоленска 14 - 16 лет. Курс рассчитан для новичков в программировании. За 4 модуля вы обучитесь основам программирования,  напишите несколько проектов, работая в команде, и узнаете несколько технологий, которые используют профессиональные разработчики.',
        author: user2,
        students: [user3, user4, user8, user12],
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
                        video: 'gq4S-ovWVlM',
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
                        video: 'GB8k2-Egfv0',
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
                        video: 'Z5gubdHLJIc',
                        image: 'spring-overview.png'
                    },
                    {
                        title: 'Main info full lesson 2',
                        description: 'Spring s declarative transaction management features make the web application fully transactional, just as it would be if you used EJB container-managed transactions. All your custom business logic can be implemented with simple POJOs and managed by Spring s IoC container. Additional services include support for sending email and validation that is independent of the web layer, which lets you choose where to execute validation rules. Spring s ORM support is integrated with JPA, Hibernate, JDO and iBatis; for example, when using Hibernate, you can continue to use your existing mapping files and standard Hibernate SessionFactory configuration. Form controllers seamlessly integrate the web-layer with the domain model, removing the need for ActionForms or other classes that transform HTTP parameters to values for your domain model.',
                        video: '7c6ZTF6cF88',
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
        promoVideo: '0Cdsk2BeNA8',
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
                        video: 'gq4S-ovWVlM',
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
                        video: 'GB8k2-Egfv0',
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
                        video: 'Z5gubdHLJIc',
                        image: 'spring-overview.png'
                    },
                    {
                        title: 'Main info full lesson 2',
                        description: 'Spring s declarative transaction management features make the web application fully transactional, just as it would be if you used EJB container-managed transactions. All your custom business logic can be implemented with simple POJOs and managed by Spring s IoC container. Additional services include support for sending email and validation that is independent of the web layer, which lets you choose where to execute validation rules. Spring s ORM support is integrated with JPA, Hibernate, JDO and iBatis; for example, when using Hibernate, you can continue to use your existing mapping files and standard Hibernate SessionFactory configuration. Form controllers seamlessly integrate the web-layer with the domain model, removing the need for ActionForms or other classes that transform HTTP parameters to values for your domain model.',
                        video: '7c6ZTF6cF88',
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
        promoVideo: 'x6GSUrdTfDY',
        description: 'Криптовалюты - это легко. Мой курс отвечает на самые основополагающие вопросы об устройстве и использовании криптовалют. Для вас он станет крепким фундаментом в понимании криптовалютного рынка.' +
            ' А так же поможет защититься от мошенников и повысит вашу финансовую грамотность.',
        information: 'Курс об эффективности не технических решений в кибербезопасности. Организации тратят огромные деньги на информационную безопасность своих систем, но преступники разбивают эту дорогую броню с помощью законов психологии. Эффективность существующих форм обучения сравнительно мала. Через месяц сотрудники совершают те же ошибки.',
        author: user,
        students: [user2, user3, user4, user5, user20, user19, user18, user17],
        subcategory: cryptocurrency,
        modules: [
            {
                title: 'Базовые понятия о криптовалютах',
                lessons: [
                    {
                        title: 'Основные понятия криптовалют',
                        description: 'Криптовалюта — это любой вид валюты в цифровой или виртуальной форме, а это означает, что ее не существует в физическом мире. Все цифровые деньги "живут" только в сетевом пространстве. Важно отметить, что они ничем не обеспечены. Майнить ("добывать") криптовалюту может любой желающий, но следует знать, что есть ограничения на добычу криптовалюты, поэтому стоимость криптовалюты зачастую растет с течением времени.',
                        video: 'PF1el_DzYeI',
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
                        video: 'sq7yGozBreo',
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
                        video: 'agKU6V9k6-M',
                        image: 'portfel4.jpg',
                    },
                    {
                        title: 'Как собрать портфель криптовалют?',
                        description: 'Основным принципом правильного распределения активов в инвестиционном портфеле является разнообразие активов. Криптовалютный портфель должен содержать все инструменты для заработка и снижения риска в правильных пропорциях. Большая часть его составляющих должна состоять из популярных криптовалют со стабильным ростом и востребованностью среди пользователей. Опытными инвесторами разработано несколько оптимальных стратегий формирования криптовалютного портфеля.',
                        video: 'c4AhTOkALDQ',
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
        promoVideo: 'ylakWC0VcEM',
        description: 'В данном курсе рассмотрены основы программирования на JavaScript а также некоторые инструменты и модели данных, необходимые для практического использования JavaScript.',
        information: 'Цель данного курса - познакомить слушателей с основами программирования на JavaScript и подготовить их для практического применения данного инструмента.',
        author: user2,
        students: [user2, user3, user4, user5, user20, user19, user18, user17, user9, user10, user11, user12, user13, user14, user15, user16],
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
                        video: 'y36BHRMRPo8',
                    },
                ]
            },
            {
                title: 'Где применяется JavaScript',
                lessons: [
                    {
                        title: 'Клиентская часть веб—приложений (frontend). ',
                        description: 'Это интерфейс страницы, то есть всё, что видит пользователь: контент, кнопки, формы обратной связи, меню. С помощью JS интерфейс реагирует на действия пользователя (клики мыши, нажатия клавиш), также язык отвечает за запоминание данных и автозаполнение форм.',
                        video: '9mZmc6a0tmM',
                        image: '1590690600-front-end-back-end-1080x608.png'
                    },
                    {
                        title: 'Серверная часть веб—приложений (backend).',
                        description: 'Серверный код пишут на платформе Node.js. На JS работают, например, запросы AJAX (asynchronous javascript and XML), которые отправляются на сервер в фоновом режиме, без перезагрузки веб-страницы, и push-уведомления — всплывающие сообщения в браузере, которые реализуются с помощью технологии Comet. Такие уведомления приходят со специального Comet-сервера, который постоянно поддерживает соединение с браузером. Как раз с помощью JavaScript устанавливается это соединение.',
                        video: 'm4tn1r44oeE',
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
        promoVideo: 'Bluxbh9CaQ0',
        description: 'В данном курсе рассмотрены основы программирования на JavaScript а также некоторые инструменты и модели данных, необходимые для практического использования JavaScript.',
        information: 'Цель данного курса - познакомить слушателей с основами программирования на JavaScript и подготовить их для практического применения данного инструмента.',
        author: user,
        students: [user2, user3, user4, user5, user20, user19, user18, user17, user9, user10, user11, user12, user13],
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
                        video: 'y36BHRMRPo8',
                    },
                ]
            },
            {
                title: 'Где применяется JavaScript',
                lessons: [
                    {
                        title: 'Мобильные приложения на Android, iOS, Windows Mobile',
                        description: 'когда нужно кросс-платформенное приложение или адаптация веб-приложения, а языков Kotlin (для Android) и Swift (для iOS) недостаточно, то используется JavaScript.',
                        video: '9mZmc6a0tmM',
                        image: '1590690600-front-end-back-end-1080x608.png'
                    },
                    {
                        title: 'Серверная часть веб—приложений (backend).',
                        description: 'Серверный код пишут на платформе Node.js. На JS работают, например, запросы AJAX (asynchronous javascript and XML), которые отправляются на сервер в фоновом режиме, без перезагрузки веб-страницы, и push-уведомления — всплывающие сообщения в браузере, которые реализуются с помощью технологии Comet. Такие уведомления приходят со специального Comet-сервера, который постоянно поддерживает соединение с браузером. Как раз с помощью JavaScript устанавливается это соединение.',
                        video: 'm4tn1r44oeE',
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
                        video: 'OC7NA44S7bQ',
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
                        video: 'OC7NA44S7bQ',
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
        promoVideo: 'mciwdFc2Ut8',
        description: 'Веб-дизайн',
        information: 'UX/UI дизайн и аналитика – новые направления в области информационных технологий, которые ближе всего стоят к профессии веб-разработчик. Дизайнер интерфейсов проектирует взаимодействие пользователя с сайтом, приложением или каким-либо информационным сервисом и создает визуальные элементы, переходы, систему и прототип интуитивно понятного интерфейса. Данная профессия включает в себя постоянное взаимодействие со множеством инструментов для прототипирования, которые включают в себя такие программы, как Figma, InVision Studio, Sketch, Adobe Illustrator, Adobe After Effects, ColorHexa, Fontjoy и др',
        author: user,
        students: [user2, user3, user4, user5, user20, user19, user18, user17, user9, user10, user11, user12, user13, user14, user15, user16, user8],
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
                        video: 'MSnt9cznhTc',
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
                        video: 'mciwdFc2Ut8',
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
                        video: '0bvcjQTWkAo',
                    },
                    {
                        title: 'Как стать UX и UI дизайнером',
                        description: 'Со времен появления тренда на UX/UI профессия дизайнера ощутимо усложнилась. Теперь уже мало уметь рисовать макеты и гармонично сочетать цвета. Обычно дизайном User Experience занимается целая команда, т.к. одному человеку не под силу охватить все процессы.\n' +
                            '\n' +
                            'Как стать UX/UI дизайнером? В первую очередь нужно решить, по какому пути идти. Нравится наводить красоту, визуализировать идеи? Значит, ваша область — UI. Многие начинают с визуализаций и, постепенно расширяя круг своих интересов, приходят к полноценному проектированию UX',
                        video: 'RMbIoRXZhbA',
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
        promoVideo: 'HzwNd4db058',
        description: 'Трейдинг',
        information: 'Курс подготовлен профессиональными трейдерами — это значит, что мы зарабатываем с торговли на финансовых рынках. Все специалисты торгуют как на свои средства, так и на средства инвесторов.',
        author: user3,
        students: [user2, user3],
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
                        video: '9-z2o_TywCg',
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
                        video: 'tsVgMrEiFRw'
                    },
                ]
            },
            {
                title: 'Виды трейдинга',
                lessons: [
                    {
                        title: 'Скальпинг.',
                        description: ' Стратегия подразумевает закрытие сделки, как только достигнута прибыль в несколько пунктов. Время на операцию — несколько секунд или минут. Увеличение дохода наблюдается за счет большого количества заявок — около 100 в день. Подходит выносливым трейдерам с быстрой реакцией и способностью работать под большим напряжением. Обратите внимание, что за каждую операцию берется комиссия. А чем их больше, тем больше расходы',
                        video: '2Ev8l0xcdEE',
                    },
                    {
                        title: 'Активный интрадей',
                        description: ' До десятка заявок в течение дня. Специалист работает по 3-х и 5-минутным графикам. Прибыль от сделки — 2-6%. Важно отслеживать риски и вовремя закрывать позиции. Эксперт должен быть дисциплинированным, уметь работать с графиками, вести статистику, анализировать и отслеживать изменения на протяжении дня. А также уметь остановиться, чтобы не потерять дневной заработок',
                        video: 'rSJYLZKhMd0',
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
        promoVideo: 'VksGRnLLhCg',
        description: 'Пошаговое руководство по созданию интерьера',
        information: 'Задачи и цели: Ознакомить учащихся с основными качествами интерьера, его особенностями; Воспитывать эстетический вкус на основе композиционного построения интерьера; Развивать самостоятельную деятельность при выполнении практической работы;',
        author: user2,
        students: [user2, user3, user4, user5, user20],
        subcategory: interior,
        modules: [
            {
                title: 'Пошаговая инструкция по созданию функционального интерьера квартиры',
                lessons: [
                    {
                        title: 'Функциональный дизайн – это как?',
                        description: 'Функциональный дизайн – это такой вид дизайна, который объединяет внешнюю красоту и удобство использования квартиры по назначению – для того, чтобы в ней ЖИТЬ. На первый взгляд звучит достаточно просто и очевидно? На деле не так. Сколько же мы видели примеров интерьеров, которые были построены по модели “так будет красиво” или “я – дизайнер, я так вижу…”. Последний вариант, кстати, достаточно актуален, особенно для начинающих дизайнеров. Многие думают, что чем сложнее для восприятия интерьер я создам, тем я буду “дизайнеристее”, а потом такую работу можно еще и на тематические сайты и форумы отправить, где все дизайнеры однозначно поставят “лайк”',
                        video: 'jfHUzASld3c',
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
        promoVideo: 'YnjPDKPaeIc',
        description: 'Узнайте как создать интерьер самостоятельно с любым бюджетом',
        information: 'Задачи и цели: Ознакомить учащихся с основными качествами интерьера, его особенностями; Воспитывать эстетический вкус на основе композиционного построения интерьера; Развивать самостоятельную деятельность при выполнении практической работы;',
        author: user8,
        students: [user2, user3, user4, user5, user20, user19, user18, user17, user9, user10, user11, user12, user13, user14, user15, user16, user6, user7, user],
        subcategory: interior,
        modules: [
            {
                title: 'Введение',
                lessons: [
                    {
                        title: 'Единство и гармония',
                        description: 'Создавая интерьер, нужно думать о доме как о едином целом пространстве, состоящим из отдельных помещений, связанных между собой   залами и лестницами. Поэтому естественно то, что общий стиль и идея распространяются на весь дом. Это не означает, что все элементы   дизайна интерьера должны быть одинаковыми. Они должны сочетаться и дополнять друг друга для художественного усиления всей композиции.',
                        video: 'jOXPHR9Mpek',
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
                        video: 'pzWAmmdWceA',
                        image: 'pravila-dizaina-3-2.jpg',
                    },
                    {
                        title: 'Прогрессия ',
                        description: ' Прогрессия - это увеличение или уменьшение одного или нескольких качеств элемента. Наиболее очевидной реализацией этого приема -это градация элемента по размеру. Даже размещение нескольких свечей разных размеров на обычном подносе гарантировано   вызывает интерес своей естественной прогрессией. Прогрессии можно добиться и с помощью цвета. Например, в монохроматической   цветовой схеме, где каждый элемент слегка отличается от другого оттенком одного и того же цвета.',
                        video: 'rK_IM8LhL_4',
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
                        video: 'TxuATPq6XTE',
                    },
                    {
                        title: 'Асимметричный баланс ',
                        description: 'широко используется в современной практике. Он достигается с помощью разнородных предметов, имеющих   одинаковый визуальный вес или привлекательность. Асимметричный баланс является более беспорядочным и менее надуманным, но гораздо более трудоемким для достижения гармонии. Асимметрия предполагает наличие движения и поэтому интерьер выглядит более динамичным .',
                        video: 'avMmJALHBhw',
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
        promoVideo: 'q1gb0H_2tKg',
        description: 'подготовка к IElTS за три месяца',
        information: 'IELTS Academic Express is a self-paced course that provides with a quick yet effective overview of the IELTS Academic exams, each section, types of tasks and effective strategies.',
        author: user,
        students: [user2, user3, user4, user5, user20, user19, user18, user17, user9, user10, user11, user12, user13, user14],
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
                        video: 'q1gb0H_2tKg',
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
                        video: '9KijVQDFyi0',
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
                        video: 'CK_PE9ILJjQ',
                    },
                    {
                        title: 'Reading',
                        description: 'То же самое касается и Reading. Сдающие тест на IELTS Academic, читают длинные научно-популярные тексты, состоящие из сложнейших слов и терминов.\n' +
                            '\n' +
                            'Чтение же в IELTS General – это проверка, насколько вы понимаете тексты на общие темы. Потребуется прочитать, к примеру, журнальную статью, рекламное объявление, рассказ о животных',
                        video: 'NUIU22KcJ4Q',
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
        promoVideo: 'MU8xhYgHT0U',
        description: 'Эффективный курс по разговорной части IELTS',
        information: 'IELTS Academic Express is a self-paced course that provides with a quick yet effective overview of the IELTS Academic exams, each section, types of tasks and effective strategies.',
        author: user4,
        students: [user2, user3, user, user5, user20, user19, user18, user17, user9],
        subcategory: exam,
        modules: [
            {
                title: 'Введение',
                lessons: [
                    {
                        title: 'Speaking',
                        description: 'Разговорная часть занимает на тесте всего 10-15 минут. По сути, это просто беседа с экзаменатором, состоящая из трех этапов: разговор о хобби и интересах, подготовка речи на заданную тему и ответы на дополнительные вопросы.',
                        video: 'MU8xhYgHT0U',
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
                        video: 'YdMrkcpPGq4',
                    },
                ]
            },
            {
                title: 'Особенности подготовки к Speaking',
                lessons: [
                    {
                        title: 'Улучшайте слух',
                        description: 'Слушайте английскую речь и повторяйте каждое предложение за спикером. Это улучшит акцент, поможет выработать нужный темп и ритм речи.',
                        video: '5DjHMLyRm7g',
                    },
                    {
                        title: 'Окружите себя английским',
                        description: 'Найдите людей, с которыми будете разговаривать – шерстите тематические форумы и регистрируйтесь на сайтах знакомств. Главное, чтобы собеседник был носителем языка.',
                        video: 'TneqhthYz_w',
                    },
                ]
            }
        ],
        price: 500,
        image: null,
        is_free: false,
        rate: 3.7,
        is_published: false
    }, {
        title: 'Спортивная фармакология',
        promoVideo: 'L9SoGNT_F1Q',
        description: 'Курс повышения квалификации для специалистов, работающих со спортсменами разного уровня и разных видов спорта (в том числе спорт высших достижений).',
        information: 'Все лекторы, представленные в программе курса, являются признанными ведущими специалистами в своей научно-практической области.\n' +
            '\n' +
            'Курс включает в себя практические инструменты для управления тренировочным процессом на различных его этапах.\n' +
            '\n' +
            'Практические рекомендации по оптимальным группам препаратов и пищевых добавок в практике подготовки спортсменов.\n +' +
            '\n' +
            'Курс опирается на принципы доказательной медицины, соответствует законодательству РФ и применим в спорте высших достижений.\n +' +
            '\n' +
            'Без рекламы и продвижения конкретных брендов, препаратов и организаций.\n +' +
            '\n' +
            'Передовой академический и научный бэкграунд + практический опыт работы с реальными спортсменами.\n +' +
            '\n' +
            'Курс направлен на повышение уровня квалификации спортивных врачей и других специалистов, работающих в различных видах спорта. Прохождение курса также полезно сотрудникам спортивных школ, врачебно-физкультурных диспансеров, лечебных учреждений и медицинских ВУЗов.',
        author: user12,
        students: [user2, user3, user4, user5, user20, user19, user18, user17, user9, user10, user11, user13, user14],
        subcategory: sport,
        modules: [
            {
                title: 'Негативные последствия утомления, включая синдром перетренированности: алгоритмы коррекции',
                lessons: [
                    {
                        title: 'Нутритивная поддержка функций надпочечников в условиях физического стресса',
                        description: 'Спасибо большое за организацию курса по спортивной фармакологии. Особенно хотелось подчеркнуть информативные лекции по терапевтическому использованию, противовоспалительные средства и особенности фармакологической коррекции энергодефицита. Всем лекторам большое спасибо.',
                        video: 'LGwaXeeAJfk',
                        comments: [
                            {
                                user: user9,
                                text: 'Про эфир тестостерона, который сделаешь 1 раз и полгода ровным фоном держиться, похоже на чистую бредятину. Алексей Киреев(Доктор Любер), очень известный тренер в России, сказал: что все зарубежные атлеты используют ту же самую фармакологию, что и в России. Назревает вопрос: Так где же тогда у нас эти мази тестостероновые и эфиры полугодичной длины? Даже, если и есть эти супер мази, то они даже рядом не лежат с внутримышечным введением.',
                            }, {
                                user: user13,
                                text: 'Бустеры работают😂кошмар...они работают только на пкт и то под вопросом',
                            }, {
                                user: user20,
                                text: 'Гениально, провирон на пкт))) и тамокса ещё после дэки закинуть)) Все поняли что вы не слезаете с курса))',
                            },
                        ]
                    },
                    {
                        title: 'Кардиопротекторы в спортивной фармакологии',
                        description: 'Постановка проблемы. В основе достижения высоких спортивных результатов лежит адекватная перестройка адаптационных\n' +
                            'процессов, которые происходят в организме\n' +
                            'спортсменов в динамике многолетнего совершенствования. Постоянное воздействие\n' +
                            'физических нагрузок приводит к развитию\n' +
                            'определенного уровня функционирования основных лимитирующих для конкретного вида\n' +
                            'деятельности систем организма. Важнейшей\n' +
                            'из таких систем практически во всех видах\n' +
                            'спортаявляется сердечно-сосудистая, ролькоторой вобеспечении соответствующегоуровня\n' +
                            'физической работоспособности спортсменов\n' +
                            'трудно переоценить; именно ее чаще всего\n' +
                            'считают основной лимитирующей системой у\n' +
                            'представителей разных видов спорта ',
                        video: 'h-IgSqdJsNQ',
                    },
                ]
            },
            {
                title: 'Особенности назначения кардиотропных препаратов в спорте',
                lessons: [
                    {
                        title: 'Структура антидопинговой системы, роли организаций',
                        description: 'На сегодняшний день применение допинга стало одной из самых актуальных проблем в мировом спортивном движении. Допинговые скандалы\n' +
                            'происходят на глазах у миллиардов зрителей и наносят невосполнимый\n' +
                            'ущерб репутации государства и всему спорту.\n' +
                            'Если двадцать лет назад от соревнований отстраняли единичных атлетов, то сейчас отстраняют целые команды, страны. Выход из создавшегося\n' +
                            'критического положения находится, прежде всего, в изменении\n' +
                            'общественного мнения в этой сфере. Общество должно изменить свою\n' +
                            'позицию по отношению к спортсменам и спортивной фармакологии, иначе в\n' +
                            'этой войне не будет победителей, - проиграют все: и спорт, и зрители. ',
                        video: 'HuXW9czg-Cs',
                    },
                    {
                        title: 'Список запрещенных субстанций и методов',
                        description: 'ВАДА периодически, как минимум раз в год, обновляет данный\n' +
                            'Список. Обновленный Список, как правило, вступает в силу ежегодно с\n' +
                            '1 января и является доступным накануне за несколько месяцев на сайте\n' +
                            'ВАДА и НАДА.\n' +
                            'Критерии включения субстанций и методов в Список.\n' +
                            'Субстанция или метод включаются в Список, если отвечают двум из\n' +
                            'трех следующих критериев:\n' +
                            'субстанция или метод способен улучшить спортивный результат;\n' +
                            'использование субстанции или метода представляет реальный или\n' +
                            'потенциальный риск для здоровья спортсмена;',
                        video: '-9GY9JRRDZ0',
                    },
                ]
            }
        ],
        price: 1299,
        image: null,
        is_free: false,
        rate: 2.1,
        is_published: true
    }, {
        title: 'Профессия Бизнес-аналитик',
        promoVideo: '0c6OTs_cXRs',
        description: 'Вы освоите системный и бизнес-анализ, чтобы помогать компаниям принимать стратегические решения и увеличивать прибыль. Сможете работать удалённо через полгода и начать карьеру в российской или международной компании.',
        information: 'Бизнес-аналитик погружается в экономику, финансы, организационные процессы компании, помогает решать стратегические задачи и выводит бизнес на новый уровень.\n' +
            '\n' +
            'На курсе вы получите инструменты и навыки для запуска новых бизнес-процессов и оптимизации существующих.\n' +
            '\n' +
            'Бизнес-аналитики востребованы в коммерческих компаниях: от IT и консалтинговых до торговых, строительных и производственных.',
        author: user13,
        students: [user2, user3, user4, user5, user20, user19, user18, user17, user9, user10, user11, user12, user13, user14, user15, user16, user6],
        subcategory: entrepreneurship,
        modules: [
            {
                title: 'Введение',
                lessons: [
                    {
                        title: 'Рассчитывать бизнес-модель',
                        description: 'Разберётесь в специфике разных моделей бизнеса и поймёте, как компании устроены изнутри. Научитесь определять стратегию развития и строить бизнес-модели по мировым стандартам.',
                        video: 'MatVaQM_-c8',
                        comments: [
                            {
                                user: user,
                                text: 'До этого начал смотреть видео с человеком, который полтора часа рассказывает что такое финмодель и с чем ее едят. Он такой дуууууууушныыыыыый... А тут все просто и понятно) Прям то что\n' +
                                    ' я искал) Спасибо большое за ваш труд!',
                            }, {
                                user: user2,
                                text: 'Всегда удивляет, почему реально крутые и полезные видео с малым количеством просмотров, а инфобарыги на волне ))) Спасибо за видео и за канал!!!',
                            }, {
                                user: user3,
                                text: 'Вас интересно слушать! \n' +
                                    'Сама финансовая модель мне понятна...\n' +
                                    'А можно видео-курс как создавать формулы для финансовой модели?))',
                            },
                        ]
                    },
                    {
                        title: 'Анализировать экономику бизнеса',
                        description: 'Узнаете, какие факторы влияют на прибыльность бизнеса, научитесь влиять на спрос и предложение. Изучите инструменты капитализации, освоите веб-аналитику и сможете строить модель бюджета компании.',
                        video: 'gg3TLUKOH3U',
                    },
                ]
            },
            {
                title: 'Особенности подготовки',
                lessons: [
                    {
                        title: 'Оптимизировать бизнес-процессы',
                        description: 'Освоите работу с международными нотациями, научитесь строить Customer Journey Map и user story, проводить CustDev и UX-интервью. Сможете автоматизировать процессы и находить точки развития для бизнеса.',
                        video: 'GxxOH2rRVDk',
                    },
                    {
                        title: 'Решать задачи бизнеса с помощью IT-разработки',
                        description: 'Узнаете, как помочь бизнесу внедрить новые сервисы и повысить прибыльность. Научитесь управлять разработкой, разбираться в e-commerce и влиять на эффективность онлайн-торговли.',
                        video: 'ryJlXK5B21s',
                    },
                ]
            }
        ],
        price: 999,
        image: null,
        is_free: false,
        rate: 4.8,
        is_published: true
    }, {
        title: 'Введение в иммунологию',
        promoVideo: 'tyYFgunJzPo',
        description: 'Этот вводный курс позволит Вам получить общее представление об иммунной системе и иммунитете в целом.',
        information: 'Настоящий курс является базовым обзорным курсом и создан для неподготовленных слушателей, без глубоких знаний в области биологии. Он позволит Вам составить представление о том, что такое иммунная система и каковы основные принципы ее работы. Кроме того, данный курс позволит Вам составить представление о широком применении знаний из области иммунологии на практике (в медицине, фармации, диагностике).\n' +
            '\n' +
            'Курс разделен на 3 логические части:\n' +
            '\n' +
            'В первой части мы разберем основные термины и понятия из области иммунологии, составим представление о строении иммунной системы.  \n' +
            '\n' +
            'Во втором разделе кратко обсудим разделение иммунной системы на две ветви - врожденную и адаптивную, а также рассмотрим основные принципы и механизмы работы иммунной системы.\n' +
            '\n' +
            'Третий раздел направлен на формирование представления о том, зачем нам знать что такое иммунитет и как он работает. В разделе рассмотрены основные сферы практического применения знаний в области иммунологии.\n' +
            '\n' +
            'Все уроки курса состоят из кратких видеолекций (от 1 до 4х минут), текста, отражающего главную теоретическую информацию из видеолекции, а также контрольных тестовых вопросов для проверки усвоения основных знаний.\n' +
            '\n' +
            'Автор курса выражает особую благодарность JetBrains Research за импульс к созданию курса и поддержку во время его подготовки.',
        author: user17,
        students: [user2, user3, user4, user5, user20, user19, user18, user17, user9, user10, user11],
        subcategory: biology,
        modules: [
            {
                title: ' Что такое иммунитет?',
                lessons: [
                    {
                        title: 'Введение. Основные определения.',
                        description: 'Добрый день, уважаемые слушатели курса!\n' +
                            '\n' +
                            'Каждый из нас регулярно сталкивается с понятием "иммунитет". Люди часто говорят о "сильном" или "ослабленном" иммунитете, о необходимости его "поддерживать". \n' +
                            '\n' +
                            'Но что же такое "иммунитет"?\n' +
                            '\n' +
                            'Какие функции в нашем организме выполняет?\n' +
                            '\n' +
                            'Почему так Важен, и почему мы так часто о нем говорим и беспокоимся?\n' +
                            '\n' +
                            'Давайте разбираться!',
                        video: 'MCNrC9TKx4M',
                        comments: [
                            {
                                user: user12,
                                text: 'Благодарю за большой труд, вложенный в  замечательную лекцию. Я не нашла фамилию лектора. Есть большое желание почитать статьи этого ученого.',
                            }, {
                                user: user7,
                                text: 'Шикарная  подача лекции, очень сложная тема и таким образом  очень легко воспринимается!\n' +
                                    'Спасибо  Вам большое!',
                            }, {
                                user: user19,
                                text: 'Круто поясняете, большое спасибо👏👏👏👏👏\n' +
                                    'Хоть я и не имею отношения к медицине, но все очень интересное и очень доступно👏👏👏👏👏',
                            },
                        ]
                    },
                    {
                        title: 'Строение имунной системы.',
                        description: 'В данном разделе мы кратко рассмотрим основные механизмы реализации реакций врожденного  и адаптивного иммунитета. \n' +
                            '\n' +
                            'Приведенная информация позволит Вам составить общее представление о принципах работы иммунной системы и формирования имунной защиты.',
                        video: 'xLOu_n7OAVY',
                    },
                ]
            },
            {
                title: 'Врожденный и адаптивный иммунитет',
                lessons: [
                    {
                        title: 'Основные механизмы реализации реакций врожденного иммунитета',
                        description: 'Врождённый иммунитет — способность организма обезвреживать чужеродный и потенциально опасный биоматериал (микроорганизмы, трансплантат, токсины, опухолевые клетки, клетки, инфицированные вирусом), существующая изначально, до первого попадания этого биоматериала в организм.',
                        video: 'tyYFgunJzPo',
                    },
                    {
                        title: 'Механизмы защитного действия антител',
                        description: 'Узнаете, как помочь бизнесу внедрить новые сервисы и повысить прибыльность. Научитесь управлять разработкой, разбираться в e-commerce и влиять на эффективность онлайн-торговли.',
                        video: 'Y8DAWbrlvmg',
                    },
                ]
            }
        ],
        price: 0,
        image: null,
        is_free: true,
        rate: 4.2,
        is_published: true
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
