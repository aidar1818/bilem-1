const { I } = inject();

Given('нажимаю на ссылку формы {string}', (linkText) => {
  I.click(linkText, {css: 'form'});
});


