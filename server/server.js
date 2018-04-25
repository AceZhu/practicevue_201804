var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var i = 0;
http.createServer(function (request, response) {

	// 发送 HTTP 头部 
	// HTTP 状态值: 200 : OK
	// 内容类型: text/plain
	// console.log(request.url);
	let path = request.url.slice(1).split(/\/|\?/);
	console.log(path);
	if(request.method === "GET"){
		let queryDir = path[0],answerPath;
		if(queryDir === "examlst"){
			answerPath = './data/examLst.json';
		}else if(queryDir === "exam"){
			answerPath = './data/exam' + path[1].split('=').slice(-1) + '.json';
		}
		response.writeHead(200, {'Content-Type': 'text/json','Access-Control-Allow-Origin': 'http://fe-ace.6655.la:25227'});
		fs.readFile(answerPath,'utf8',(err,data) => {
			if(err) throw err;
			response.end(data);
		});
	}else if(request.method === "POST"){
		var body = '',uploadData;
		request.on('data',(chunk) => {
			body += chunk;
		});
		request.on('end',() => {
			uploadData = qs.parse(body);
			console.log(uploadData);
			fs.writeFile('./data/exam' + path[1] + '.json',body,(err) => {
				if (err) throw err;
				console.log('The file has been saved!');
			});
		});
			response.writeHead(200, {'Content-Type': 'text/json','Access-Control-Allow-Origin': 'http://fe-ace.6655.la:25227'});
			response.end(JSON.stringify({success:true}));
			//fs.writeFile('./data/exam2.json',,)
	}else if(request.method === "OPTIONS"){
		response.writeHead(200, {'Content-Type': 'text/json','Access-Control-Allow-Origin': 'http://fe-ace.6655.la:25227','Access-Control-Allow-Headers': 'Content-Type'});
		response.end();
	}
}).listen(22993);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:22993/');