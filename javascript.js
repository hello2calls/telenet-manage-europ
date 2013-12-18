var socket = io.connect();

socket.on('printCommande', function(retour) {
	date = new Date();
	retour = retour.replace(//g, '');
	retour = retour.replace(/\[K/g, '');

	// Console = l'objet console de la page HTML
	var Console = document.getElementById('console');

	// Nous remplaçons les retour à la ligne par des <br>
	var reg=new RegExp("\\r", "g");
	retour = retour.replace(reg, '<br>');
	// Nous remplaçons les espaces par des &nbsp;
	var reg=new RegExp("\\ ", "g");
	retour = retour.replace(reg, '&nbsp;');
	// Nous supprimons les (]0;)
	var reg=new RegExp("\\]0;", "g");
	retour = retour.replace(reg, '');

	// Nous mettons des couleurs du texte
	// Noir
	var reg=new RegExp("\\[01;30m", "g");
	retour = retour.replace(reg, '<font color="black">');
	// Rouge
	var reg=new RegExp("\\[01;31m", "g");
	retour = retour.replace(reg, '<font color="red">');
	// Vert
	var reg=new RegExp("\\[01;32m", "g");
	retour = retour.replace(reg, '<font color="green">');
	// Jaune
	var reg=new RegExp("\\[01;33m", "g");
	retour = retour.replace(reg, '<font color="yellow">');
	// Bleu
	var reg=new RegExp("\\[01;34m", "g");
	retour = retour.replace(reg, '<font color="blue">');
	// Magenta
	var reg=new RegExp("\\[01;35m", "g");
	retour = retour.replace(reg, '<font color="magenta">');
	// Cyan
	var reg=new RegExp("\\[01;36m", "g");
	retour = retour.replace(reg, '<font color="cyan">');
	// Blanc
	var reg=new RegExp("\\[01;37m", "g");
	retour = retour.replace(reg, '<font color="white">');

	// Nous mettons les couleurs du background
	var reg=new RegExp("\\[30;40m", "g");
	retour = retour.replace(reg, '<font style="background-color: black">');
	// Rouge
	var reg=new RegExp("\\[30;41m", "g");
	retour = retour.replace(reg, '<font style="background-color: red">');
	// Vert
	var reg=new RegExp("\\[30;42m", "g");
	retour = retour.replace(reg, '<font style="background-color: green">');
	// Jaune
	var reg=new RegExp("\\[30;43m", "g");
	retour = retour.replace(reg, '<font style="background-color: yellow">');
	// Bleu
	var reg=new RegExp("\\[30;44m", "g");
	retour = retour.replace(reg, '<font style="background-color: blue">');
	// Magenta
	var reg=new RegExp("\\[30;45m", "g");
	retour = retour.replace(reg, '<font style="background-color: magenta">');
	// Cyan
	var reg=new RegExp("\\[30;46m", "g");
	retour = retour.replace(reg, '<font style="background-color: cyan">');
	// Blanc
	var reg=new RegExp("\\[30;47m", "g");
	retour = retour.replace(reg, '<font style="background-color: white">');

	// Fermeture de la balise
	var reg=new RegExp("\\[0m", "g");
	retour = retour.replace(reg, '</font>');

	//-- Nous supprimons tout se qu'il y a avant le nom du serveur et le chemin (sur la même ligne)
	var pathEnd = retour.lastIndexOf('$', retour.length); // index de la fin du chemin
	var pathStart = retour.lastIndexOf(':', retour.length); // index du début du chemin
	var path = retour.substring(pathStart+1, pathEnd); // le chemin
	if (pathStart != -1 && pathEnd != -1) {
		var regex = '(.+)&nbsp;'+path;
		regex = regex.replace(//g, '');
		var reg= new RegExp(regex, 'g');
		retour = retour.replace(reg, '');
	}

	Console.innerHTML = Console.innerHTML.substring(0, Console.innerHTML.length);
	// Nous affichons dans la div console le retour du serveur
	Console.innerHTML = Console.innerHTML + retour;
	// Nous descendons la barre de scroll verticale
	Console.scrollTop = Console.scrollHeight;
})


function connect() {
	user = "europ";
	address = "192.168.8.226";
	Console = document.getElementById('console');
	Console.innerHTML = '';
	socket.emit('LoginSSH', user, address);
}


function resetAllCISCO() {
	display(true);
  resetCISCO('10.20.30.22');
	setTimeout(function(){resetCISCO('10.20.30.1'); parameter = null}, 8000);
	setTimeout(function(){resetCISCO('10.20.30.6'); parameter = null}, 13000);
	setTimeout(function(){resetCISCO('10.20.30.13'); parameter = null}, 18000);
	setTimeout(function(){resetCISCO('192.168.8.100'); parameter = null}, 23000);
  setTimeout(function(){display(false); parameter = null}, 28000);
}

function loadTP() {
	display(true);
	loadTPCISCO('10.20.30.22');
	setTimeout(function(){loadTPCISCO('10.20.30.1'); parameter = null}, 15000);
	setTimeout(function(){loadTPCISCO('10.20.30.6'); parameter = null}, 30000);
	setTimeout(function(){loadTPCISCO('10.20.30.13'); parameter = null}, 45000);
	setTimeout(function(){loadTPCISCO('192.168.8.100'); parameter = null}, 60000);
	setTimeout(function(){resetDSLAM(); parameter = null}, 75000);
}

function saveCISCO(TP) {
  display(true);
	saveCISCOOnly('10.20.30.22', TP);
	setTimeout(function(){saveCISCOOnly('10.20.30.1', TP); parameter = null}, 10000);
	setTimeout(function(){saveCISCOOnly('10.20.30.6', TP); parameter = null}, 20000);
	setTimeout(function(){saveCISCOOnly('10.20.30.13', TP); parameter = null}, 30000);
	setTimeout(function(){saveCISCOOnly('192.168.8.100', TP); parameter = null}, 40000);
	if (TP == true) {
		setTimeout(function(){saveDSLAM(true); parameter = null}, 50000);
    setTimeout(function(){display(false); parameter = null}, 60000);
  }
  else {
    setTimeout(function(){display(false); parameter = null}, 50000);
  }
}

function saveCISCOOnly(IP, TP) {
	year = date.getFullYear();
	year = year.toString();
	month = date.getMonth();
	month = month+1;
	month = month.toString();
	if (month.length == 1) month = '0'+month;
	day = date.getDate();
	day = day.toString();
	if (day.length == 1) day = '0'+day;
	hour = date.getHours();
	hour = hour.toString();
	if (hour.length == 1) hour = '0'+hour;
	minute = date.getMinutes();
	minute = minute.toString();
	if (minute.length == 1) minute = '0'+minute;

	switch (IP) {
		case '10.20.30.22':
			hostname = 'Barcelone_';
			break;
		case '10.20.30.1':
			hostname = 'Madrid_';
			break;
		case '10.20.30.6':
			hostname = 'Londres_';
			break;
		case '10.20.30.13':
			hostname = 'Paris_';
			break;
		case '192.168.8.100':
			hostname = 'Lyon_';
			break;
		default:
			break;
	}

	switch (TP) {
		case true:
			dir = 'TP/TP-Router-';
			break;
		case false:
			dir = 'ROUTER/Router-';
			break;
		default:
			break;
	}

  socket.emit('Commande', 'telnet '+IP+'\r');
  setTimeout(function(){saveCISCOOnlyNext(IP, dir, hostname, minute, hour, day, month, year); parameter = null}, 1000);
}
function saveCISCOOnlyNext(IP, dir, hostname, minute, hour, day, month, year) {
  var Console = document.getElementById('console');
  var lastLineIP10 = Console.innerHTML.substr(Console.innerHTML.length-31, 12);
  var lastLineIP11 = Console.innerHTML.substr(Console.innerHTML.length-30, 12);
  var lastLineIP13 = Console.innerHTML.substr(Console.innerHTML.length-33, 12);
  if (lastLineIP10 == "Trying&nbsp;" || lastLineIP11 == "Trying&nbsp;" || lastLineIP13 == "Trying&nbsp;")
  return;
	socket.emit('Commande', 'e');
	socket.emit('Commande', 'u');
	socket.emit('Commande', 'r');
	socket.emit('Commande', 'o');
	socket.emit('Commande', 'p\r');
	socket.emit('Commande', 'enable\r');
	socket.emit('Commande', 'e');
	socket.emit('Commande', 'u');
	socket.emit('Commande', 'r');
	socket.emit('Commande', 'o');
	socket.emit('Commande', 'p\r');
	socket.emit('Commande', 'copy running-config tftp:\r');
	socket.emit('Commande', '192.168.8.123\r');
	socket.emit('Commande', dir+hostname+day+month+year+'-'+hour+minute+'\r');
  socket.emit('Commande', 'exit\r');
}

function saveDSLAM(TP) {
  display(true);
	year = date.getFullYear();
	year = year.toString();
  month = date.getMonth();
  month = month+1;
  month = month.toString();
  if (month.length == 1) month = '0'+month;
  day = date.getDate();
  day = day.toString();
  if (day.length == 1) day = '0'+day;
  hour = date.getHours();
  hour = hour.toString();
  if (hour.length == 1) hour = '0'+hour;
  minute = date.getMinutes();
  minute = minute.toString();
  if (minute.length == 1) minute = '0'+minute;

	switch (TP) {
		case true:
			dir = 'TP/TP-';
			break;
		case false:
			dir = 'DSLAM/';
			break;
		default:
			break;
	}

	socket.emit('Commande', 'telnet 192.168.8.53\r');
	setTimeout(function(){saveDSLAMNext(dir, minute, hour, day, month, year); parameter = null}, 1000);
}
function saveDSLAMNext(dir, minute, hour, day, month, year) {
	socket.emit('Commande', 'g');
	socket.emit('Commande', 'r');
	socket.emit('Commande', 'o');
	socket.emit('Commande', 'u');
	socket.emit('Commande', 'p');
	socket.emit('Commande', 'e');
	socket.emit('Commande', '1\r');
	socket.emit('Commande', 'a');
	socket.emit('Commande', 'z');
	socket.emit('Commande', 'e');
	socket.emit('Commande', '1');
	socket.emit('Commande', '2');
	socket.emit('Commande', '3\r');
	socket.emit('Commande', 'enable\r');
	socket.emit('Commande', 'backup configuration tftp 192.168.8.123 '+dir+'DSLAM_'+day+month+year+'-'+hour+minute+'\r');
	socket.emit('Commande', 'y\r');
	socket.emit('Commande', '\r');
	socket.emit('Commande', 'quit\r');
	socket.emit('Commande', 'y\r');
  setTimeout(function(){display(false); parameter = null}, 5000);
}

function resetCISCO(IP) {
	socket.emit('Commande', 'telnet '+IP+'\r');
	setTimeout(function(){resetCISCONext(IP); parameter = null}, 1000);
}
function resetCISCONext(IP) {
	var Console = document.getElementById('console');
	var lastLineIP10 = Console.innerHTML.substr(Console.innerHTML.length-31, 12);
	var lastLineIP11 = Console.innerHTML.substr(Console.innerHTML.length-30, 12);
  var lastLineIP13 = Console.innerHTML.substr(Console.innerHTML.length-33, 12);
  if (lastLineIP10 == "Trying&nbsp;" || lastLineIP11 == "Trying&nbsp;" || lastLineIP13 == "Trying&nbsp;")
	return;
  socket.emit('Commande', 'e');
	socket.emit('Commande', 'u');
	socket.emit('Commande', 'r');
	socket.emit('Commande', 'o');
	socket.emit('Commande', 'p\r');
	socket.emit('Commande', 'enable\r');
	socket.emit('Commande', 'e');
	socket.emit('Commande', 'u');
	socket.emit('Commande', 'r');
	socket.emit('Commande', 'o');
	socket.emit('Commande', 'p\r');
	socket.emit('Commande', 'config terminal\r');
	socket.emit('Commande', 'config-register 0x2102\r');
	socket.emit('Commande', 'exit\r');
	socket.emit('Commande', 'write erase\r');
	socket.emit('Commande', '\r');
	socket.emit('Commande', 'reload\r');
	socket.emit('Commande', 'no\r');
	socket.emit('Commande', '\r');
}

function resetDSLAM() {
  display(true);
	date = new Date();
	socket.emit('Commande', 'telnet 192.168.8.53\r');
	setTimeout(function(){resetDSLAMNext(); parameter = null}, 2000);
	setTimeout(function(){resetDSLAMNextNext(); parameter = null}, 7000);
}
function resetDSLAMNext() {
	socket.emit('Commande', 'g');
	socket.emit('Commande', 'r');
	socket.emit('Commande', 'o');
	socket.emit('Commande', 'u');
	socket.emit('Commande', 'p');
	socket.emit('Commande', 'e');
	socket.emit('Commande', '1\r');
	socket.emit('Commande', 'a');
	socket.emit('Commande', 'z');
	socket.emit('Commande', 'e');
	socket.emit('Commande', '1');
	socket.emit('Commande', '2');
	socket.emit('Commande', '3\r');
	socket.emit('Commande', 'enable\r');
	socket.emit('Commande', 'load configuration tftp 192.168.8.123 DSLAM/DSLAM-Base.txt all\r');
	socket.emit('Commande', 'y\r');

}
function resetDSLAMNextNext() {
	socket.emit('Commande', 'active configuration system\r');
	socket.emit('Commande', 'y\r');
	socket.emit('Commande', 'quit\r');
	socket.emit('Commande', 'y\r');
  setTimeout(function(){display(false); parameter = null}, 3000);
}

function loadTPCISCO(IP) {
	date = new Date();
	switch (IP) {
		case '10.20.30.22':
			file = 'BarceloneTPMini.txt';
			break;
		case '10.20.30.1':
			file = 'MadridTPMini.txt';
			break;
		case '10.20.30.6':
			file = 'LondresTPMini.txt';
			break;
		case '10.20.30.13':
			file = 'ParisTPMini.txt';
			break;
		case '192.168.8.100':
			file = 'LyonTPMini.txt';
			break;
		default:
			break;
	}

	socket.emit('Commande', 'telnet '+IP+'\r');
	setTimeout(function(){loadTPCISCONext(file); parameter = null}, 1000);
}
function loadTPCISCONext(file) {
  var Console = document.getElementById('console');
	var lastLineIP10 = Console.innerHTML.substr(Console.innerHTML.length-31, 12);
	var lastLineIP11 = Console.innerHTML.substr(Console.innerHTML.length-30, 12);
  var lastLineIP13 = Console.innerHTML.substr(Console.innerHTML.length-33, 12);
  if (lastLineIP10 == "Trying&nbsp;" || lastLineIP11 == "Trying&nbsp;" || lastLineIP13 == "Trying&nbsp;")
	return;
	socket.emit('Commande', 'e');
	socket.emit('Commande', 'u');
	socket.emit('Commande', 'r');
	socket.emit('Commande', 'o');
	socket.emit('Commande', 'p\r');
	socket.emit('Commande', 'enable\r');
	socket.emit('Commande', 'e');
	socket.emit('Commande', 'u');
	socket.emit('Commande', 'r');
	socket.emit('Commande', 'o');
	socket.emit('Commande', 'p\r');
	socket.emit('Commande', 'copy tftp: startup-config\r');
	socket.emit('Commande', '192.168.8.123\r');
	socket.emit('Commande', 'ConfigTP/'+file+'\r');
	socket.emit('Commande', '\r');
	setTimeout(function(){loadTPCISCONextNext(); parameter = null}, 6000);
}
function loadTPCISCONextNext() {
	socket.emit('Commande', 'reload\r');
	socket.emit('Commande', '\r');
	socket.emit('Commande', '\r');
}

function display(display) {
  opacity = document.getElementById('opacity');
  img = document.getElementById('img');
  if (display == true) {
    opacity.style.display = "block";
    img.style.display = "block";
  }
  else {
    opacity.style.display = "none";
    img.style.display = "none";
  }
}
