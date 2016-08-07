#!/usr/bin/env node
var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

router.use(function (req, res, next) {
	console.log("/" + req.method);
	next();
});

router.get("/", function(reg, res) {
	res.sendFile(path + "index.html");
});

app.use("/", router);
app.use(express.static('files'));
app.use("/img", express.static(__dirname + "/img"));
app.use("/files", express.static(__dirname + "/files"));
app.use("/js", express.static(__dirname + "/js"));
app.use("/css", express.static(__dirname + "/css"));
app.use("/bootstrap", express.static(__dirname + "/bootstrap"));
app.use("/jquery", express.static(__dirname + "/jquery"));
app.use("/php", express.static(__dirname + "/php"));
app.use("/views", express.static(__dirname + "/views"));
app.use("/web", express.static(__dirname + "/web"));

app.use("/pdfjs/dist", express.static(__dirname + "/pdfjs/dist"));

app.use("*", function(req, res) {
	res.sendFile(path + "404.html");
});

app.listen(3000, function() {
	console.log("Live at Port 3000");
});
