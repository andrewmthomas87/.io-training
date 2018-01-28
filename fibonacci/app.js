
/**
 * Computes and returns the first n numbers of the Fibonacci sequence
 *
 * @param n (number) length of sequence
 *
 * @return (number[]) the first n numbers of the Fibonacci sequence
 */
function getFibonacciSequence(n) {
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

/**
 * ----------------------------------------------------------------------------------------
 * --- App logic --------------------------------------------------------------------------
 * ----------------------------------------------------------------------------------------
 */

/**
 * Handles form submission (when the user hits enter with the input box focused).
 * If a valid value of n (number & > 0) is entered, update the fibonacci output in outputDiv.
 *
 * @param event the form submission event object
 */
function onSubmit(event) {
	event.preventDefault()										// Prevents the default action the browser takes for this event after our listener executes. In the case of a form, this means redirecting the browser to the action url to perform an HTTP request.

	const n = parseInt(input.value)								// Even though our input has a type of number, its value property is always a string
	if (!isNaN(n) && n > 0) {									// NaN === NaN is always false, so we have to use the global isNaN function
		const sequence = getFibonacciSequence(n)
		outputDiv.innerHTML = sequence.map(function (number) {	// See Element.innerHTML (https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML)
			return `<div>${number}</div>`						// Maps the list of numbers to a list of HTML strings
		}).join('')												// Transforms the list of strings to a single string by concatenating them all with an empty string in between
	}
}

const input = document.querySelector('input')
const outputDiv = document.querySelector('div')

document.querySelector('form').addEventListener('submit', onSubmit)	// Create a subscription to 'submit' events from the form element with onSubmit as the callback
