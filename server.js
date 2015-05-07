var restify = require("restify");
var appCopy = require("./lib/appCopy.js");

/*BEGIN API methods for billing*/
function months(req,res,next){
	// res.send("Hello " + req.params.name);
	res.send(appCopy.months);
	next();
}

function initApp(req,res,next){
	// res.send("Hello " + req.params.name);
	res.send(appCopy.initApp);
	next();
}

function connectionOnQuery(req,res,next){
	// res.send("Hello " + req.params.name);
	res.send(appCopy.connectionOnQuery);
	next();
}

function calculateBillDimensions(req,res,next){
	// res.send("Hello " + req.params.name);
	res.send(appCopy.calculateBillDimensions);
	next();
}

function getHighestMonthOfYear(req,res,next){
	// res.send("Hello " + req.params.name);
	res.send(appCopy.getHighestMonthOfYear);
	next();
}

function getLowestMonthOfYear(req,res,next){
	// res.send("Hello " + req.params.name);
	res.send(appCopy.getLowestMonthOfYear);
	next();
}

/*END API methods for billing*/

var server = restify.createServer();

// Note that by default, curl uses Connection: keep-alive. In order to make the HEAD method return right away, you'll need to pass Connection: close.

// Since curl is often used with REST APIs, restify provides a plugin to work around this idiosyncrasy in curl. The plugin checks whether the user agent is curl. 
// If it is, it sets the Connection header to "close" and removes the "Content-Length" header.
server.pre(restify.pre.userAgentConnection());

server.get("/bill/months",months);
server.get("/bill/initApp",initApp);
server.get("/bill/connectionOnQuery",connectionOnQuery);
server.get("/bill/calculateBillDimensions",calculateBillDimensions);
server.get("/bill/getHighestMonthOfYear",getHighestMonthOfYear);
server.get("/bill/getLowestMonthOfYear",getLowestMonthOfYear);



// server.get("/bill/months",respond);
// server.head("/hello/:name",respond);

server.listen(8778,function(){
	console.log("%s listening at %s",server.name,server.url);
});