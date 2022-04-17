"use strict";

self.addEventListener('install', function (event) {
  console.log('ServiceWorker install:', event);
});
self.addEventListener('activate', function (event) {
  console.log('ServiceWorker activate:', event);
});
var CacheName = 'Cache:v1';

var networkFallingBackToCache = function networkFallingBackToCache(request) {
  var cache, responce;
  return regeneratorRuntime.async(function networkFallingBackToCache$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(caches.open(CacheName));

        case 2:
          cache = _context.sent;
          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap(fetch(request));

        case 6:
          responce = _context.sent;
          _context.next = 9;
          return regeneratorRuntime.awrap(cache.put(request, responce.clone()));

        case 9:
          return _context.abrupt("return", responce);

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](3);
          console.error(_context.t0);
          return _context.abrupt("return", cache.match(request));

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 12]]);
};

self.addEventListener('fetch', function (event) {
  console.log('Fetch to:', event.request.url);
  event.respondWith(networkFallingBackToCache(event.request));
});