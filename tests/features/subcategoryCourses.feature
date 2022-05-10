#language:ru
#noinspection NonAsciiCharacters

Функционал: Отображение курсов подкатегорий
  Для того, чтобы пользователь мог найти соответствующие курсы из подкатегории
  Как обычный пользователь
  Я должен видеть курсы этой подкатегории

  @clickInSubcategoriesCourses
  Сценарий: Отображение курсов подкатегорий
    Допустим я залогиненный "пользователь"
    И навожу курсор на Категории в разделе toolbar
    И навожу курсор на категорию
    Если навожу курсор на подкатегорию
    То я должен увидеть курсы этой подкатегории