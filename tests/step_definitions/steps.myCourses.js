const {I} = inject();

Given('я добавил курс на страницу {string}', (courses) => {
  I.click('Java Script');
  I.wait(1);

  I.seeElementInDOM('.course-title');
  I.wait(1);

  const learnBtn = courses.split(',')[1] ? 'Хочу пройти' : 'Поступить на курс';

  I.click(learnBtn);
  I.wait(1);

  const message = courses.split(',')[1] ? 'Добавлен в список желаний' : 'Добавлен в мои курсы';

  I.see(message);

  const page = courses.split(',')[1] ? 'favorite' : 'learning';

  I.amOnPage(`/myCourses/${page}`);

  const card = courses.split(',')[1] ? '.favorite' : '.learning';

  I.seeElementInDOM(card);
  I.wait(1);
});

Given('я прошел курс', () => {
  I.click('Продолжить');
  I.wait(1);

  I.click('Следующий урок');
  I.wait(1);

  I.click('Мои курсы');
  I.wait(1);

  I.see('50%');
});
