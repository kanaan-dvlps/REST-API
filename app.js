const restify = require('restify');
const mongoose = require('mongoose'); 
const config = require('./config'); // The config file for DB, Port, URL comes from this dude
const rjwt = require('restify-jwt-community');
const server = restify.createServer();

//Middleware
server.use(restify.plugins.bodyParser());

//Protect Routes
//This is one way to do it
// server.use(rjwt({ secret: config.JWT_SECRET }).unless({ path: ['/auth'] }));

server.listen(config.PORT, () =>{
  mongoose.set('useFindAndModify', false);
  mongoose.connect(config.MONGODB_URI, {useNewUrlParser: true});
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () =>{
  require('./routes/customers')(server);//this (server) is actually what we are going to use to create our routes like server.get server.post and so on, this is actually the server variable that we have created on line 5. the function that we have created on module.exports is going to pass in the routes module to this "server" instance.
  require('./routes/users')(server);
  console.log(`server started on port ${config.PORT}`);
});