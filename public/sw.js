const staticCacheName = "note-site-v2"; 
const dinamicCacheName = "dinamic-note-site-v2"; 

const ASSETS = [
    '/',
    'index.html',
    '/offline.html',
    '/manifest.json',
    '/styles/App.css',
    '/styles/App.css',
    '/styles/EditorStyles.css',
    '/styles/Sidebar.css',
    '/styles/WorkSpace.css',
    'easymde/dist/easymde.min.css',
]




self.addEventListener('install', async (e) => {
    const cache = await caches.open(staticCacheName);
    await cache.addAll(ASSETS);
})    


//activate event
self.addEventListener('activate', async (e) => {
    const cachesKeysArr = await caches.keys();
    await Promise.all(cachesKeysArr.filter(key => key !== staticCacheName && key !== dinamicCacheName).map(key => caches.delete(key)));
})

self.addEventListener('fetch', (event) => {
    event.respondWith(cacheFirst(event.request));
/*    event.respondWith(
        caches.match(event.request).then(cacheRes => {
            return cacheRes || fetch(event.request).then(response => {
                return caches.open(dinamicCacheName).then(cache => {
                    cache.put(event.request.url, response.clone())
                    return response;
                })
            });
        })
    )
*/
})

async function cacheFirst(request) {
    const cached = await caches.match(request);
    try {
        return cached ?? await fetch(request)
           .then(response => {
            return networkFirst(request);
        });        
    } catch (error) {
        return networkFirst(request);
    }
}

async function networkFirst(request) {
    const cache = await caches.open(dinamicCacheName);
    try {
        const response = await fetch(request);
        await cache.put(request, response.clone());
        return response;
    } catch (error) {
        const cached = await cache.match(request);
        return cached ?? await caches.match('/offline.html');
    }
}