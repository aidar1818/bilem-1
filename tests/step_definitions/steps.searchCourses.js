const { I } = inject();

Given('я должен увидеть курсы с подходящим названием', () => {
    I.see('Java Script');
    I.wait(3);
});

Given('я должен увидеть уроки с подходящим названием', () => {
    I.see('Алгоритм');
    I.wait(3);
});

Given('я должен увидеть бесплатные курсы с подходящим названием', () => {
    I.see('Java Script', '.title');
    I.see('Бесплатно', '.free');
    I.wait(2);
});

Given('нажимаю на {string} из списка', (c) => {
    I.click(c, '.mat-option-text');
});