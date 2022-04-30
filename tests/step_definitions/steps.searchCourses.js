const { I } = inject();

Given('я должен увидеть курсы с подходящим названием', () => {
    I.see('Java Script', '.title');
    I.wait(3);
});

Given('я должен увидеть бесплатные курсы с подходящим названием', () => {
    I.see('Java Script', '.title');
    I.see('Бесплатно', '.free');
    I.wait(2);
});

Given('отмечаю галочкой "Бесплатные курсы"', () => {
    I.click('#checkbox');
    I.wait(2);
});

Given('я ввожу в поле поиска в шапке сайте:', (table) => {
    table.rows.forEach(row => {
        I.fillField(row.cells[0].value, row.cells[1].value);
    });

    I.wait(2);
});

Given('нажимаю на {string} из списка', (c) => {
    I.click(c, '.course-title');
});