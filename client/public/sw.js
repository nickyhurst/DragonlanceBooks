importScripts("https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js");


if (workbox) {
  workbox.core.setCacheNameDetails({
    prefix: "dragonlance",
  });

  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  workbox.routing.setDefaultHandler(
    new workbox.strategies.NetworkOnly()
  );

  workbox.routing.registerRoute(
    ({request, url}) =>
  request.destination === "image" &&
  url.pathname.startsWith("/covers/"),
    new workbox.strategies.CacheFirst({
      cacheName: "covers-images",
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 150,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
          purgeOnQuotaError: true,
        }),
      ],
    })
  );
}