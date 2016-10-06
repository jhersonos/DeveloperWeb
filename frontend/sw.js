const cache_name="ya cache v1"
const cache_urls = ["/cod/DeveloperWeb/frontend/offline/view.html","/cod/DeveloperWeb/frontend/offline/style.css","/cod/DeveloperWeb/frontend/offline/off.png"]

self.addEventListener("install",function(ev){
	console.log("ServiceWorkers instalado")
	caches.open(cache_name)
		.then(function(cache){
			console.log("cache opened")
			return cache.addAll(cache_urls)
		})
})

self.addEventListener("fetch",function(ev){
	console.log(ev.request)
	ev.respondWith(
		caches.match(ev.request)
			.then(function(response){
				if (response) {
					return response
				}

				return fetch(ev.request)
			})
		)
})