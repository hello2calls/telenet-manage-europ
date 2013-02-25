// FileSystème
var fs = require('fs');

// Toutes les pages de notre site
var htmlSsh = fs.readFileSync(__dirname+'/ssh.html');
var htmAnimation = fs.readFileSync(__dirname+'/animation.htm');
var css960 = fs.readFileSync(__dirname+'/960.css');
var cssTemplate = fs.readFileSync(__dirname+'/template.css');
var jsJavascript = fs.readFileSync(__dirname+'/javascript.js');
var pngLoadCircle = fs.readFileSync(__dirname+'/load-circle.png');

// clé pour le HTTPS
var options = {
	key: fs.readFileSync(__dirname+'/key/privatekey.pem'),
	cert: fs.readFileSync(__dirname+'/key/certificate.pem')
}

// Débugueur
var util   = require('util');
// connexion SSH
var spawn = require('child_process').spawn;

// Serveur Web
var app = require('https').createServer(options, function(req, res){
	if (req.url == '/960.css') {
		res.writeHead(200, { 'Content-Type': 'text/css' });
		res.end(css960);
	}
	if (req.url == '/colour.css') {
		res.writeHead(200, { 'Content-Type': 'text/css' });
		res.end(cssColour);
	}
	if (req.url == '/template.css') {
		res.writeHead(200, { 'Content-Type': 'text/css' });
		res.end(cssTemplate);
 	}
	if (req.url == '/') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(htmlSsh);
 	}
	if (req.url == '/animation.htm') {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(htmAnimation);
        }
 	if (req.url == '/javascript.js') {
		res.writeHead(200, { 'Content-Type': 'text/javascript' });
		res.end(jsJavascript);
 	}
	if (req.url == '/load-circle.png') {
                res.writeHead(200, { 'Content-Type': ' image/png' });
                res.end(pngLoadCircle);
        }
});
app.listen(8181);

// Web Socket
var io = require("socket.io");
var io = io.listen(app);

// Ouverture des Web Sockets
io.sockets.on('connection', function (socket) {
		
	socket.on('LoginSSH', function (user, address) {
		var ssh = spawn('ssh', ['-tt', user+'@'+address]);
		
		process.stdin.resume();
		process.stdin.on('data', function (chunk) {
  			ssh.stdin.write(chunk);
		});
		
		ssh.stdout.on('data', function (data) {
			data = data.toString();
			socket.emit('printCommande', data);
		});
		
		ssh.stderr.on('data', function (data) {
		});
		
		ssh.on('exit', function (code) {
			ssh.stdin.write('exit\n');
		});
			
		socket.on('Commande', function (commande) {
			ssh.stdin.write(commande);
		});
	});
});
