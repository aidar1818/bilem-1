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

Given('нажимаю на кнопку {string}', (buttonText) => {
  switch (buttonText) {
    case 'Редактировать':
      I.click('button span mat-icon[id=editCourse]');
      I.wait(1);
      return I.click(buttonText);
    case 'Создать курс':
      return I.click(buttonText);
    default:
      return I.click(buttonText);
  }
});

Then('я должен увидеть текст {string}', (text) => {
  I.see(text);
  I.wait(2);
});


