const {I} = inject();

Given('выбираю категорию, подкатегорию, картинку:', () => {
  I.click('mat-form-field mat-select[name=category]');
  I.click('mat-option:nth-child(1)');
  I.wait(1);
  I.click('mat-form-field mat-select[name=subcategory]');
  I.click('mat-option:nth-child(1)');
  I.attachFile('div input[type=file]', 'test_data/course.jpg');
  I.wait(1);
});

Given('на старнице преподования увидеть новый созданый курс {string}', (text) => {
  I.see(text);
  I.wait(2);
});