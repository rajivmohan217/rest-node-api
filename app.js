const express = require('express');
const app = express();
const itemRoutes = require('./api/routes/items');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

//Routes
app.use(express.static('./public'));
app.use('/items', itemRoutes);

//Error Handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(404).json({
    error: {
      Status: error.status,
      message: error.message
    }
  });
});

module.exports = app;