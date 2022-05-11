const { I } = inject();

Given('я вижу модалное окно', () => {
    I.seeElementInDOM('.modal');
});

Given('соглашаюсь и ставлю галочку', () => {
    I.click('#check');
    I.wait(2);
});

Given('нажимаю на кнопку удалить курс', () => {
    I.click('.deleteCourse');
    I.wait(3);
});