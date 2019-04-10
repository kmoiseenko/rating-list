const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const players = new FileSync('players.json');
const users = new FileSync('users.json');
const playersDb = low(players);
const usersDb = low(users);

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/playes', function (req, res) {
  res.send(playersDb);
});

app.post('/playes', function (req, res) {
  playersDb.get('players').push(req.body).write();
  res.send(playersDb.get('players').value());
});

app.put('/playes', function (req, res) {
  playersDb.get('players').find({ id: req.body.id }).assign({ score: req.body.score }).write();
  res.send(playersDb.get('players'));
});

app.delete('/playes', function (req, res) {
  playersDb.get('players').remove({ id: req.body.id }).write();
  res.send(playersDb.get('players'));
});

app.post('/login', function (req, res) {
  const adminLogin = usersDb.get('users').find({ login: req.body.login }).value();
  const adminPassword = usersDb.get('users').find({ password: +req.body.password }).value();

  if (adminLogin && adminPassword) {
    res.send({ id: adminLogin.id });
  }
});

io.on('connection', function(socket) {
  socket.on('UPDATE_PLAYERS_LIST', players => {
    socket.broadcast.emit('UPDATE_PLAYERS_LIST', players);
  })
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
