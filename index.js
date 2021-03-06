const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;
const option = {
	useMongoClient: true
};

mongoose.connect(config.uri, option,(err) => {

	if(err) {
		console.log('Could not connect to database: ' + config.db);
	}else{
		console.log('Connected to database: ' + config.db);
	}
});

app.use(cors({
	origin: 'http://localhost:4200'
}));

app.use(bodyParser.urlencoded({extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});


app.listen(8080, () => {
	console.log('Listening on port 8080');
});