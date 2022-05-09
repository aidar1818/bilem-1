const { I } = inject();

Given('я вижу сайдбар уроков', () => {
  I.seeElement('.lessonSidebar');
  I.wait(1);
});

Given('я нажимаю на ссылку с названием урока', () => {
  I.click('.lessonTitle');
  I.wait(1);
});

