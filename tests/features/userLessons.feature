#language:ru

#noinspection NonAsciiCharacters

Функционал: Просмотр, редактирование и удаление созданных пользователем уроков
  Я как пользователь должен иметь возможность просмотреть созданные мною уроки, а так же редактировать и удалять их

  @user_view_lesson
  Сценарий: Просмотр уроков созданных пользователем
    Допустим я залогиненный "пользователь"
    И я нажимаю на ссылку "Преподавание"
    И я нажимаю на ссылку "Уроки"
    Тогда я должен увидеть уроки которые создал

  @user_edit_lesson
  Сценарий: Редактирование уроков созданных пользователем
    Допустим я залогиненный "пользователь"
    И я нажимаю на ссылку "Преподавание"
    И я нажимаю на ссылку "Уроки"
    И нажимаю на кнопку "Вертикальное троеточие"
    И нажимаю на кнопку "Редактировать урок"
    И я очищаю поле "Название урока"
    И я очищаю поле "Описание"
    И я очищаю поле "Ссылка на видео"
    И я ввожу в поля формы:
      | Название урока  | Тестовый урок номер 1                   |
      | Описание        | Описание тестового урока номер 1        |
      | Ссылка на видео | Ссылка на видео тестового урока номер 1 |
    И нажимаю на кнопку формы "Сохранить изменения"
    Тогда я должен увидеть текст "Данные урока успешно сохранены!"

  @user_remove_lesson
  Сценарий: Удаление уроков созданных пользователем
    Допустим я залогиненный "пользователь"
    И я нажимаю на ссылку "Преподавание"
    И я нажимаю на ссылку "Уроки"
    И нажимаю на кнопку "Вертикальное троеточие"
    И нажимаю на кнопку "Удалить урок"
    Тогда я должен увидеть текст "Урок успешно удален!"