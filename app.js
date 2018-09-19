const express = require('express');
const app = express();
const itemRoutes = require('./api/routes/items');
const morgan = require('morgan');
const bodyParser = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());

app.use(express.static('./public'));

app.use('/items', itemRoutes);

app.use((req, res, next) => {
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(404).json({
		error: {
			message: error.message
		}
	});
});

module.exports = app;