var Nightmare = require('nightmare');
const realMouse = require('nightmare-real-mouse');
var cookie = function (mes) {
	realMouse(Nightmare);
	var nightmare = Nightmare({
		show: false });
 return nightmare
	.goto('https://ru.lichess.org/login')
	.wait(400)
	.insert('input#username', mes.name)
	.wait(400)
	.insert('input#password', mes.password)
	.wait(400)
	.realClick('button[class="submit button"]')
	.wait(400)
	.cookies.get()
	.end()
	.then(function (result) {
		console.log(result);
		return result
	})
};

module.exports = cookie
