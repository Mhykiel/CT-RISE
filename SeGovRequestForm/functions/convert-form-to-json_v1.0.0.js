// convert-form-to-json_v1.0.0.js
function convertFormToJson(formId) {

	const form = document.getElementById(formId);
	const json = {};

	if (!form) {
		console.error(`Form with ID ${formId} not found.`);
		return null;
	}

	// Helper function to collect form data
	const collectInputData = (input) => {
		const name = input.name || input.id;
		if (!name) return;

		switch (input.type) {
			case 'text':
			case 'password':
			case 'email':
			case 'tel':
			case 'url':
			case 'number':
			case 'range':
			case 'date':
			case 'month':
			case 'week':
			case 'time':
			case 'datetime-local':
			case 'color':
			case 'textarea':
				return { [name]: input.value };
			case 'select-one':
				return { [name]: input.options[input.selectedIndex].value };
			case 'checkbox':
				return input.checked ? { [name]: input.value } : null;
			case 'radio':
				return input.checked ? { [name]: input.value } : null;
			case 'file':
				if (input.files.length > 0) {
					return {
						[name]: Array.from(input.files).map(file => ({
							name: file.name,
							type: file.type,
							size: file.size
						}))
					};
				}
				return { [name]: [] };
			case 'hidden':
				return { [name]: input.value };
			default:
				return null;
		}
	};

	// Collect inputs that are not inside any fieldset or table
	form.querySelectorAll('input, select, textarea').forEach(input => {
		if (!input.closest('fieldset') && !input.closest('table')) {
			const data = collectInputData(input);
			if (data) {
				Object.assign(json, data);
			}
		}
	});

	// Iterate over fieldsets to group inputs and tables inside them
	form.querySelectorAll('fieldset').forEach(fieldset => {
		const fieldsetName = fieldset.getAttribute('name') || fieldset.getAttribute('id');
		if (!fieldsetName) return;

		// Initialize the fieldset in JSON object
		json[fieldsetName] = {};

		fieldset.querySelectorAll('input, select, textarea').forEach(input => {
			if (!input.closest('table')) {
				const data = collectInputData(input);
				if (data) {
					Object.assign(json[fieldsetName], data);
				}
			}
		});

		// Handle tables inside the fieldset
		fieldset.querySelectorAll('table').forEach(table => {
			const tableId = table.id;
			if (tableId) {
				json[fieldsetName][tableId] = tableToJson(tableId);
			}
		});
	});

	// Convert checkbox arrays to comma-separated strings but skip tables
	Object.keys(json).forEach(key => {
		if (typeof json[key] === 'object') {
			Object.keys(json[key]).forEach(subKey => {
				if (Array.isArray(json[key][subKey]) && typeof json[key][subKey][0] !== 'object') {
					json[key][subKey] = json[key][subKey].join(', ');
				}
			});
		}
		if (Array.isArray(json[key]) && typeof json[key][0] !== 'object') {
			json[key] = json[key].join(', ');
		}
	});

	return JSON.stringify(json, null, 2); // Output formatted JSON
}

// Helper function to convert table rows into JSON array
function tableToJson(tableId) {
	const table = document.getElementById(tableId);
	const rows = table.rows;
	const data = [];

	if (!table) {
		console.error(`Table with ID ${tableId} not found.`);
		return [];
	}

	// Skip the header row, start from 1
	for (let i = 1; i < rows.length; i++) {
		const row = rows[i];
		const rowData = {};

		// Iterate over the cells in each row
		for (let j = 0; j < row.cells.length; j++) {
			const input = row.cells[j].querySelector('input, select');
			if (input) {
				const name = input.name || input.id;
				if (!name) continue;
				const value = input.type === 'checkbox' ? input.checked : input.value;
				rowData[name] = value;
			}
		}

		data.push(rowData);
	}

	return data;
}