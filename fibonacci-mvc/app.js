
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
 * Fibonacci component class
 */
class Fibonacci extends Component {

	/**
	 * Creates a new Fibonacci component
	 *
	 * @param {HTMLFormElement} form
	 * @param {HTMLInputElement} input
	 * @param {HTMLDivElement} outputDiv
	 */
	constructor(form, input, outputDiv) {
		super()

		form.addEventListener('submit', this.onSubmit.bind(this))	// Create a subscription to 'submit' events from the form element with method onSubmit as the callback
		// See Function.prototype.bind (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

		this.input = input
		this.outputDiv = outputDiv

		this.setState({ n: 0 })	// Set an initial state with an n property as 0
	}

	render() {
		// Determines if a valid n (number & > 0) has been entered
		if (!isNaN(this.state.n) && this.state.n >= 1) {
			const sequence = Fibonacci.getFibonacciSequence(this.state.n)
			// See Arrow Functions (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
			this.outputDiv.innerHTML = sequence.map(number => `<div>${number}</div>`).join('')	// Maps the list of numbers to a list of HTML strings and then transforms the list of strings to a single string by concatenating them all with an empty string in between
		}
		else {
			this.outputDiv.innerHTML = '<p>Input <i>n</i>, the number of Fibonacci sequence numbers to output, and then press enter</p>'
		}
	}

	/**
	 * Handles form submission (when the user hits enter with the input box focused)
	 * Updates the state based on the user input
	 *
	 * @param {Event} event the form submission event object
	 */
	onSubmit(event) {
		event.preventDefault()					// Prevents the default action the browser takes for this event after our listener executes. In the case of a form, this means redirecting the browser to the action url to perform an HTTP request.

		const n = parseInt(this.input.value)	// Even though our input has a type of number, its value property is always a string
		this.setState({ n: n })					// Set the n property of the state to the new n value.  This will automatically trigger a re-render.
	}

	/**
	 * Computes and returns the first n numbers of the Fibonacci sequence
	 *
	 * @param {number} n length of sequence
	 *
	 * @return {number[]} the first n numbers of the Fibonacci sequence
	 */
	static getFibonacciSequence(n) {
		let previous = 0
		let sequence = [previous]
		if (n == 1) {
			return sequence
		}

		let current = 1
		sequence.push(current)

		for (let i = 2; i < n; i++) {
			const temp = current
			current = previous + current
			previous = temp

			sequence.push(current)
		}

		return sequence
	}
}


// Gets references to the two seperate containers, one and two
const one = document.querySelector('div#one')
const two = document.querySelector('div#two')

// See Element.querySelector (https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector)
// Creates Fibonacci components in each of the containers, specifying the relevant HTMLFormElement, HTMLInputElement, and HTMLDivElement elements by querying for them on the container references (e.g., one.querySelector as opposed to document.querySelector)
const fibonacci1 = new Fibonacci(one.querySelector('form'), one.querySelector('input'), one.querySelector('div'))
const fibonacci2 = new Fibonacci(two.querySelector('form'), two.querySelector('input'), two.querySelector('div'))
