const {I} = inject();

Given('я нахожусь на странице {string}', (page) => {
  switch (page) {
    case 'Регистрация':
      return I.amOnPage('/register');
    case 'Логин':
      return I.amOnPage('/login');
    case 'Восстановление пароля':
      return I.amOnPage('/recovery');
    case 'Редактирование пароля':
      return I.amOnPage('/newPassword');
    case 'Курсы':
      return I.amOnPage('/teaching/courses');
    case 'Уроки':
      return I.amOnPage('/teaching/lessons');
    case 'Создание нового модуля':
      return I.amOnPage('/editModule/:id');
    case 'Создание категории':
      return I.amOnPage('/add-category');
    case 'Создание подкатегории':
      return I.amOnPage('/add-subcategory/626a50f11cdf5999b84dd479');
    case 'Редактирование подкатегории':
      return I.amOnPage('/add-subcategory/626a50f31cdf5999b84dd49c');
    case 'Мои курсы':
      return I.amOnPage('/myCourses/learning');
    case 'Хочу пройти':
      return I.amOnPage('/myCourses/favorite');
    case 'Курсы по категории':
      return I.amOnPage('/categories/6274899434f34673897be04f');
    case 'Курсы по подкатегории':
      return I.amOnPage('/subcategories/6277b25a194df1f175428d13');
    case 'Помощь':
      return I.amOnPage('/help');
    case 'Контакты':
      return I.amOnPage('/contacts');
    case 'О проекте':
      return I.amOnPage('/about-project');
    case 'Разработка':
      return I.amOnPage('/team');
    case 'Вакансии':
      return I.amOnPage('/vacancy');
    default:
      return I.amOnPage('/');
  }
});

Given('я ввожу в поля формы:', (table) => {
  table.rows.forEach(row => {
    I.fillField(row.cells[0].value, row.cells[1].value);
  });

  I.wait(2);
});

Given('нажимаю на кнопку формы {string}', (buttonText) => {
  I.click(buttonText, {css: 'form'});
  I.wait(1);
});

Given('я нажимаю на ссылку {string}', (linkTitle) => {
  I.click(linkTitle);
  I.wait(1);
});

Given('нажимаю на кнопку {string}', (buttonText) => {
  switch (buttonText) {
    case 'Редактировать':
      I.click('button span mat-icon[id=editCourse]');
      I.wait(1);
      return I.click(buttonText);
    case 'Поступить на курс':
      I.click(buttonText);
      I.wait(1);
      break;
    case 'Хочу пройти':
      I.click(buttonText);
      I.wait(1);
      break;
    case 'Удалить':
      I.click(buttonText);
      I.wait(3);
      break;
    case 'Вертикальное троеточие':
      I.click('button mat-icon[id=editLesson]');
      I.wait(1);
      break;
    case 'Редактировать урок':
      I.click('.lessonEditBtn');
      I.wait(1);
      break;
    case 'Удалить урок':
      I.click('.lessonRemoveBtn');
      I.wait(1);
      break;
    case 'Начать учиться':
      I.click('.btnGo');
      I.wait(1);
      break;
    default:
      return I.click(buttonText);
  }
});

Given('я должен увидеть элемент страницы с содержимым {string}', (array) => {
  array.split(',').forEach(item => {
    I.see(item);
    I.wait(1);
  });
});

Then('я должен увидеть текст {string}', (text) => {
  switch (text) {
    case 'Содержимое успешно отредактировано':
      I.see(text);
      return I.amOnPage('/teaching/courses');
    default:
      return I.see(text);
  }
});

Given('вижу элемент страницы {string}', (elemText) => {
  I.see(elemText);
  I.wait(1);
});


