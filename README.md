## data-base-and-rest
____

#### Проект доступен по следующим адресам:
#### 130.193.45.99
#### http://tony-vaits-mesto.site
#### https://tony-vaits-mesto.site

#### v0.0.3

#### Стек технологий: MongoDB, JavaScript, Git, Node.js, API REST


#### Практическая работа по взаимодействию с Mongo DB и использованию принципов API REST

* запрос на GET /users возвращает всех пользователей из базы;
  GET http://localhost:3000/users

* запрос GET /users/:userId возвращает конкретного пользователя;
  GET http://localhost:3000/users/<-ID пользователя->

* запрос POST /users создаёт пользователя;
  POST http://localhost:3000/users

* запрос GET /cards возвращает все карточки всех пользователей;
  GET http://localhost:3000/cards
  
* запрос POST /cards создаёт карточку;
  POST http://localhost:3000/cards

##### Development-сборка собирается командой npm run dev по адресу [localhost](http://localhost:3000/)


Список подключенных модулей 

 * app.js - основной модуль  
 * controllers/cards.js - контроллер с функциями карточек  
 * controllers/users.js - контроллер с функциями пользователей  
 * models/card.js - модель карточки  
 * models/user.js - модель пользователя  
 * routes/cards.js - роутер карточек  
 * routes/users.js - роутер пользователей  

__________________
