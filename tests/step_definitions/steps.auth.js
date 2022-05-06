const { I } = inject();

Given('я залогиненный {string}', (role) => {
  I.amOnPage('/login');

  const email = role === 'администратор' ? 'admin@bilem.com' : 'user@bilem.com';
  const table = {
    rows: [
      {cells: [{value: 'Email'}, {value: email}]},
      {cells: [{value: 'Пароль'}, {value: '123asdA!'}]},
    ],
  };

  table.rows.forEach(row => {
    I.fillField(row.cells[0].value, row.cells[1].value);
  });

  I.click('Войти', {css: 'form'});

  I.wait(2);

  I.see('Вход выполнен');
});