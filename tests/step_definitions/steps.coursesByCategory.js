const { I } = inject();

Given('нажимаю на заголовок категории', () => {
    I.click('.category__title');
});

Given('нажимаю на заголовок подкатегории', () => {
    I.click('.subcategory__title');
});
