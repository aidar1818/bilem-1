const { I } = inject();

Given('навожу курсор на категорию', () => {
  I.moveCursorTo('.category__title');
  I.wait(1);
});

Given('нажимаю на ссылку добавления новой подкатегории', () => {
  I.click('.add-sub-btn');
});

Given('нажимаю на кнопку редактировать подкатегорию', () => {
  I.click('.edit-subcategory');
  I.wait(1);
});

Given('нажимаю на кнопку удалить подкатегорию', () => {
  I.click('.remove-subcategory');
  I.wait(1);
});

