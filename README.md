Spaced-Repetiton Server
Live at: https://chaddrake-spaced-repetition.herokuapp.com/
API DOCUMENTATION
/api/auth/token POST takes in a username and password value. It will return an auth token.
/api/auth/token PUT takes in an auth token just before expiry. it will return a new auth token.
/api/user POST takes in a username, password, and name. It will return a serialized version oif the user it creates in the database.
/api/language GET returns the user language and an array of word objects.
/api/language/head GET returns the next word object for someone to learn.
/api/language/guess POST takes in a user's guess and returns an object holding data on their correct and incorrect counts, total score, if they got it right, and their next word.

Summary
This is a server for the spaced repetition client. The app allows a user to learn a new language using spaced repetition. It allows a user to log in and persist their data as well.

![register](/images/register.PNG)
![login](/images/login.PNG)
![dashboard1](/images/dashboard1.PNG)
![dashboard2](/images/dashboard2.PNG)
![guess](/images/guess.PNG)
![correct](/images/correct.PNG)
![incorrect](/images/incorrect.PNG)

Technologies: 
When building this server, knex, postgress, express, javascript, chai, mocha, nodemon, bcrypt, and json web token were used.
