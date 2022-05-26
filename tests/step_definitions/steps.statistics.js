const { I } = inject();

Given('я вижу сайдбар со статистикой, уроками и курсами', () => {
  I.seeElement('.main');
  I.wait(1);
});

Given('я нажимаю на ссылку статистика', () => {
  I.click('.statistics');
  I.wait(1);
});

Given('я вижу блок со данными по статистике пользователя', () => {
  I.seeElement('.main-div');
  I.wait(1);
});