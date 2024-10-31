// Helper Function that sets value appropriately
function setInputValue(element, value) {
	if (element) {
		if (typeof value === 'object') {
			// Skip object values
			return;
		}

		switch (element.tagName.toLowerCase()) {
			case 'input':
				switch (element.type) {
					case 'checkbox':
						// Handle comma-separated lists for checkboxes (e.g., days of the week)
						if (typeof value === 'string' && value.includes(',')) {
							const values = value.split(',').map(v => v.trim().toLowerCase());
							element.checked = values.includes(element.value.toLowerCase());
						} else {
							element.checked = (value.toString().toLowerCase() === element.value.toLowerCase());
						}
						break;
					case 'radio':
						const radioGroup = document.querySelectorAll(`[name="${element.name}"]`);
						radioGroup.forEach(radio => {
							if (radio.value === value) {
								radio.checked = true;
							}
						});
						break;
					case 'file':
						// Skip file inputs, as we cannot set file value programmatically
						break;
					default:
						element.value = value;
						break;
				}
				break;
			case 'select':
			case 'textarea':
				element.value = value;
				break;
			default:
				element.innerText = value;
				break;
		}
	}
}


// Helper Function to add rows to table
function populateTable(tableId, rows) {
	const tables = document.querySelectorAll(`table#${tableId}`);
	tables.forEach(table => {
		const tbody = table.querySelector('tbody');
		const rowTemplate = tbody.querySelector('tr:first-of-type').cloneNode(true);

		// Clear the table content except for the header
		tbody.innerHTML = '';

		// Iterate through the rows in the JSON data
		rows.forEach((rowData, rowIndex) => {
			const newRow = rowTemplate.cloneNode(true);
			Object.keys(rowData).forEach(cellKey => {
				const cell = newRow.querySelector(`[id="${cellKey}"], [name="${cellKey}"]`);
				if (cell) {
					setInputValue(cell, rowData[cellKey]);
				}
			});
			tbody.appendChild(newRow);
		});
	});
}

// Recursive function to populate form fields
function populateFormWithJson(formId, dataIslandId) {
	const htmlForm = document.getElementById(formId);
	const jsonDataElement = document.getElementById(dataIslandId);

	if (!htmlForm) {
		console.error(`Form with id "${formId}" not found.`);
		return;
	}

	if (!jsonDataElement) {
		console.error(`Data island with id "${dataIslandId}" not found.`);
		return;
	}

	// Retrieve the JSON string from the template's content
	const jsonText = jsonDataElement.content.textContent.trim();

	let jsonData;
	try {
		// Parse the JSON data from the inner text
		jsonData = JSON.parse(jsonText);

		// Proceed with using jsonData
		// console.log("Parsed JSON data:", jsonData);
	} catch (error) {
		console.error("Failed to parse JSON data:", error);
		return;
	}

	function populateFieldset(key, value) {
		// Handle cases where value is an object or array
		if (typeof value === 'object' && !Array.isArray(value)) {
			// Iterate through the nested object
			Object.keys(value).forEach(subKey => {
				const elementArray = htmlForm.querySelectorAll(`[id="${subKey}"], [name="${subKey}"]`);
				const nestedValue = value[subKey];

				elementArray.forEach(element => {
					// If element is a table, populate the rows
					if (element.tagName.toLowerCase() === 'table') {
						populateTable(subKey, nestedValue);
					} else {
						setInputValue(element, nestedValue);
					}
				});
			});
		} else if (Array.isArray(value)) {
			// Handle array case (likely for tables)
			populateTable(key, value);
		} else {
			// Handle primitive values (string, number, etc.)
			const elementArray = htmlForm.querySelectorAll(`[id="${key}"], [name="${key}"]`);
			elementArray.forEach(element => {
				setInputValue(element, value);
			});
		}
	}

	// Iterate over the keys in the JSON data
	Object.keys(jsonData).forEach(key => {
		populateFieldset(key, jsonData[key]);
	});
}