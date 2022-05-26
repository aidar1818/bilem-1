const { I } = inject();

Given('я должен увидеть курсы, которые прохожу', () => {
    I.seeElementInDOM('.learning');
    I.wait(1);
});

Given('я должен увидеть курсы, которые хочу пройти', () => {
    I.seeElementInDOM('.favorite');
    I.wait(1);
});