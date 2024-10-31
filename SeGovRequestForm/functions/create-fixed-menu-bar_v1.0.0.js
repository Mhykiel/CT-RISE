// FIXME Fixed-Menu scroll behavior
// Top of page scrolls to link, normal behavior, however the menu is fixed and covers the first few pixels of the link.
// adjust the scroll behavior so the bottom of the menu scrolls to the link.
document.addEventListener('DOMContentLoaded', function () {
	var menuBar = document.getElementById('menu-bar');
	var headerHeight = document.querySelector('header').offsetHeight;
	var fixedMenuBar = document.createElement('div');
	fixedMenuBar.id = 'fixed-menu-bar';
	document.body.appendChild(fixedMenuBar);

	window.addEventListener('scroll', function () {
		if (window.scrollY > headerHeight) {
			// Clone the menu bar content and append it to fixedMenuBar
			if (fixedMenuBar.childNodes.length === 0) {
				var clonedMenu = menuBar.cloneNode(true);
				// Append the clone to the new menu element.
				fixedMenuBar.appendChild(clonedMenu);
				fixedMenuBar.style.display = 'block';
			}
		} else {
			// Hide and remove the cloned menu when scrolling up
			fixedMenuBar.style.display = 'none';
			while (fixedMenuBar.firstChild) {
				fixedMenuBar.removeChild(fixedMenuBar.firstChild);
			}
		}
	});
});


