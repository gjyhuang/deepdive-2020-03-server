# deepdive-2020-03-server
Built during BrightCode.dev's March 2020 Deep Dive course.

## Terminal commands:

Day 03

* npm init
* npm install express sequelize sequelize-cli --save
* npx sequelize-cli init
* npm install dotenv --save
* git init
* touch .gitignore
* **npx sequelize-cli model:generate --name Question --attributes body:string,instructions:string**
* **npx sequelize-cli model:generate --name Option --attributes body:string,imageUrl:string**
* **npx sequelize-cli model:generate --name QuestionOption --attributes questionId:integer,optionId:integer,isAnswer:boolean**
* npx sequelize-cli seed:generate --name question-seed
