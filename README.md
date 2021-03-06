# HappyCows
A digital simulation game used as a teaching tool for Professor de Vries at UCSB on the Tragedy of the Commons. 

<p align="center">
<img src="https://media.giphy.com/media/W54Zt0bgS87x6/giphy.gif" width="50%" alt="gif">
</p>

## Users Page
<p align="center">
<img src="public/gif/UserDemo.gif" width="90%" alt="gif">
</p>

## Admin Page
<p align="center">
<img src="public/gif/AdminDemo.gif" width="90%" alt="gif">
</p>

## Getting Started
You can run this program by using this command: (although you might need to install some dependencies first)
```bash
./bin/www 
```
You can access the game by visiting 127.0.0.1:3000 <br>
You can also access subpages like so 127.0.0.1:3000/subpagename

**Resetting Tables** <br>
If the tables are corrupted in the database you can drop the tables<br>
The uncomment out these functions from app.js
```javascript
//db.Users.sync();
//db.UserCommons.sync();
//db.Commons.sync();
//db.Configs.sync();
//db.Cows.sync();
//db.TieredTaxings.sync();
//db.UserWealths.sync();
```
Then run: 
```bash
node app.js 
```

**Running Locally** <br>
Install MySQL on your computer and change accordingly in `config/config.js`.  

Then, you can create tables by following command:
```bash
npx sequelize-cli db:migrate 
```
Or you can use following script to force update tables:
```javascript
var db = require("models/index")
db.Users.sync({force: true});
....
```
Or you can uncomment out these functions from app.js :
```javascript
//db.Users.sync();
//db.UserCommons.sync();
//db.Commons.sync();
//db.Configs.sync();
//db.Cows.sync();
//db.TieredTaxings.sync();
//db.UserWealths.sync();
```
Then run: 
```bash
./bin/www
```

If you want to have demo data, run following command: (no demo data here so will not work currently)
```bash
./bin/www
```

## Info
For maintainable application, we have all the database structure logic inside the models folder. 
We have automatic table creation if they don't exist in database which sequelize provides in the bin/www file - models.sequelize.sync().
We just need to worry about setting up the tables properly which are all located in the models folder. Note when we change data in models, we might need to modify the migrations file of that model. 

The SQL queries could be found under the apis folder which we have separated for those needed for the admin as well as for users. We also have a folder named "sql" which holds the cron jobs needed to run the game. These need to be manually added onto the server seperately. 

The seeders folder allows us to put in sample data so we could run "npx sequelize-cli db:seed:all" command to put it in our data table. Although we did not put any data into this folder so it would not work.

## How to write APIs
**STEP 1**   
Create `[your_name].js` at `/routes` directory with following content
```javascript
var express = require('express');
var router = express.Router();

module.exports = router;
```
**STEP 2**   
Importing `route/[your_name].js` in `/app.js`
```javascript
var yourNameRouter = require('./routes/your_name');
```
And add following line to register your route:
```javascript
app.use('/yourName', yourNameRouter);
```
Now `http://server/yourName/*` is all yours.

**STEP 3**   
Create file `/apis/your_name/your_api.js` and write your api functions like
```javascript
var db = require("../../models/index"); // model is defined in /model
// assume table banana exists
// get all bananas
function get_banana(req, res) {
  db.Banana.findAll().then((dbRes)=>{
    res.json({success: true, data: dbRes}) // send json request back
  })
}
module.exports = {get_banana};
```
For `req` and `res` structs, refer to expressjs docs.  
For `db` struct, refer to sequelize docs.

**STEP 4**   
Import `/apis/your_name/your_api.js` at `route/[your_name].js`
```javascript
var {get_banana} = require("../apis/admin/users");
```
And register the subroute
```javascript
router.get('/banana', get_banana);
```
Now you can use curl to test it out or visit with browser directly!

## Backend Stack 
* MySQL
* Sequelize
* Express.js
* Node.js

## Reference Docs

### Express Article
http://sequelize.readthedocs.io/en/1.7.0/articles/express/

### Helpful article on sequelize associations
https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/

### Helpful article explaining migrations & seeds 
https://sequelize.org/master/manual/migrations.html

### RESTful Info
https://www.restapitutorial.com/lessons/restquicktips.html  

### Queries
https://sequelize.org/master/manual/raw-queries.html

# Running on Heroku



To run on Heroku, you will need to do the following:

1. Create a Heroku app
2. Add the Cleardb MySQL add on.
3. Set these config variables (e.g. with `heroku config:edit -a myapp.herokuapp.com`)

```
CLEARDB_DATABASE_URL='insert-value-here'
DB_HOSTNAME='copy-from-databaseurl'
DB_NAME='copy-from-databaseurl'
DB_PASSWORD='copy-from-databaseurl'
DB_USERNAME='copy-from-databaseurl'
GOOGLE_OAUTH_CALLBACK_URL='https://happycows.herokuapp.com/users/auth_callback'
GOOGLE_OAUTH_CLIENT_ID='get-from-google-developer-console'
GOOGLE_OAUTH_CLIENT_SECRET='get-from-google-developer-console'
NODE_ENV=production
```

This should get you to a login screen. 

# Adding an admin user on Heroku

1. Then, to get an admin user, login in once to establish the user in the users table.
2. Access the database using a mysql client.  At the command line, break up the url like this:
   ```
   mysql -u siduffsdf --password=s8sdf -h us-cdbr-east-05.cleardb.net -D heroku_1234abcd56789
   ```
3. Modify the user desired as shown below


```
mysql> show tables;
+----------------------------------+
| Tables_in_heroku_9021cdae5397029 |
+----------------------------------+
| commons                          |
| commonshealths                   |
| configs                          |
| cows                             |
| tieredtaxings                    |
| usercommons                      |
| users                            |
| userwealths                      |
+----------------------------------+
8 rows in set (0.11 sec)

mysql> select * from users;
+----+-----------+----------+-----------------+------+--------------------------------------+---------------------+---------------------+
| id | firstName | lastName | email           | type | token                                | createdAt           | updatedAt           |
+----+-----------+----------+-----------------+------+--------------------------------------+---------------------+---------------------+
|  4 | Phill     | Conrad   | phtcon@ucsb.edu | user | 1484ce90-cb21-11ec-ba92-6739fc9837e6 | 2022-05-03 20:39:08 | 2022-05-03 20:39:08 |
+----+-----------+----------+-----------------+------+--------------------------------------+---------------------+---------------------+
1 row in set (0.11 sec)

mysql> update users set type='admin' where id='4';
Query OK, 1 row affected (0.35 sec)
Rows matched: 1  Changed: 1  Warnings: 0

mysql> select * from users;
+----+-----------+----------+-----------------+-------+--------------------------------------+---------------------+---------------------+
| id | firstName | lastName | email           | type  | token                                | createdAt           | updatedAt           |
+----+-----------+----------+-----------------+-------+--------------------------------------+---------------------+---------------------+
|  4 | Phill     | Conrad   | phtcon@ucsb.edu | admin | 1484ce90-cb21-11ec-ba92-6739fc9837e6 | 2022-05-03 20:39:08 | 2022-05-03 20:39:08 |
+----+-----------+----------+-----------------+-------+--------------------------------------+---------------------+---------------------+
1 row in set (0.11 sec)

mysql> exit
Bye
```
