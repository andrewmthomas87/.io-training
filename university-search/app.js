
/**
 * Abstract class describing a model-view-controller component
 */
class Component {

	constructor() {
		this.state = {}	// Give the state (model) a default empty object value
	}

	/**
	 * Updates the state by merging the current state with a newState object
	 *
	 * @param {*} newState an object describing the new state
	 */
	setState(newState) {
		this.state = Object.assign({}, this.state, newState)	// Merges the current state and newState objects into an empty object and assigns the resulting object to state
		this.render()											// Call render because the model has changed
	}

}

/**
 * Class for wrapping university data objects
 */
class UniversityData {

	constructor(data) {
		this.alphaTwoCode = data.alpha_two_code
		this.country = data.country
		this.stateProvince = data.state_province
		this.domains = data.domains
		this.name = data.name
		this.webPages = data.web_pages
	}

	/**
	 * Gets the location string for this university
	 *
	 * @return {string} the location string
	 */
	getLocation() {
		return `${this.stateProvince ? `${this.stateProvince}, ` : ''}${this.country}`
	}

}

/**
 * UniversitySearch component that allows a user input a query name and then loads and displays university information for matched universities
 */
class UniversitySearch extends Component {

	/**
	 * Creates a new UniversitySearch component
	 *
	 * @param {HTMLDivElement} container the container to inject the component into
	 */
	constructor(container) {
		super()

		// Initializes the container with the initial elements
		container.innerHTML = `
			<form>
				<input type='text' placeholder='Name' />
			</form>
			<br />
			<div></div>
		`

		this.input = container.querySelector('input')
		this.div = container.querySelector('div')

		// Creates a subscription to 'submit' events from the component's form element with a callback of onSubmit
		container.querySelector('form').addEventListener('submit', this.onSubmit.bind(this))

		// Sets the initial state
		this.setState({
			universities: [],	// The list of loaded universities
			loading: false		// If the component is actively loading universities
		})
	}

	render() {
		// Disables the input if loading
		if (this.state.loading) {
			this.input.setAttribute('disabled', 'true')
		}
		else {
			this.input.removeAttribute('disabled')
		}

		if (this.state.loading) {
			this.div.innerHTML = '<p>Loading...</p>'
		}
		else {
			// Outputs information about each loaded university to the component's output div
			this.div.innerHTML = this.state.universities.map(university => `
				<div>
					<h3>${university.name}</h3>
					<p>${university.getLocation()}</p>
					<h4>Domains</h4>
					<ul>${university.domains.map(domain => `<li>${domain}</li>`).join('')}</ul>
					<h4>Webpages</h4>
					<ul>${university.webPages.map(webPage => `<li><a target='_blank' href='${webPage}'>${webPage}</a></li>`).join('')}</ul>
				</div>
				<br />
			`).join('')
		}
	}

	/**
	 * Handles form submission
	 * Sends a request to the universities API with the user's search query
	 *
	 * @param {Event} event the form submission event object
	 */
	onSubmit(event) {
		event.preventDefault()																		// Prevents the default action the browser takes for this event after our listener executes. In the case of a form, this means redirecting the browser to the action url to perform an HTTP request.

		if (!this.state.loading) {																	// Only send a new request if a request is not already active
			UniversitySearch.getUniversities(this.input.value).then(this.onUniversities.bind(this))	// Gets a JSON response promise and sets the fullfilled callback to onUniversities

			this.setState({ loading: true })														// Updates the loading property of the state to true
		}
	}

	/**
	 * Handles the parsed response to a universities request
	 *
	 * @param {object[]} universities the parsed response, an array of university data objects
	 */
	onUniversities(universities) {
		universities = universities.map(university => new UniversityData(university))	// Maps the raw university data objects to UniversityData objects

		this.setState({																	// Updates the state with the universities and sets loading to false
			universities: universities,
			loading: false
		})
	}

	/**
	 * Sends a request to the universities API with a given name search query
	 *
	 * @param {string} name the university name search query
	 *
	 * @return {Promise<object>} the parsed response
	 */
	static getUniversities(name) {
		// See Fetch API (https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
		return fetch(`http://cors-anywhere.herokuapp.com/http://universities.hipolabs.com/search?name=${name}`).then(response => response.json())
	}

}

new UniversitySearch(document.querySelector('div'))
