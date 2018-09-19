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

router.get('/all', (req, res, next) => {
	let getALLItems = 'SELECT * FROM products_b';
	connection.query(getALLItems, (err, results, fields) => {
		if (err) {
			res.status(500).json({
				Error: err.sqlMessage
			});
		} else {
			res.status(200);
			res.send(results);
		}
	});
});

router.get('/:itemname', (req, res, next) => {
	let singleItemQuery = 'SELECT * FROM PRODUCTS_B WHERE ITEMNUMBER=?';
	connection.query(singleItemQuery, req.params.itemname, (err, results, fields) => {
		if (err) {
			res.status(500).json({
				message: err.sqlMessage
			});
		} else {
			res.status(200);
			res.send(results);
		}
	});
});

router.post('/', (req, res, next) => {
	let insertItems = 'INSERT INTO products_b SET ?';
	var insertItemsValues = {
		"itemnumber": req.body.itemname,
		"itemdescription": req.body.description,
		"status": req.body.status,
		"price": req.body.price
	};
	connection.query(insertItems, insertItemsValues, (err, results, fields) => {
		if (err.code === 'ER_DUP_ENTRY') {
			res.status(500).json({
				Error: `\'${req.body.itemname}\'  already exists`
			});
		} else if (err) {
			res.status(500).json({
				Error: err.sqlMessage
			});
		} else {
			res.status(200).json({
				message: 'Item is created!!',
				itemnumber: req.body.itemname,
				itemdescription: req.body.description,
				status: req.body.status,
				price: req.body.price
			});
		}
	});
});

router.patch('/', (req, res, next) => {
	let updateQuery = 'UPDATE PRODUCTS_B SET itemdescription =?, price= ?, status= ? WHERE itemnumber = ? ';
	connection.query(updateQuery, [req.body.description, req.body.price, req.body.status, req.body.itemname], (err, results, fileds) => {
		if (err) {
			res.status(500).json({
				Error: err.sqlMessage
			});
		} else {
			res.status(200).json({
				message: 'Item is updated!!',
				itemnumber: req.body.itemname,
				itemdescription: req.body.description,
				status: req.body.status,
				price: req.body.price
			});
		}
	});
});

router.delete('/', (req, res, next) => {
	let deleteQuery = 'DELETE FROM PRODUCTS_B WHERE itemnumber = ? ';
	connection.query(deleteQuery, req.body.itemname, (err, results, fileds) => {
		if (err) {
			res.status(500).json({
				Error: err.sqlMessage
			});
		} else {
			res.status(200).json({
				message: `\'${req.body.itemname}\' is deleted!!`
			});
		}
	});;
});

router.post('/createitemui', (req, res, next)=> {
	console.log('item route!');	
	res.status(200).json({
		message: 'Item Created Successfully!'
	});
});

module.exports = router;