// import-form-json-data_v1.0.0.js
function importJsonAndPopulateForm(formId) {
	// Create an input element to allow the user to select a file
	const input = document.createElement('input');
	input.type = 'file';
	input.accept = 'application/json';

	// When the user selects a file
	input.addEventListener('change', function (event) {
		const file = event.target.files[0];
		if (!file) {
			alert('No file selected!');
			return;
		}

		// Read the contents of the file
		const reader = new FileReader();
		reader.onload = function (e) {
			try {
				const jsonContent = e.target.result;

				// Update the template content with the new JSON
				const template = document.getElementById('json-data-island');
				if (!template) {
					console.error('json-data-island template not found!');
					return;
				}
				template.innerHTML = jsonContent;

				// Call the populateFormWithJson function
				const formData = {
					formId: formId,
					json: jsonContent
				};

				populateFormWithJson(formData);
			} catch (err) {
				console.error('Error reading or processing the file: ', err);
				alert('There was an error processing the JSON file. Please check the file and try again.');
			}
		};

		// Read the file as text
		reader.readAsText(file);
	});

	// Trigger the file input dialog
	input.click();
}