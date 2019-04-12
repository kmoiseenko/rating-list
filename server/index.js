const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const multer  = require('multer');
const fs = require('fs');
const path = require('path');


const databaseFile = new FileSync('database.json');
const database = low(databaseFile);
const pathForBgImage = process.env.NODE_ENV === 'development' ? './../public/assets' : './../build/assets';
const upload = multer({ dest: pathForBgImage }).single('background');


app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../build')));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization');
  next();
});

app.get('/players', function (req, res) {
  res.send(database.get('players'));
});

app.post('/login', function (req, res) {
  const adminLogin = database.get('users').find({ login: req.body.login }).value();
  const adminPassword = database.get('users').find({ password: +req.body.password }).value();

  if (adminLogin && adminPassword) {
    res.send({ id: adminLogin.id });
  } else {
    res.send({ error: 'Wrong login or pass' });
  }
});

app.get('/background', upload, function (req, res) {
  res.send(database.get('background').find({ id: '1' }).value());
});

app.post('/background', upload, function (req, res) {
  const fileNameInDB = database.get('background').find({ id: '1' }).value().src;

  if (fileNameInDB) {
    fs.unlink(`${pathForBgImage}/${fileNameInDB}`, (err) => {
      if (err) { console.error(err) }
    });
  }

  if (req.file) {
    database.get('background').find({ id: '1' }).assign({
      src: req.file.filename,
      name: req.file.originalname,
      path: `${pathForBgImage}/${req.file.filename}`,
    }).write();
    res.send(database.get('background').find({ id: '1' }).value());
  }
});

app.use((req, res) => { res.sendFile(path.resolve(__dirname, '../build/index.html')) });

io.on('connection', function(socket) {
  socket.on('UPDATE_PLAYERS_LIST', players => {
    database.assign({ players }).write();
    socket.broadcast.emit('UPDATE_PLAYERS_LIST', database.get('players').value());
  });

  socket.on('UPDATE_BACKGROUND', background => {
    socket.broadcast.emit('UPDATE_BACKGROUND', background);
  });
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
