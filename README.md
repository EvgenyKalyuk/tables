# Tables

Task
---------

На сайте Зарплата.ру при загрузке страницы http://www.zarplata.ru/vacancy происходят клиентские запросы в API для получения и отображения списка вакансий.
 
Используя это API необходимо сделать отчёт по вакансиям, добавленным в Новосибирске за текущий день.
 
Отчёт должен содержать две таблицы:
1) топ вакансий по рубрикам;
2) топ слов по упоминанию их в заголовках вакансий.
2) топ слов по упоминанию их в заголовках вакансий.
Желаемая структура:
Для таблицы 1:
| Рубрика 1 | Количество вакансий  |
| Рубрика 2 | Количество вакансий  |
| Рубрика 3 | Количество вакансий  |
......                           
Для таблицы 2:
| Программист | Количество вакансий |
| 1С | Количество вакансий |
| Мастер | Количество вакансий |

Remarks:
------

Задание сделано в двух ветках:
* maser - минимальное использование redux;
* redux - данные, полученные из api, хранятся в store;

Structure:
--------

* common - константы;
* components - переиспользуемые компоненты;
* containers - умные компоненты;
* helpers - вспомогательные функции;
* modules - модули приложение;
* store - redux логика; 
    

Technologies
----------

- [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- [Pug](https://pugjs.org)
- [Babel](https://github.com/babel/babel)
- [Webpack 4.x](https://github.com/webpack/webpack)


Develop Mode
--------------------

Install dependencies:

>yarn

or

>npm install

For start the server:

>yarn start

or

>npm start

Production Mode
--------------------

Install dependencies:

>yarn

or

>npm install

For build static

>yarn build

or

>npm run build

For run prod server

>yarn start-prod

or

>npm run start-prod



