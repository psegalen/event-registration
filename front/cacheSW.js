const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(["/src/assets/logo.png"]));
});

const checkNetworkRequest = async (request) => {
  if (
    request.url.startsWith("http") &&
    request.destination === "image"
  ) {
    console.log("An image has been requested", request);
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      console.log("An image was served from the cache!");
      return responseFromCache;
    }
    try {
      const networkResponse = await fetch(request);
      const cache = await caches.open("v1");
      cache.put(request, networkResponse.clone());
      console.log("An image was added to the cache!");
      return networkResponse;
    } catch (error) {
      return Response.error();
    }
  }
  return fetch(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(checkNetworkRequest(event.request));
});
