const https = require('https');
const api = require('./api.json')

function printWeather(weather) {
	let temp = weather.main.temp * (9/5) - 459.67
	const message = `Current temperature in ${weather.name} is ${temp.toFixed(2)}F`;
	console.log(message);
}

function get(query) {
	const request = https.get(`https://api.openweathermap.org/data/2.5/weather?APPID=${api.key}&q=${query}`, response => {
		let body = "";
		response.on('data', chunk => {
			body += chunk;
		});
		response.on('end', () => {
			const weather = JSON.parse(body);
			printWeather(weather);
		});
	});
}

module.exports.get = get;