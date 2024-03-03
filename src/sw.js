const CACHE = "cache-v1"

const precacheResources = [
	"/",
	"/index.html",
	"/project-1.html",
	"/project-2.html",
	"/project-3.html",
	"/manifest.json",
	"/css/style.min.css",
	"/js/index.js",

	"/assets/projects/gallery-me_x345.webp",
	"/assets/projects/gallery-me_x552.webp",
	"/assets/projects/gallery-me_x718.webp",
	"/assets/projects/gallery-me_x828.webp",
	"/assets/projects/gallery-me_x936.webp",
	"/assets/projects/gallery-me.webp",

	"/assets/projects/gpt-messenger-clone_x345.webp",
	"/assets/projects/gpt-messenger-clone_x552.webp",
	"/assets/projects/gpt-messenger-clone_x718.webp",
	"/assets/projects/gpt-messenger-clone_x828.webp",
	"/assets/projects/gpt-messenger-clone_x936.webp",
	"/assets/projects/gpt-messenger-clone.webp",

	"/assets/projects/the-healthy-serve_x345.webp",
	"/assets/projects/the-healthy-serve_x552.webp",
	"/assets/projects/the-healthy-serve_x718.webp",
	"/assets/projects/the-healthy-serve_x828.webp",
	"/assets/projects/the-healthy-serve_x936.webp",
	"/assets/projects/the-healthy-serve.webp",

	"/assets/svg/common-bg.svg",
	"/assets/svg/github.svg",
	"/assets/svg/linkedin.svg",
	"/assets/svg/pwa.svg",

	"/assets/favicon.svg",
	"/assets/fred.webp",
]

// Cache all the selected items once application is installed
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE)
			.then(cache => cache.addAll(precacheResources))
			.catch(error => console.error("Failed to cache:", error))
	)
})

// Whenever a resource is requested, return if its cached else fetch the resource from server
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request)
			.then(cachedResponse => {
				if (cachedResponse) {
					return cachedResponse;
				}
				return fetch(event.request);
			})
	)
})
