var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

io.on('connection', function(socket) {
  socket.on('UPDATE_USERS_LIST', users => {
    socket.broadcast.emit('UPDATE_USERS_LIST', users);
  })
});

http.listen(3001, function(){
  console.log('listening on *:3001');
});
