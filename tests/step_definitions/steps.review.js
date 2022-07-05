const {I} = inject();

Given('я являюсь студентом данного курса', () => {
  I.click('.card-wrapper a');

  I.click('Поступить');
});

Given('я оставляю отзыв к курсу', () => {
  I.see('Оставьте свой отзыв');

  I.click(`.star`);

  const courseTable = {
    rows: [
      {cells: [{value: 'text'}, {value: 'Отличный курс!'}]},
    ],
  };

  courseTable.rows.forEach(row => {
    I.fillField(row.cells[0].value, row.cells[1].value);
  });

  I.click(`Оставить отзыв`);
  I.wait(1);

  I.see('Отзыв успешно добавлен');

  I.see('Отличный курс!', {css: 'div'});
});

Given('я вижу сообщение {string}', (text) => {
  I.see(text);
});