const API = (
	url,
	body,
	method
) => {
	if(method === 'GET') {
		return fetch(`http://localhost:5000/api/v1/${url}`, {
			method: method
		})
	} else {
		return fetch(`/api/v1/${url}`, {
			method: method,
			body: body,
			headers: {
				"Content-Type": "application/json"
			}
		})
	}
}

export { API }