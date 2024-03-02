// ---
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')
const hamburgerMenuInput = document.querySelector('.hamburger-menu-input')

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
	headerSmallMenuLinks[i].addEventListener('click', () => {
		hamburgerMenuInput.checked = !hamburgerMenuInput.checked
	})
}
