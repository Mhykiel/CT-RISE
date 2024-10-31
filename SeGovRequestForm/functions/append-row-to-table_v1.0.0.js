/*
@language: en-US
@title: append-row-to-table_v1.0.0.js
@subject: A utility function that appends a new row to a specified table by cloning the first row's structure and clearing values for inputs and selects within the cloned cells.
@tags: table, append row
@category:
@content status: Draft
@company: 
@author: Clint Mulligan <clintmulligan@gmail.com>
@comment:
*/

/**
 * Appends a new row to the target table by cloning the first row's structure.
 * @param {string} tableId - ID of the table to which the row will be appended. Defaults to "targetTable".
 */
function appendRowToTable(tableId) {

	// Get the target table body
	const targetTableBody = document.getElementById(tableId).querySelector("tbody");
	if (!targetTableBody) {
		console.warn(`No table body found in table with ID "${tableId}".`);
		return;
	}

	// Get the first row in the table body to use as a template
	const targetFirstRow = targetTableBody.rows[0];
	if (!targetFirstRow) {
		console.warn("No rows found in the target table body.");
		return;
	}

	// Clone the first row
	const newTableRow = targetFirstRow.cloneNode(true);

	// Clear values of form elements in the cloned row
	const formElements = newTableRow.querySelectorAll("input, select");

	formElements.forEach((element) => {
		// Ensure unique name and ID for each cloned element
		if (element.name) {
			element.name = `${element.name}_${targetTableBody.rows.length}`;
			element.id = `${element.id}_${targetTableBody.rows.length}`;
		}

		// Clear the value based on element type
		switch (element.tagName.toLowerCase()) {
			case 'input':
				element.value = ""; // Clear input value
				break;
			case 'select':
				element.selectedIndex = 0; // Reset select to the first option
				break;
			default:
				break;
		}
	});

	// Append the cloned row to the table body
	targetTableBody.appendChild(newTableRow);
}

