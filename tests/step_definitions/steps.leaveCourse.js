const {I} = inject();

Given('я нажимаю на кнопку "Удалить" у курса', () => {
    I.click('more_vert');
    I.wait(1);

    I.click('Удалить');
});

Given('я добавил курс в избранное', () => {
    I.click('Java Script');
    I.wait(1);

    I.seeElementInDOM('.course-title');
    I.wait(1);

    I.click('Хочу пройти');
    I.wait(1);
});

Given('я купил курс', () => {
    I.click('Java Script');
    I.wait(1);

    I.seeElementInDOM('.course-title');
    I.wait(1);

    I.click('Поступить на курс');
    I.wait(1);
});

Given('я нажимаю на кнопку "Покинуть" у курса', () => {
    I.click('Покинуть');
});

Given('я нажимаю на кнопку "Пройти курс" у курса', () => {
    I.click('Пройти курс');
});