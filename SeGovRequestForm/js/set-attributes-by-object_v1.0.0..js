/*
@language: en-US
@title: setAttributesByObject_v1.0.0.js
@subject: This utility function applies or toggles attributes on an HTML element based on key-value pairs in an object.
@tags: attributes, DOM manipulation, utility function
@category: 
@content status: Draft
@company: 
@author: Clint Mulligan <clintmulligan@gmail.com>
@comment: 
*/

/**
 * Sets multiple attributes on an HTML element based on a provided JSON object.
 * 
 * - If `value` is provided, the function updates or adds the attribute with `value`.
 * - If `value` is `undefined`, the function toggles the attribute, adding it without a value if it doesn’t exist, or removing it if it does.
 * 
 * @param {HTMLElement} element - The HTML element on which attributes are to be set.
 * @param {Object} attributesObj - A JSON object where each key is an attribute name, and each value is the attribute's new value.
 * @param {string} attributesObj.attribute - The attribute to be modified or added.
 * @param {string|undefined} attributesObj.value - The new value for the attribute. If `undefined`, the attribute is toggled (added as a toggle if it doesn’t exist or removed if it does).
 * 
 * @example
 * // Select the <html> element
 * let htmlElement = document.documentElement;
 * 
 * // JSON object with attribute-value pairs
 * const myAttributes = {
 *		"data-theme-mode": "light",
 *		"data-layout": "grid",
 *		"hidden": undefined, // Toggles "hidden": adds it if it doesn’t exist, removes it if it does
 * };
 * 
 * // Apply the attributes from JSON to the element
 * setAttributesByObject(htmlElement, myAttributes);
 */
function setAttributesByObject(element, attributesObj) {
	Object.entries(attributesObj).forEach(([attribute, value]) => {
		switch (true) {
			case value !== undefined:
				element.setAttribute(attribute, value);
				break;

			case value === undefined:
				element.toggleAttribute(attribute);
				break;
		}
	});
}
