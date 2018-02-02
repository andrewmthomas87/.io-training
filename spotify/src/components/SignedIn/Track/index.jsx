import React from 'react'

import timeAgo from '../../../utils/timeAgo'

import './component.less'

const Track = (props) => {
	let style
	if (props.track.album.images && props.track.album.images.length) {
		style = { backgroundImage: `url('${props.track.album.images[0].url}')` }
	}
	else {
		style = {}
	}

	const artists = props.track.artists.map(artist => artist.name).join(', ')

	return (
		<div className='track'>
			<div style={style}>
				<span>{timeAgo.format(props.playedAt)}</span>
			</div>
			<h2>{props.track.name}</h2>
			<h4><span>{artists}</span></h4>
		</div>
	)
}

export default Track
