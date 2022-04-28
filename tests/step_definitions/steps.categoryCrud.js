const { I } = inject();

Given('навожу курсор на Катергории в разделе toolbar', () => {
    I.moveCursorTo('.dropbtn');
    I.wait(1);
});

Given('нажимаю на ссылку +', () => {
    I.click('.add-btn');
});

Given('нажимаю на кнопку редактировать', () => {
    I.click('.edit');
    I.wait(1);
});

Given('я очищаю поле {string}', (field) => {
    console.log(field)
    I.clearField(field);
    I.wait(5);
});

Given('нажимаю на кнопку удалить', () => {
    I.click('.delete');
    I.wait(3);
});

Given('убираю курсор', () => {
    I.moveCursorTo('.logo');
});