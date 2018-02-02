
class ContextObject {

	constructor(data) {
		this.type = data.type
		this.href = data.href
		this.externalURLs = data.external_urls
		this.uri = data.uri
	}

}

class CursorObject {

	constructor(data) {
		this.after = data.after
	}

}

class PagingObject {

	constructor(data, klass) {
		this.href = data.href
		this.items = data.items.map(item => new klass(item))
		this.limit = data.limit
		this.next = data.next ? new CursorObject(data.next) : null
		this.total = data.total
	}

}

class SimpleAlbumObject {

	constructor(data) {
		this.albumType = data.album_type
		this.availableMarkets = data.available_markets
		this.externalURLs = data.external_urls
		this.href = data.href
		this.id = data.id
		this.images = data.images
		this.name = data.name
		this.type = data.type
		this.uri = data.uri
	}

}

class SimpleArtistObject {

	constructor(data) {
		this.externalURLs = data.external_urls
		this.href = data.href
		this.id = data.id
		this.name = data.name
		this.type = data.type
		this.uri = data.uri
	}

}

class TrackLinkObject {

	constructor(data) {
		this.externalURLs = data.external_urls
		this.href = data.href
		this.id = data.id
		this.type = data.type
		this.uri = data.uri
	}

}

class SimpleTrackObject {

	constructor(data) {
		this.album = new SimpleAlbumObject(data.album)
		this.artists = data.artists.map(artist => new SimpleArtistObject(artist))
		this.availableMarkets = data.available_markets
		this.discNumber = data.disc_number
		this.durationMs = data.duration_ms
		this.explicit = data.explicit
		this.externalURLs = data.external_urls
		this.href = data.href
		this.id = data.id
		this.isPlayable = data.is_playable
		this.linkedFrom = data.linked_from ? new TrackLinkObject(data.linked_from) : null
		this.name = data.name
		this.previewURL = data.preview_url
		this.trackNumber = data.track_number
		this.type = data.type
		this.uri = data.uri
	}

}

class PlayHistoryObject {

	constructor(data) {
		this.track = new SimpleTrackObject(data.track)
		this.playedAt = new Date(data.played_at)
		this.context = data.context ? new ContextObject(data.context) : null
	}

}

export { ContextObject, CursorObject, PagingObject, SimpleArtistObject, TrackLinkObject, SimpleTrackObject, PlayHistoryObject }
