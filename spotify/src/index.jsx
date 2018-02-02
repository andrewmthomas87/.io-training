import React from 'react'
import { render } from 'react-dom'

import SignIn from 'components/SignIn'
import SignedIn from 'components/SignedIn'

import 'less/app.less';

if (location.hash) {
	const parameters = location.hash.substring(1).split('&')
	for (let parameter of parameters) {
		if (parameter.startsWith('access_token')) {
			localStorage.setItem('accessToken', parameter.split('=')[1])
			location.hash = ''
		}
	}
}

const accessToken = localStorage.getItem('accessToken')

render(accessToken ? <SignedIn /> : <SignIn />, document.querySelector('div#root'))
