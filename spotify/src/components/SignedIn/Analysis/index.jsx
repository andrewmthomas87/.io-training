import React from 'react'

import timeAgo from '../../../utils/timeAgo'

import './component.less'

class Analysis extends React.Component {

	render() {
		const playHistoryObjects = this.props.playHistoryObjects
		let sum = 0
		for (let i = 0; i < playHistoryObjects.length - 1; i++) {
			sum += playHistoryObjects[i].playedAt - playHistoryObjects[i + 1].playedAt
		}
		const songsPerHour = playHistoryObjects.length / (sum / 1000 / 60 / 60)

		const artists = new Map()
		const artistNames = new Map()
		for (let playHistoryObject of playHistoryObjects) {
			for (let artist of playHistoryObject.track.artists) {
				if (artists.has(artist.id)) {
					artists.set(artist.id, artists.get(artist.id) + 1)
				}
				else {
					artists.set(artist.id, 1)
					artistNames.set(artist.id, artist.name)
				}
			}
		}

		let topArtists = []
		artists.forEach((number, id) => topArtists.push({ id, number }))
		topArtists = topArtists.sort((a, b) => {
			if (a.number === b.number) {
				return artistNames.get(a.id) > artistNames.get(b.id) ? 1 : -1
			}
			else if (a.number > b.number) {
				return -1
			}
			else {
				return 1
			}
		})

		console.log(artists)
		console.log(topArtists)

		const topArtistRows = topArtists.slice(0, 4).map(artist => (
			<tr key={artist.id}>
				<td>{artistNames.get(artist.id)}</td>
				<td>{artist.number} song{artist.number !== 1 ? 's' : ''}</td>
			</tr>
		))

		return (
			<section id='analysis'>
				<h2>Analysis</h2>
				<table>
					<tbody>
						<tr>
							<td>Time span</td>
							<td>{timeAgo.format(playHistoryObjects[playHistoryObjects.length - 1].playedAt)} - {timeAgo.format(playHistoryObjects[0].playedAt)}</td>
						</tr>
						<tr>
							<td>Songs per hour</td>
							<td>{songsPerHour}</td>
						</tr>
						<tr>
							<td className='header'>Top artists</td>
						</tr>
						{topArtistRows}
					</tbody>
				</table>
			</section>
		)
	}

}

export default Analysis
