# Описание проекта

Это серверная часть учебного проекта **Blog** с использованием MongoDB и Express.  
Проект строится на разделении серверной (_Server_) и клиентской (_Client_) частей, что позволяет их независимую работу и раздельную разработку.

### Реализовано:

1. CRUD операции для статей, пользователей и комментариев.
2. Регистрация/Авторизация с JWT token.
3. Поиск по тегу, получение всех комментариев к статье.
4. Тесты для запросов.
5. Логирование и ограничение запросов.

### Планируется:

- Функция поиска по автору, содержанию, заголовку.
- Пагинация для удобной навигации по статьям.

## Запуск сервера.

1. Установите зависимости: _npm install_
2. В режиме разработки: _npm run dev_
3. В продакшн-режиме: _npm start_

## Тестирование

### Запуск тестов

Для корректного запуска тестов выполните следующие шаги:

1. **Закомментировать следующие участки**:

   - Логирование запросов.
   - Консольные логи запуска сервера и базы данных.
   - Функцию запуска сервера:
     ```javascript
     startServer();
     ```
     **Раскомментировать этот код**
     ```javascript
     if (require.main === module) {
       startServer();
     }
     ```
   - Для запуска тестов выполнить команду: _npm test_

2. **Вернуть эти участки после тестов**
   для рабочего старта сервера в продакшн-режиме.

### Возможные проблемы с тестами

После некорректного выполнения тестов могут возникнуть ошибки при повторном
запуске. Проверьте базу данных на наличие тестовых статей и комментариев, и
удалите их, чтобы избежать конфликтов.

```

```
