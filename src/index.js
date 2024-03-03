// ---
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')
const hamburgerMenuInput = document.querySelector('.hamburger-menu-input')

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    hamburgerMenuInput.checked = !hamburgerMenuInput.checked
  })
}

// --- register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/js/sw.js')
      .then(registration => console.info('Service Worker registered with scope:', registration.scope))
      .catch(error => console.info('Service Worker registration failed:', error))
  })

  navigator.serviceWorker.register('/js/sw.js')
    .then(registration => console.info('Service Worker registered with scope:', registration.scope))
    .catch(error => console.info('Service Worker registration failed:', error))
}

// Initialize deferredPrompt for use later to show browser install prompt.
let deferredPrompt

window.addEventListener('beforeinstallprompt', event => {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault()
  // Stash the event so it can be triggered later.
  deferredPrompt = event
  // Update UI notify the user they can install the PWA
  showInstallPromotion()
  // Optionally, send analytics event that PWA install promo was shown.
  // console.log(`'beforeinstallprompt' event was fired.`)
})

// --- install app
const installApp = document.querySelector('.install-app')
installApp?.addEventListener('click', async () => {
  // Hide the app provided install promotion
  hideInstallPromotion()
  // Show the install prompt
  deferredPrompt.prompt()
  // Wait for the user to respond to the prompt
  // const { outcome } = await deferredPrompt.userChoice
  // Optionally, send analytics event with outcome of user choice
  // console.log(`User response to the install prompt: ${outcome}`);

  // We've used the prompt, and can't use it again, throw it away
  deferredPrompt = null
});

// --- detect app install
window.addEventListener('appinstalled', () => {
  // Hide the app-provided install promotion
  hideInstallPromotion()
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null
  // Optionally, send analytics event to indicate successful install
  console.log('PWA was installed')
});

function showInstallPromotion() {
  installApp.style.display = 'block'
}

function hideInstallPromotion() {
  installApp.style.display = 'none'
}