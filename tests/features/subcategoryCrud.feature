#language:ru
#noinspection NonAsciiCharacters

Функционал: Создание, редактирование и удаление подкатегории
  Для того, чтобы пользователь мог найти соответствующую подкатегорию курсов
  Я, исполняя роль администратора, должен иметь возможность создавать, редактировать и удалять подкатегории


  @add_new_subcategory
  Сценарий: Создание новой подкатегории
    Допустим я залогиненный "администратор"
    И навожу курсор на Категории в разделе toolbar
    И навожу курсор на категорию
    И нажимаю на ссылку добавления новой подкатегории
    И я нахожусь на странице "Создание подкатегории"
    И убираю курсор
    Если я ввожу в поля формы:
      | Название новой подкатегории | Таргет |
    И нажимаю на кнопку формы "Создать"
    То я должен увидеть текст "Успешное создание подкатегории!"


  @edit_subcategory
  Сценарий: Редактирование подкатегории
    Допустим я залогиненный "администратор"
    И навожу курсор на Категории в разделе toolbar
    И навожу курсор на категорию
    И нажимаю на кнопку редактировать подкатегорию
    И убираю курсор
    И я очищаю поле "Измененное название"
    Если я ввожу в поля формы:
      | Измененное название | ТЕСТ |
    И нажимаю на кнопку формы "Обновить"
    То я должен увидеть текст "Название подкатегории изменено!"

  @delete_subcategory
  Сценарий: Удаление подкатегории
    Допустим я залогиненный "администратор"
    И навожу курсор на Категории в разделе toolbar
    И навожу курсор на категорию
    И нажимаю на кнопку удалить подкатегорию
    То я должен увидеть текст "Успешное удаление подкатегории!"