self.addEventListener('install', (event) => {  
	console.log('ServiceWorker install:', event)  
})  
	
self.addEventListener('activate', (event) => {  
	console.log('ServiceWorker activate:', event)  
})

const CacheName = 'Cache:v1'

const networkFallingBackToCache = async (request) => {
	const cache = await caches.open(CacheName)
	try {
		const responce = await fetch(request)
		await cache.put(request, responce.clone())
		return responce
	} catch(err) {
		console.error(err)
		return cache.match(request)
	}
}

self.addEventListener('fetch', (event) => {
    console.log('Fetch to:', event.request.url)
    event.respondWith(networkFallingBackToCache(event.request))
})

