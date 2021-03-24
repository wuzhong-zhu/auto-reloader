const enigma = require('enigma.js');
const schema = require('enigma.js/schemas/12.170.2.json');
const WebSocket = require('ws');

const interval = 5000
const serverurl = "localhost"
const appname = "the_movies"

// create a new session:
const session = enigma.create({
  schema,
  url: 'ws://'+serverurl+':9076/app/engineData',
  createSocket: url => new WebSocket(url),
});

// bind traffic events to log what is sent and received on the socket:
session.on('traffic:sent', data => console.log('sent:', data));
session.on('traffic:received', data => console.log('received:', data));


async function run(){
	session.open()
	  .then((global) => {
	  	console.log('connected!')
	  	global.openDoc(appname).then((app)=>{
	  		app.getAppLayout().then((layout)=>{
	  			app.doReload().then((response)=>{
	  				console.log(response)
	  				if(response)
	  					console.log("successful reloaded")
	  				else
	  					console.log("unsuccessful reload attempt")
	  				// session.close()
	  				setTimeout(run, interval);
	  			})
	  		})
	  	})
	})
}

run();
