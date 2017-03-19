var module = require('./cookie');
var Nightmare = require('nightmare');
const realMouse = require('nightmare-real-mouse');

var PlayerColor = (link, cookie) => {
	realMouse(Nightmare);
	var nightmares = Nightmare({ show: true });
	return nightmares
		.goto('about:blank')
		.cookies.set(cookie)
		.wait(200)
		.goto(link)
		.evaluate(function (res) {
			var PlayerColor = document.getElementsByClassName(".orientation-white");
			PlayerColor ? PlayerColor = 'white' : PlayerColor = 'black'
			return PlayerColor
		})
		.then(function (resul) {
			console.log(resul)
		});
}

module.exports = PlayerColor;