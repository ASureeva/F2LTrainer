const VERSION = "v1";

importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js");

// workbox.routing.registerRoute(({ request }) => request.destination === "image", new workbox.strategies.CacheFirst());

// Precaching all files in a folder (e.g., `/images/`)
workbox.routing.registerRoute(
  ({ url }) => url.pathname.startsWith("/images/"),
  new workbox.strategies.CacheFirst({
    cacheName: "images-cache",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 500, // Adjust based on your needs
        purgeOnQuotaError: true, // Automatically delete old cache if storage is full
      }),
    ],
  })
);

// General caching strategy for other assets
workbox.routing.registerRoute(
  ({ request }) => request.destination !== "",
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "workbox-cache",
  })
);
