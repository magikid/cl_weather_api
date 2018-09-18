const https = require('https');
const http = require('http');
const api = require('./api.json')

function printWeather(weather) {
	let temp = weather.main.temp * (9/5) - 459.67
	const message = `Current temperature in ${weather.name} is ${temp.toFixed(2)}F`;
	console.log(message);
}

function printError(error) {
	console.error(error.message);
}

function get(query) {
	const readableQuery = query.replace('_', ' ');
	try {
		const request = https.get(`https://api.openweathermap.org/data/2.5/weather?APPID=${api.key}&q=${query}`, response => {
			if (response.statusCode === 200) {
				let body = "";
				response.on('data', chunk => {
					body += chunk;
				});
				response.on('end', () => {
					try {
						const weather = JSON.parse(body);
						if (weather.name) {
							printWeather(weather);
						} else {
							const queryError = new Error(`The location ${readableQuery} was not found.`);
							printError(queryError);
						}
					} catch (error) {
						printError(error);
					}
				});
			} else {
				const statusCodeError = new Error(`There was an error getting the message for ${readableQuery}. (${http.STATUS_CODES[response.statusCode]})`);
				printError(statusCodeError);
			}
		});

		request.on("error", printError);
	} catch (error) {
		printError(error);
	}
}

module.exports.get = get;