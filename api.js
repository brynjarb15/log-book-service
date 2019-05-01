import express from 'express';
import cors from 'cors';
import csv from 'csv-express';
import bodyParser from 'body-parser';
import { flightTimesSchema } from './entities.js';
import mongoose from 'mongoose';
import uuidv4 from 'uuid/v4';
import { isDate } from 'util';

/**
 * Make numbers have leading 0
 * @param {*} number number to be changed 
 */
function makeNumberTwoDigit(number) {
	if (number < 10) {
		return '0' + number;
	}
	else return number.toString();
}

/**
 * Turn a date object in a string on the format YYYY/MM/DD hh:mm:ss
 * @param {*} date Date to be changed to string
 */
function dateToString(date) {
	const year = date.getFullYear();
	let month = makeNumberTwoDigit(date.getMonth() + 1); // returns from 0-11
	const day = makeNumberTwoDigit(date.getDate());
	const hour = makeNumberTwoDigit(date.getHours());
	const minute = makeNumberTwoDigit(date.getMinutes());
	const second = makeNumberTwoDigit(date.getSeconds());
	const timeString = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;
	return timeString;
}

const api = db => {

	const pass = '100713';
	const FlightTimes = db.model('FlightTimes', flightTimesSchema);

	var app = express();
	app.use(bodyParser.json());
	app.use(cors());


	// Initialize listen for app to listen on a specific port, either provided or hardcoded
	app.listen(process.env.PORT || 4000, () =>
		console.log('Listening on port 4000')
	);

	app.options('*', cors());
	// Hello world
	app.get('/', (req, res) => {
		console.log('We got a hit');
		res.json({ message: "Hello World" });
	});

	// Hello world
	app.get('/api', (req, res) => {
		res.json({ message: "Hello World API" });
	});

	app.get('/api/flightTimes', (req, res) => {
		FlightTimes.find({}).exec((err, flightTimes) => {
			if (err) {
				res.statusCode = 500;
				return res.send('Internal server error while getting flightTimes');
			} else {
				return res.send(flightTimes);
			}
		})
	});

	app.post('/api/flightTimes', (req, res) => {
		if (!req.body.hasOwnProperty('offBlock') || req.body.offBlock === '') {
			res.status = 412;
			return res.send('There must be a off block time');
		}
		let newLog = {
			_id: new mongoose.Types.ObjectId(),
			date: new Date(),
			offBlock: req.body.offBlock ? req.body.offBlock : '00:00',
			takeOff: req.body.takeOff ? req.body.takeOff : '00:00',
			landing: req.body.landing ? req.body.landing : '00:00',
			onBlock: req.body.onBlock ? req.body.onBlock : '00:00'
		};
		new FlightTimes(newLog).save(err => {
			if (err) {
				res.status = 500;
				return res.send('Failed to save flight times to db');
			} else {
				res.statusCode = 201;
				return res.send({
					id: FlightTimes(newLog)._id
				});
			}
		});

	});

}

module.exports = { api };
