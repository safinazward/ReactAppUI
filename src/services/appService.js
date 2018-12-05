import { handleErrors } from '../utils/errorHandling';

export const appAPIUrl = 'http://' + window.location.hostname + ':5001/api/app/';
const AppService = {
	listApps: () => {
		return fetch(appAPIUrl)
			.then(handleErrors)
			.then((response) => response.json());
	},
	createOrUpdateApp: (id, appData) => {
		let createURL = appAPIUrl;
		let method = 'POST';
		if (id) {
			createURL += id;
			method = 'PUT';
		}

		return fetch(createURL, {
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: appData
		})
			.then(handleErrors)
			.then((response) => response.json())
	},
	getApp: (id) => {
		return fetch(appAPIUrl + id, {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(handleErrors)
			.then((response) => response.json())
	},
	deleteApp: (id) => {
		return fetch(appAPIUrl + id, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
			.then(handleErrors)
	}
}

export default AppService;