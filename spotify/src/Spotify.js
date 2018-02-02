import config from './config'
import { PagingObject, PlayHistoryObject } from './models/spotify'

class Spotify {

	static getTracks() {
		return Spotify._get('v1/me/tracks')
	}

	static getRecentlyPlayed(limit = 20) {
		return Spotify._get(`v1/me/player/recently-played/?limit=${limit}`)
			.then(data => {
				return new PagingObject(data, PlayHistoryObject)
			})
	}

	static _get(endpoint) {
		return fetch(`${config.apiBaseURL}${endpoint}`, { headers: { 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` } })
			.then(response => response.json())
			.then((data) => {
				if (data.error) throw data

				return data
			})
	}

}

export default Spotify
