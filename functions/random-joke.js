const fetch = require('node-fetch')

const API_ENDPOINT = 'https://icanhazdadjoke.com/'

exports.handler = async (event, context) => {
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
        error: err.message
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
