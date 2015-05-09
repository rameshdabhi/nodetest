var restify = require("restify");
var appCopy = require("./lib/appCopy.js");



var server = restify.createServer();
server.use(restify.queryParser());
server.use(restify.bodyParser());

// Note that by default, curl uses Connection: keep-alive. In order to make the HEAD method return right away, you'll need to pass Connection: close.

// Since curl is often used with REST APIs, restify provides a plugin to work around this idiosyncrasy in curl. The plugin checks whether the user agent is curl. 
// If it is, it sets the Connection header to "close" and removes the "Content-Length" header.
server.pre(restify.pre.userAgentConnection());

server.get("/bill/months",months);
server.get("/bill/initApp",initApp);
server.post("/bill/calculateBillDimensions",calculateBillDimensions);
server.post("/bill/getHighestMonthOfYear",getHighestMonthOfYear);
server.post("/bill/getLowestMonthOfYear",getLowestMonthOfYear);



// server.get("/bill/months",respond);
// server.head("/hello/:name",respond);

server.listen(8778,function(){
	console.log("%s listening at %s",server.name,server.url);
});


/*BEGIN API methods for billing*/

/*
var x = new XMLHttpRequest();
x.open("POST","/bill/calculateBillDimensions");
x.setRequestHeader("Content-Type","application/json");
x.onreadystatechange = function() {
    if (x.readyState == 4) {
        console.log(x.response);
    }
}
x.send(JSON.stringify({r: results}));
*/


function months(req,res,next){
	// res.send("Hello " + req.params.name);
	res.send(appCopy.months);
	return next();
}

function initApp(req,res,next){
	// res.send("Hello " + req.params.name);
	appCopy.initApp(function(data){
		res.send(data);
	});
	return next();
}

function calculateBillDimensions(req,res,next){
	// res.send("Hello " + req.params.name);
	appCopy.calculateBillDimensions(req.params.r,function(results){
		res.send(results);
	})
	// res.send(appCopy.calculateBillDimensions(req.params));
	return next();
}

function getHighestMonthOfYear(req,res,next){
	appCopy.getHighestMonthOfYear(req.params.r,function(results){
		res.send(results);
	})
	return next();
}

function getLowestMonthOfYear(req,res,next){
	appCopy.getLowestMonthOfYear(req.params.r,function(results){
		res.send(results);
	})
	return next();
}

/*END API methods for billing*/