const fetch = require('node-fetch')

exports.handler = async (event, context) => {

	const term = event.queryStringParameters.term || ''
	const API_ENDPOINT = `https://icanhazdadjoke.com/search?term=${encodeURIComponent(term)}`

	let response
	const headers = {
		"Accept": 'application/json'
	}

  try {
		response = await fetch(API_ENDPOINT, {headers})
			.then(res => res.json())
    // handle response
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
				error: err.message,
				info: { event, context }
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response
    })
  }
}
