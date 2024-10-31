function downloadJsonDom(newFilenamePrefix, dataIslandId) {
	const filenamePrefix = newFilenamePrefix || 'form-json';
	const template = document.getElementById(dataIslandId);

	if (!template) {
		console.error('Data Island template not found');
		return;
	}

	// Read JSON data from textContent
	const jsonData = template.textContent.trim();

	// Convert JSON string to a Blob for download
	const blob = new Blob([jsonData], { type: 'application/json' });

	// Create a link element to trigger the download
	const link = document.createElement('a');
	link.href = URL.createObjectURL(blob);

	// Use filenamePrefix for the file name
	link.download = `${filenamePrefix}-data.json`;

	// Append the link to the body, trigger click, then remove it
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
}
