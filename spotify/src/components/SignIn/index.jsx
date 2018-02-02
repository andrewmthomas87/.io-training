import React from 'react'

import config from '../../config'

import './component.less'

const SignIn = () => (
	<section id='sign-in'>
		<a href={`${config.signInURL}?client_id=${config.clientID}&response_type=token&scope=playlist-read-private user-library-read user-read-recently-played&redirect_uri=${config.redirectURI}`}>Sign in</a>
	</section>
)

export default SignIn
