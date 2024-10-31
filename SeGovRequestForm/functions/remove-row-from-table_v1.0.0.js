/*
@language: en-US
@title: remove-row-from-table_v1.0.0.js
@subject: A utility function that removes a specified row from a table, identified by a given row element.
@tags: table, remove row
@category:
@content status: Draft
@company: 
@author: Clint Mulligan <clintmulligan@gmail.com>
@comment:
*/

/**
 * Removes a specified row element from its parent table body.
 * @param {HTMLElement} rowElement - The row element (tr) to be removed from the table.
 * 
 * @example
 * // Assuming rowElement is a reference to the row to be removed
 * removeRowFromTable({ rowElement: targetRow });
 */
function removeRowFromTable(rowElement) {

	// Check if rowElement is a valid table row
	if (!rowElement || rowElement.tagName.toLowerCase() !== 'tr') {
		// console.warn("Invalid row element provided.");
		return;
	}

	// Get the parent tbody element
	const parentTableBody = rowElement.parentElement;

	// Check if the parent element is a tbody and remove the row
	if (parentTableBody && parentTableBody.tagName.toLowerCase() === 'tbody') {
		parentTableBody.removeChild(rowElement);
	} else {
		// console.warn("The specified row does not belong to a tbody element.");
	}
}
