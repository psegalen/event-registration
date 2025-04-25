const addResourcesToCache = async (resources) => {
  const cache = await caches.open("v1");
  await cache.addAll(resources);
};

self.addEventListener("install", (event) => {
  event.waitUntil(addResourcesToCache(["/src/assets/logo.png"]));
});

const handleImage = async (request) => {
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
};

const handleGetData = async (request) => {
  try {
    const networkResponse = await fetch(request);
    const cache = await caches.open("v1");
    cache.put(request, networkResponse.clone());
    console.log("Data has been added to the cache!", request.url);
    return networkResponse;
  } catch (error) {
    const responseFromCache = await caches.match(request);
    if (responseFromCache) {
      console.log("Data was provided by the cache!", request.url);
      return responseFromCache;
    }
    return Response.error();
  }
};

const checkNetworkRequest = async (request) => {
  if (
    request.url.startsWith("http") &&
    request.destination === "image"
  ) {
    return handleImage(request);
  } else if (
    request.method === "GET" &&
    request.url.includes("/api/collections/")
  ) {
    return handleGetData(request);
  }
  return fetch(request);
};

self.addEventListener("fetch", (event) => {
  event.respondWith(checkNetworkRequest(event.request));
});

const syncRegstration = async (tag) => {
  const [_, id, arrivedAt, eventId] = tag.split("|");
  console.log("We need to sync", id, arrivedAt, eventId);
  await self.registration.showNotification(
    "Votre émargement en attente a bien été synchronisé",
    {
      body: `Le participant n°${id} à l'évènement n°${eventId} est arrivé à ${arrivedAt}`,
      tag,
    }
  );
};

self.addEventListener("sync", (event) => {
  if (event.tag.startsWith("register|")) {
    event.waitUntil(syncRegstration(event.tag));
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log(">>> NOTIFICATION CLICKED", event);
  if (event.notification.tag) {
    const [_, __, ___, eventId] = event.notification.tag.split("|");
    console.log(">>> WE SHOULD OPEN EVENT", eventId);
    event.notification.close();

    // This looks to see if the current is already open and
    // focuses if it is
    event.waitUntil(clients.openWindow(`/?eventId=${eventId}`));
  }
});
