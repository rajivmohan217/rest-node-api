const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/',(req, res, next) => {
	res.status(200).json({
		message : 'Handling GET Request!'
	});
});

router.post('/',(req, res, next) => {
	res.status(200).json({
		message : 'Handling Post Request!'
	});
});

router.patch('/',(req, res, next) => {
	res.status(200).json({
		message : 'Handling Patch Request!'
	});
});

router.delete('/',(req, res, next) => {
	res.status(200).json({
		message : 'Handling delete Request!'
	});
});



module.exports = router;
