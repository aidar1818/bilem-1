const { I } = inject();

Given('я нажимаю на карточку курса', () => {
  I.click('.courseCard');
  I.wait(1);
});

Given('я нажимаю на ссылку редактирования урока', () => {
  I.click('.lessonEditBtn');
  I.wait(1);
});
