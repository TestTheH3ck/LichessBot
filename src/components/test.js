const phantom = require('phantom');
var cheerio = require('cheerio');


export const test = () => {
	phantom.create().then(ph => {
		_ph = ph;
		return _ph.createPage();
	}).then(page => {
		_page = page;
		return _page.open('https://ru.lichess.org/vbYVu3YS');
	}).then(status => {
		console.log(status);
		return _page.property('content')
	}).then(content => {
		return scraper(content)
		_page.close();
		_ph.exit();
	}).catch(e => console.log(e));
	function scraper(content) {
		console.log(content, '1231241');
		var $ = cheerio.load(content);
		var TestAr = []
		$('piece').each(function (i, element) {
			el = $(this).prev()
			let newel = decoder(el.attr('style'))
			let akeys = el.attr('class')
			var obja = {};
			obja[akeys] = newel
			console.log(obja)
			TestAr.push(obja)
		})
		return TestAr
	}

	function decoder(thestring) {
		if (!thestring) return;
		var GoalAr;
		var thenum = thestring && thestring.replace(/[^\d ]/g, '');
		thenum = thenum.slice(1)
		for (var num = 0; num < thenum.length; num++) {
			if (thenum[num] === ' ') {
				var first = parseInt(thenum.slice(0, num));
				var second = parseInt(thenum.slice(num + 1));
				GoalAr = [[first / 64], [second / 64]]
			}
		}
		return GoalAr;
	}
}
