const { I } = inject();
// Add in your custom step files

Given('я нахожусь на странице {string}', (page) => {
  switch (page) {
    case 'Регистрация':
      return I.amOnPage('/register');
    case 'Логин':
      return I.amOnPage('/login');
    default:
      return I.amOnPage('/');
  }
});

Given('я ввожу в поля формы:', (table) => {
  table.rows.forEach(row => {
    I.fillField(row.cells[0].value, row.cells[1].value);
  });

  I.wait(3);
});

Given('нажимаю на кнопку формы {string}', (buttonText) => {
  I.click(buttonText, {css: 'form'});
  I.wait(3);
});

Then('я должен увидеть текст {string}', (text) => {
  I.see(text);
});

// Given('я нахожусь на странице регистрации', () => {
//   I.amOnPage('/login');
//
// });
//
// Given('я ввожу в поля формы:', (table) => {
//   table.rows.forEach(row => {
//     I.fillField(row.cells[0].value, row.cells[1].value);
//   });
//
//   I.wait(3);
// });
//
// Given('нажимаю на кнопку формы {string}', (buttonText) => {
//   I.click(buttonText, {css: 'form'});
//   I.wait(3);
// });
//
// Then('я должен увидеть текст {string}', (text) => {
//   I.see(text);
// });
