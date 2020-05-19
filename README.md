## data-base-and-rest
____

#### Проект: https://vaitsehovskiy-tony.github.io/data-base-and-rest/

#### v0.0.2

#### Стек технологий: MongoDB, JavaScript, Git, Node.js, API REST


#### Практическая работа по взаимодействию с Mongo DB и использованию принципов API REST

* запрос на GET /users возвращает всех пользователей из базы;
* запрос GET /users/:userId возвращает конкретного пользователя;
* запрос POST /users создаёт пользователя;
* запрос GET /cards возвращает все карточки всех пользователей;
* запрос POST /cards создаёт карточку;

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
