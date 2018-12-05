// Handle HTTP errors since fetch won't.
export function handleErrors(response) {
	if (!response.ok) {
		throw Error(response.statusText);
	}
	return response;
}