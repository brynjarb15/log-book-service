/*
	In order for this to successfully run, there are 3 steps that need to be taken
	  1. npm install
	  2. yarn start

	After that the server runs on http://localhost:3000
*/

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import api from './api.js';
require('dotenv').config()

mongoose.Promise = global.Promise;
mongoose
	.connect(
		process.env.MONGO_DB_CONNECTION_STRING,
		{
			useMongoClient: true
		}
	)
	.then(db => {
		api.api(db);
	});
