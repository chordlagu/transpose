var cacheName = 'hello-pwa'; 
var filesToCache = [
'/',    
'/index.html',
'/logo.png',
'/meter.js',
'/notes.js',
'/tuner.js',
'/app.js',
'/manifest.json',
'/frequency-bars.js',
'/aubio.js',
'/aubio.wasm',
'/style.css',  
'/main.js'  ];  
self.addEventListener('install', function(e) { 
e.waitUntil(
caches.open(cacheName).then(function(cache) { 
return cache.addAll(filesToCache);   
})    
);  
}); 
/* Serve cached content when offline */ 
self.addEventListener('fetch', function(e) {  
e.respondWith(      caches.match(e.request).then(function(response) {  
return response || fetch(e.request);
})   
);  
});
