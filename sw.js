var cacheName = 'hello-pwa'; 
var filesToCache = [
'/',    
'/index.html',
'https://1.bp.blogspot.com/-OzWSvdMBej8/XxSa5nQN7_I/AAAAAAAAEgw/LLqI8Qhavc0FrTVaWHpdMtICSdCOax7OACPcBGAYYCw/s1600/CHORDLAGU_ID%2B%25281%2529%2B%25281%2529.png',
'/meter.js',
'/notes.js',
'/tuner.js',
'/app.js',
'/frequency-bars.js',
'/aubio.js',
'/aubio.wasm',
'/index.html',
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
