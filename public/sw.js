const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
  '/index.html',
  '/',
  '/GAME/styles/game-styles.css',
  '/LEVELS/styles/levels.css',
  '/HOME/styles/home.css',
  '/GAME/game.html',
  '/LEVELS/levels.html',
  '/Images/Achievements-Icon_0003_Layer-1.png',
  '/Images/chest.png',
  '/Images/coin-1_0005_Ellipse-1-copy-10.png',
  '/Images/Discover-Icon_0002_w-copy.png',
  '/Images/Jump-Icon_0003_Layer-1.png',
  '/Images/medal_0001_Rectangle-1-copy-5.png',
  '/Images/medal_0002_Rectangle-1-copy-4.png',
  '/Images/play-video-button.png',
  '/Images/power-ups_0000_P2.png',
  '/Images/power-ups_0001_P3.png',
  '/Images/power-ups-icon_0000_P2.png',
  '/Images/Project 36_2.png',
  '/Images/setting-icon_0001_Ellipse-1-copy-4.png',
  '/Images/smallCoins.png',
  '/Images/sound-icons_0002_Ellipse-1-copy.png',
  '/Images/sound-icons_0003_Ellipse-1.png',
  '/Images/sound-icons_0004_Rectangle-1.png',
  '/Images/star.png',
  '/Images/UPWORD-LOGO.png',
  '/Images/UPWORD-LOGO.png',
  '/GAME/Images/amethyst.png',
  '/GAME/Images/amethyst1.png',
  '/GAME/Images/amethyst2.png',
  '/GAME/Images/amethyst3.png',
  '/GAME/Images/amethystbreak.png',
  '/GAME/Images/bandicam 2020-10-31 10-47-28-050_01.gif',
  '/GAME/Images/bg.png',
  '/GAME/Images/big-coin.png',
  '/GAME/Images/coin-1_0006_Layer-3.png',
  '/GAME/Images/ice.png',
  '/GAME/Images/icebreak.png',
  '/GAME/Images/metal.png',
  '/GAME/Images/metal1.png',
  '/GAME/Images/metal2.png',
  '/GAME/Images/metal3.png',
  '/GAME/Images/metal4.png',
  '/GAME/Images/metalbreak.png',
  '/GAME/Images/stone.png',
  '/GAME/Images/stone1.png',
  '/GAME/Images/stone2.png',
  '/GAME/Images/stonebreak.png',
  '/GAME/Images/wood.png',
  '/GAME/Images/wood1.png',
  '/GAME/Images/woodbreak.png',
  '/music/awesome.mp3',
  '/music/beep.wav',
  '/music/bg-music.mp3',
  '/music/blast.mp3',
  '/music/break.mp3',
  '/music/cash.mp3',
  '/music/click.mp3',
  '/music/correct.mp3',
  '/music/Crack.mp3',
  '/music/wrong.mp3',
  '/fonts/BebasNeue-Regular.ttf',
  '/fonts/Montserrat-ExtraBold.otf',
  '/fonts/Spartan-ExtraBold.ttf',
  '/fonts/SpicyRice-Regular.ttf',
  '/dist/game.js',
  '/dist/home.js',
  '/dist/levels.js',
  '/clone.js',
  '/404.html',
  '/manifest.json',
  '/sw.js',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});