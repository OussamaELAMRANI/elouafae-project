const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const morgan = require('morgan');
// const multer = require('multer')
// const Busboy = require('busboy')
const path = require('path');
const fs = require('fs');
const util = require('util');
// var formidable = require('formidable');


const rUsers = require('./routes/usersRoute');
const rInventory = require('./routes/inventoryRoute');
// const config = require('./config/db')
require('dotenv').config();
const DB = process.env.DB_CONN;

// const DIR = './uploads/'
// const upload = multer({ dest: DIR });

mongoose.connect(process.env.DB_CONN) //Connection to DB using the >.ENV
mongoose.connection.on('connected', () => {
	console.log('++++ Connected on DATABASE NOW ++++ \n', DB);
})
mongoose.connection.on('error', (err) => {
	console.error('----- ERROR on DATABASE  ------ \n' + err);
})
// ===============================

//Change port 3000>8080
const PORT = process.env.PORT || 8080

const app = express()

app.use(morgan('dev')) //Logger
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
// Passport Middelware
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

// MULTER Uploader
// var storege = multer.diskStorage({
// 	destination: (req, file, cb) => {
// 		cb(null, 'upload/')
// 	},
// 	filename: function (req, file, cb) {
// 		cb(null, file.fieldname + '-' + Date.now())
// 	}
// })
// var uploaders = multer({ storage: storege })
// var uplo = multer({ dest: 'uploads/' })

// app.post('/upload', uplo.single('imv'),(req, res) => {
// 		console.log(req.file)
// });
// 	var busboy = new Busboy({headers: req.headers})
// busboy.on('file', (fieldname, file, filename, encoding, mimtype) => {
// 	var filePath = path.join(__dirname, 'uploads', path.basename(filename))
// 	console.log(filePath)

// 	file.pipe(fs.createWriteStream(filePath))

// })

// busboy.on('finished', () => {
// 		res.json({msg: "Done !"})
// })

// return req.pipe(busboy)

/**
 * API Routes
 */
app.use('*', (req, res) => {
	res.redirect('/')
})
app.use('/users', rUsers)
app.use('/inventory', rInventory)

// app.post('/upload', (req, res) => {
// 	var form = new formidable.IncomingForm();
// 	form.encoding = 'utf-8';
// 	form.uploadDir = "/home/oussama/dev";

// 	form.parse(req, (err, fields, files) => {
// 		// var oldpath = files.filetoupload.path;
// 		// console.log(oldpath + ' +++++++++++++++++++++++')

// 		res.end(util.inspect({ path: fields , file: files}));

// 		fs.readFile(files.filetoupload.path, (err, data)=> {
// 			res.write(data)
// 			res.end()
// 		})

// 		// var newpath = '/home/oussama/dev/' + files.filetoupload
// 		// console.log('\n' + newpath + ' +++++++++++++++++++++++')
// 		// fs.rename(oldpath, os.tmpdir(), function (err) {
// 		// 	if (err) throw err;
// 		// 	res.json({ msg: 'File uploaded' });
// 		// })

// 	});
// })


app.listen(PORT, () => {
	console.log('EL OUAFAE LISTEN ON PORT N: ' + PORT)
})
