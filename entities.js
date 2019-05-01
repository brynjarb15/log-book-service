import mongoose from 'mongoose';

const { Schema } = mongoose;


const flightTimesSchema = new Schema({
	_id: Schema.Types.ObjectId,
	date: Date,
	offBlock: String,
	onBlock: String,
	takeOff: String,
	landing: String
});

const logBookSchema = new Schema({	
	_id: Schema.Types.ObjectId,	
	date: Date,	
	aircraftType: String,	
	aircraftIdent: String,	
	airportFrom: String,	
	airportTo: String,	
	offBlock: String,	
	onBlock: String,	
	picName: String,	
	noInstAppr: String,	
	noLandings: {	
		day: Number,	
		night: Number	
	},	
	singleEngine: Number,	
	multiEngine: Number,	
	crossCountry: Number,	
	dayTime: Number,	
	nightTime: Number,	
	instrument: {	
		actual: Number,	
		simulated: Number,	
		synthetic: Number,	
		typeAndDeviceNo: String	
	},	
	picTime: Number,	
	coPilotTime: Number,	
	dualReceivedTime: Number,	
	totalTime: Number,	
	remakrs: String	

 });	

 const planeSchema = new Schema({	
	_id: Schema.Types.ObjectId,	
	identMark: String,	
	type: String	
});	

 const airportSchema = new Schema({	
	_id: Schema.Types.ObjectId,	
	ident: String,
	name: String
 });


 module.exports = { logBookSchema, planeSchema, airportSchema, flightTimesSchema };
