const { I } = inject();

Given('я нахожусь на странице {string}', (page) => {
  switch (page) {
    case 'Регистрация':
      return I.amOnPage('/register');
    case 'Восстановление пароля':
      return I.amOnPage('/recovery');
    case 'Логин':
      return I.amOnPage('/login');
    case 'Редактирование пароля':
      return I.amOnPage('/newPassword');
    case 'Курсы':
      return I.amOnPage('/teaching/courses');
    case 'Новый курс':
      return I.amOnPage('/teaching/new');
    case 'Создание нового модуля':
      return I.amOnPage('/editModule/:id');
    case 'Преподавание':
      return I.amOnPage('/teaching/courses');
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
    case 'Создать курс':
      return I.click(buttonText);
      case 'Поступить на курс':
        I.click(buttonText);
        I.wait(1);
        break;
      case 'Хочу пройти':
       I.click(buttonText);
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
  I.see(text);
  I.wait(3);
});

Given('вижу элемент страницы {string}', (elemText) => {
  I.see(elemText);
  I.wait(1);
});


