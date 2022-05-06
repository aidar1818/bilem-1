const { I } = inject();

Given('я кликаю по карточке курса', () => {
    I.click('.card-wrapper a');
    I.wait(1);
});

Given('я вижу название курса', () => {
    I.seeElementInDOM('.course-title');
    I.wait(1);
});

Given('я кликаю по карточке курса {string}', (text) => {
    I.click(`//a//i[contains(text(),'${text}')]`);
});

Given('я вижу название курса {string}', (text) => {
    I.see(text);
});

Given('я вижу название {string}', (text) => {
    I.see(text);
});

Given('я вижу кнопку {string}', (text) => {
    switch (text) {
        case 'Поступить на курс':
            I.see(text);
            I.wait(1);
            break;
        case 'Хочу пройти':
            I.see(text);
            I.wait(1);
            break;
        case 'Редактировать содержание':
            I.see(text);
            I.wait(1);
            break;
        default:
            break;
    }
});

Given('я нахожусь на странице', (page) => {
    I.amOnPage(page);
})