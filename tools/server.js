import express from 'express';
import webpack from 'webpack';
import path from 'path';
import config from '../webpack.config.dev';
import open from 'open';
import favicon from 'serve-favicon';
import socket from 'socket.io'
import { Server } from 'http'
import scraper from './scraper'
import move from './move';
import cookie from './cookie'
import lastmove from './lastmove';
import ColorPlayer from './justfile'

/* eslint-disable no-console */

const port = 3000;
const app = express();
const server = Server(app);
const compiler = webpack(config);
const io = socket(server);
var cookies;
var update = false;
var obj = {};
var board;
app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use(express.static('tools/tmp/uploads'))

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});

async function autoUpdate(room, message, responce) {
	try {
		responce = await scraper(message, obj[room].cookies);
	} catch (ex) {
		console.error(ex)
	}
	io.sockets.in(room).emit('anal', responce)
	console.log('yep yep')
	if (obj[room].update === true) {
		autoUpdate(room, message)
	}
}

function autoUpdaiting(room, message) {
	setInterval(() => {
		console.log('YUP YUP')
		return autoUpdate(room, message)
	}, 2000);

}
/*function sleep(time, callback) {
	var stop = new Date().getTime();
	while(new Date().getTime() < stop + time) {
		;
	}
	callback();
}*/
function senddata(message, room) {
	while(!obj[room].cookies) {
		;
	}
		return scraper(message, obj[room].cookies).then(function(responce) {
			io.sockets.in(room).emit('anal', responce)
		})
}

io.sockets.on('connection', function(socket) {

	socket.on('create', function(room) {
		obj[room] = {update: '', cookies: ''};
		obj[room].update = false
		socket.room = room;
		socket.join(room);
	});

	socket.on('chat message', function (message) {
		io.sockets.in(room).emit('chat message', {message});
  }),

	socket.on('set cookie', function (mes) {
		obj[socket.room].cookies = mes;
	}),

	socket.on('get cookie', function (mes) {
		cookie(mes).then(function (result) {
			obj[socket.room].cookies = result;
			io.sockets.in(socket.room).emit('set cookie', result)
			return scraper(mes.link, result).then(function(responce) {
				io.sockets.in(socket.room).emit('anal', responce)
			})
		});
	});

	socket.on('anal', function (message) {
		return scraper(message, obj[socket.room].cookies).then(function(responce) {
			console.log(responce)
			io.sockets.in(socket.room).emit('anal', responce)
		})
	}),

		socket.on('autoupdate', function (message) {
		obj[socket.room].update = !obj[socket.room].update;
		autoUpdate(socket.room, message);
	}),

	socket.on('chess', function (message) {
		socket.broadcast.emit('chess', {message});
	}),

	socket.on('move', function (message) {
			move(message[0], message[1], obj[socket.room].cookies).then(function(responce) {
			})
	}),

		socket.on('lastmove', function (message) {
			lastmove(message[0], message[1], obj[socket.room].cookies).then(function(responce) {
			})
		})
});

server.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});