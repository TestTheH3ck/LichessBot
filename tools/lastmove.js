var Nightmare = require('nightmare');
const realMouse = require('nightmare-real-mouse');

var lastmove = (link, position, cookie) => {
	realMouse(Nightmare);
	var nightmare = Nightmare({show: false});
	return nightmare
		.viewport(1200, 1200)
		.goto('https://ru.lichess.org/')
		.cookies.set(cookie)
		.wait(300)
		.goto(link)
		.wait('#lichess')
		.realClick('piece[style="transform: translate(' + position[0][0] + 'px, ' + position[0][1] + 'px);"]')
		.wait(300)
		.realClick('square[style="transform: translate(' + position[1][0] + 'px, ' + position[1][1] + 'px);"]')
		.wait('#promotion_choice')
		.realClick('square[style="top: 0%;left: 75%"]')
		.wait(300)
		.end()
		.then(function (result) {
			console.log(result)
		});
}

module.exports = lastmove;