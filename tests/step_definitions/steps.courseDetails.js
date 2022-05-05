const { I } = inject();

Given('я кликаю по карточке курса', () => {
    I.click('.card-wrapper a');
    I.wait(1);
});

Given('я вижу название курса', () => {
    I.seeElementInDOM('.course-title');
    I.wait(1);
});

Given('я вижу кнопку {string}', (text) => {
    I.see(text, {css: '.buttons button'});
    I.wait(1);
});