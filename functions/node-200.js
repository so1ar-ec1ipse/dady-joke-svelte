module.exports.joke = (req, res) => {

	const https = require('https')

	// exports.handler = function(event, context, callback) {
	// 	callback(null, {
	// 		statusCode: 200,
	// 		body: JSON.stringify({
	// 			response: "Everything looks good!"
	// 		})
	// 	})
	// }

	const args = {
		hostname: 'https://icanhazdadjoke.com',
		path: '/',
		headers: {
			Accept: "application/json"
		}
	}

	const call = https.request(args, (resp) => {
		let data = '';

		// A chunk of data has been recieved.
		resp.on('data', (chunk) => {
			data += chunk;
		});

		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			console.log(data)
			res.end(JSON.stringify(data));
		});

	})

	call.on("error", (err) => {
		res.end("Error: " + err.message);
	});

	call.end();

}
