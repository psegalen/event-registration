const addResourcesToCache = async (resources) => {
    const cache = await caches.open('v1');
    await cache.addAll(resources);
  };
  
  const putInCache = async (request, response) => {
    const cache = await caches.open('v1');
    await cache.put(request, response);
  };
  
  const cacheFirst = async ({ request, fallbackUrl }) => {
    // First try to get the resource from the cache
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      console.log("SW: CacheFirst found it in cache!", request.url);
      return responseFromCache;
    }
  
    // Next try to get the resource from the network
    try {
      const responseFromNetwork = await fetch(request.clone());
      // response may be used only once
      // we need to save clone to put one copy in cache
      // and serve second one
      putInCache(request, responseFromNetwork.clone());
      console.log("SW: CacheFirst found it on network!", request.url);
      return responseFromNetwork;
    } catch (error) {
      const fallbackResponse = await caches.match(fallbackUrl);
      if (fallbackResponse) {
        console.log("SW: CacheFirst is sending fallback!", request.url);
        return fallbackResponse;
      }
      // when even the fallback response is not available,
      // there is nothing we can do, but we must always
      // return a Response object
      return new Response('Network error happened', {
        status: 408,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  };
  self.addEventListener('install', (event) => {
    event.waitUntil(
      addResourcesToCache([
        '/src/assets/logo.png',
        '/src/assets/logo192.png',
        '/src/assets/logo512.png',
      ])
    );
  });
  self.addEventListener('fetch', (event) => {
    const { url } = event.request;
    const isImage = url.endsWith(".jpg") || url.endsWith(".jpeg") || url.includes("unsplash");
    if (isImage) {
      event.respondWith(
        cacheFirst({
          request: event.request,
          fallbackUrl: '/src/assets/logo512.png',
        })
      );
    }
  });