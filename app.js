
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});


app.get('/map', routes.map);
app.get('/route/:agency_id?', routes.index);
app.get('/:agency_id?', routes.index);
app.get('/route/:agency_id/:route_id', routes.route);
app.get('/route/:agency_id/:route_id/:stop_id', routes.stop);

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
