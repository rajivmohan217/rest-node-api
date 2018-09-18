const express = require('express');
const router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
	host : process.env.DB_HOST,
	user : process.env.DB_USER,
	database : process.env.DB_NAME
});

connection.connect((err) => {
	if (err) {
		console.log(err);		
	} else {
		console.log('Connection Successfull!');
		
	}
});

router.get('/',(req, res, next) => {
	let sql = 'SELECT * FROM products_b' ;
	connection.query(sql, (err, rows, fields) => {
		if (err) {
			res.status(500).json({
				message : err.sqlMessage
			});				
		} else {
			res.status(200);
			res.send(rows);
		}
	});	
});


router.get('/:itemname',(req, res, next) => {
	let sql = 'SELECT * FROM products_b where itemnumber ?';
	connection.query(sql, req.param.itemname, (err, rows, fields) => {
		if (err) {
			res.status(500).json({
				message: err.sqlMessage});			
		} else {
			res.status(200).json({
				message : 'Handling GET Request!',
				itemname : rows.itemnumber
			});
		}
	});	
});

router.post('/',(req, res, next) => {
	let sql = 'INSERT INTO products_b SET ?';
	var sqlValues = {
		"itemnumber" : req.body.itemname,
		"itemdescription" : req.body.description, 
		"status" : req.body.status,
		"price" : req.body.price
	};
	connection.query(sql, sqlValues, (err, rows, fields) => {
		if (err) {
			console.log(err);
			res.status(500).json({
				message : err.sqlMessage
			});			
		} else {
			console.log('Record inserted');	
			res.status(200).json({
				message : 'Item is created!!',
				itemnumber : req.body.itemname,
				itemdescription : req.body.description, 
				status : req.body.status,
				price : req.body.price		
			});
	}
	
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
