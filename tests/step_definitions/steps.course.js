const {I} = inject();

Given('я создаю {string} курс', (type) => {
  I.amOnPage('/teaching/new');
  I.click('Создать курс');
  I.click(`Создать ${type} курс`);

  const courseTable = {
    rows: [
      {cells: [{value: 'title'}, {value: 'Программирование для начинающих'}]},
      {cells: [{value: 'description'}, {value: 'Окунитесь в увлекательный мир программирования!'}]},
    ],
  };

  if (type === 'платный') {
    courseTable.rows.push({cells: [{value: 'price'}, {value: '5000'}]});
  }

  courseTable.rows.forEach(row => {
    I.fillField(row.cells[0].value, row.cells[1].value);
  });

  I.click('mat-form-field mat-select[name=category]');
  I.click('mat-option:nth-child(1)');
  I.wait(1);
  I.click('mat-form-field mat-select[name=subcategory]');
  I.click('mat-option:nth-child(1)');
  I.attachFile('div input[type=file]', 'test_data/course.jpg');
  I.wait(1);

  I.click('Создать курс', {css: 'form'});

  I.see('Создан новый курс');

  I.see('Программирование для начинающих');

  I.click('button span mat-icon[id=editCourse]');
  I.wait(1);
  I.click('Редактировать');

  I.click('Добавить модуль', {css: 'form'});
  I.click('Добавить урок', {css: 'form'});

  const moduleTable = {
    rows: [
      {cells: [{value: 'Название модуля'}, {value: 'Первый модуль'}]},
      {cells: [{value: 'Название урока'}, {value: 'Знакомство с версткой'}]},
    ],
  };

  moduleTable.rows.forEach(row => {
    I.fillField(row.cells[0].value, row.cells[1].value);
  });

  I.click('Сохранить', {css: 'form'});
});