const {I} = inject();

Given('вижу блок с кнопкой "Начать учиться"', () => {
    I.seeElement('.forAnonUserBlock');
    I.wait(1);
});