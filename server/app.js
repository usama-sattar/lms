var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cors = require('cors')
const session = require("express-session")
var passport = require('passport')
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth')

/*
used mogo atlas cloud
email: denimblue.29@qbknowsfq.com
password: 12345crud

*/
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credntials: true,
  })
);
//database connection
const uri = "mongodb+srv://usama:12345crud@crud.tfh24.mongodb.net/Database?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("database established");
});

app.use(
  session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
})
);
app.use(passport.initialize());
app.use(passport.session());
require("./passport")(passport);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css/'))
app.use(express.static(path.join(__dirname, 'public')));


app.use(authRouter)
app.use(usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.send(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`server starting at ${PORT}`));

module.exports = app;
