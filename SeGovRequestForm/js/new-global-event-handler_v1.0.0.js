/*
@language: en-US
@title: new-global-event-handler_v1.0.0.js
@subject: This script sets up a global event listener to detect specific events on elements with a designated attribute, then maps those events to actions defined in a provided action map.
@tags: global event listener
@category:
@content status: Draft
@company: 
@author: Clint Mulligan <clintmulligan@gmail.com>
@comment:
*/

/**
 * Initializes a global event handler that listens for specified events on elements with a particular attribute,
 * then executes actions defined in an action map based on the attribute value.
 * 
 * @param {string[]} [events=['click']] - Array of event types to listen for (e.g., 'click', 'keyup').
 * @param {string} [attribute='data-page-action'] - The attribute name to look for on target elements.
 * @param {Object} actionMap - An object containing action functions, where each key is an action name and the value is the function to execute.
 * 
 * @example
 * // Define an action map with custom actions
 * const actionMap = {
 *		showMessage: (element) => alert(`Action: showMessage - Triggered by ${element.tagName}`),
 *		logMessage: (element) => console.log(`Action: logMessage - Triggered by ${element.tagName}`)
 * };
 * 
 * // Initialize the global event handler
 * window.addEventListener('DOMContentLoaded', () => {
 *		newGlobalEventHandler(['click', 'keyup'], 'data-page-action', actionMap);
 * });
 */
const newGlobalEventHandler = (events = ['click'], attribute = 'data-page-action', actionMap = {}) => {

	// Main event handler function
	const handleActions = (event) => {

		// Find the nearest element with the specified attribute
		const target = event.target.closest(`[${attribute}]`);

		if (target) {
			const requestedActions = target.getAttribute(attribute);

			// Call each action in the actionMap, passing the target element
			requestedActions.split(',').forEach(eachAction => {
				const trimmedAction = eachAction.trim();
				if (actionMap[trimmedAction]) {
					actionMap[trimmedAction](target);
				} else {
					// console.warn(`Action "${trimmedAction}" not found in action map.`);
				}
			});
		}
	};

	// Attach the handleActions function to each specified event type
	events.forEach(eventType => {
		document.addEventListener(eventType, handleActions);
	});
};
