const { I } = inject();

Given('в футере я нажимаю на ссылку {string}', (linkTitle) => {
    I.click(linkTitle);
    I.wait(1);
});
