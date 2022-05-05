var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require("./models/index")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var adminRouter = require('./routes/admin');
var csv = require('csv-express');

var errorHandler = require('errorhandler');
var {get_users} = require("./apis/admin/users");
var api = require("./apis/admin");

var helmet = require('helmet')

console.log(get_users({
  query: {
    page: 1,
  }
}));
var app = express();

// from https://www.npmjs.com/package/swagger-ui-express
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// 
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'HappyCows',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // files containing annotations as above
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJSDoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//Uncomment this line to place tables back in database
db.Users.sync();
db.UserCommons.sync();
db.Commons.sync();
db.CommonsHealth.sync();
db.Configs.sync();
db.Cows.sync();
db.TieredTaxings.sync();
db.UserWealths.sync();
db.CommonsUserReport.sync();
db.CommonsUserReportItem.sync();

//testing api section
// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.use( express.static( "public" ) );
app.use('/public',express.static(path.join(__dirname,'static')));
app.set('view engine','ejs');

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  res.render('500', { error: err });
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);

app.use(helmet())
// catch 404 and forward to error handler
app.use(errorHandler());
module.exports = app;
