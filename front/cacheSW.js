const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(["/src/assets/logo.png"]));
});

const checkNetworkRequest = async (request) => {
  if (request.url.startsWith("http")) {
    console.log(request);
  }
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  return fetch(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(checkNetworkRequest(event.request));
});
