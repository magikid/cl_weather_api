const https = require('https');
const api = require('./api.json')

function get(query) {
	const request = https.get(`https://api.openweathermap.org/data/2.5/weather?APPID=${api.key}&q=${query}`, response => {
		let body = "";
		response.on('data', chunk => {
			body += chunk;
		});
		response.on('end', () => {
			console.log(body);
		});
	});
}

module.exports.get = get;