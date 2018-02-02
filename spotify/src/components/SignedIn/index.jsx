import React from 'react'

import Spotify from '../../Spotify'

import Track from './Track'
import Analysis from './Analysis'

import './component.less'

class SignedIn extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loaded: false,
			playHistoryObjects: []
		}
	}

	componentWillMount() {
		Spotify.getRecentlyPlayed(50)
			.then((response) => {
				this.setState({
					loaded: true,
					playHistoryObjects: response.items
				})
			})
			.catch((error) => {
				localStorage.clear()
				location.reload()
			})
	}

	render() {
		if (!this.state.loaded) {
			return <div id='loading'><div /></div>
		}

		const tracks = this.state.playHistoryObjects.map(playHistoryObject => <Track key={playHistoryObject.playedAt} track={playHistoryObject.track} playedAt={playHistoryObject.playedAt} />)

		return (
			<section id='signed-in'>
				<h1>Recently played</h1>
				<div>{tracks}</div>
				<Analysis playHistoryObjects={this.state.playHistoryObjects} />
			</section>
		)
	}

}

export default SignedIn
