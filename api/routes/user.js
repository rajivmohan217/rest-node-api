const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	database: process.env.DB_NAME
});

connection.connect((err) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Connection Successfull!');
	}
});

router('/signup', (req, res, error) => {
	res.status(200).json({
		message: 'Signup Action'
	});
});

router('/login', (req, res, error) => {
	res.status(200).json({
		message: 'login'
	});
});

module.exports = router;