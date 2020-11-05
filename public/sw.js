const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

const PRECACHE_URLS = [
  '/public/index.html',
  '/public/GAME/styles/game-styles.css',
  '/public/LEVELS/styles/levels.css',
  '/public/HOME/styles/home.css',
  '/public/GAME/game.html',
  '/public/LEVELS/levels.html',
  '/public/Images/Achievements-Icon_0003_Layer-1.png',
  '/public/Images/chest.png',
  '/public/Images/coin-1_0005_Ellipse-1-copy-10.png',
  '/public/Images/Discover-Icon_0002_w-copy.png',
  '/public/Images/Jump-Icon_0003_Layer-1.png',
  '/public/Images/medal_0001_Rectangle-1-copy-5.png',
  '/public/Images/medal_0002_Rectangle-1-copy-4.png',
  '/public/Images/play-video-button.png',
  '/public/Images/power-ups_0000_P2.png',
  '/public/Images/power-ups_0001_P3.png',
  '/public/Images/power-ups-icon_0000_P2.png',
  '/public/Images/Project 36_2.png',
  '/public/Images/setting-icon_0001_Ellipse-1-copy-4.png',
  '/public/Images/smallCoins.png',
  '/public/Images/sound-icons_0002_Ellipse-1-copy.png',
  '/public/Images/sound-icons_0003_Ellipse-1.png',
  '/public/Images/sound-icons_0004_Rectangle-1.png',
  '/public/Images/star.png',
  '/public/Images/UPWORD-LOGO.png',
  '/public/GAME/Images/amethyst.png',
  '/public/GAME/Images/amethyst1.png',
  '/public/GAME/Images/amethyst2.png',
  '/public/GAME/Images/amethyst3.png',
  '/public/GAME/Images/amethystbreak.png',
  '/public/GAME/Images/bandicam 2020-10-31 10-47-28-050_01.gif',
  '/public/GAME/Images/bg.png',
  '/public/GAME/Images/big-coin.png',
  '/public/GAME/Images/coin-1_0006_Layer-3.png',
  '/public/GAME/Images/ice.png',
  '/public/GAME/Images/icebreak.png',
  '/public/GAME/Images/metal.png',
  '/public/GAME/Images/metal1.png',
  '/public/GAME/Images/metal2.png',
  '/public/GAME/Images/metal3.png',
  '/public/GAME/Images/metal4.png',
  '/public/GAME/Images/metalbreak.png',
  '/public/GAME/Images/stone.png',
  '/public/GAME/Images/stone1.png',
  '/public/GAME/Images/stone2.png',
  '/public/GAME/Images/stonebreak.png',
  '/public/GAME/Images/wood.png',
  '/public/GAME/Images/wood1.png',
  '/public/GAME/Images/woodbreak.png',
  '/public/music/awesome.mp3',
  '/public/music/beep.wav',
  '/public/music/bg-music.mp3',
  '/public/music/blast.mp3',
  '/public/music/break.mp3',
  '/public/music/cash.mp3',
  '/public/music/click.mp3',
  '/public/music/correct.mp3',
  '/public/music/Crack.mp3',
  '/public/music/wrong.mp3',
  '/public/fonts/BebasNeue-Regular.ttf',
  '/public/fonts/Montserrat-ExtraBold.otf',
  '/public/fonts/Spartan-ExtraBold.ttf',
  '/public/fonts/SpicyRice-Regular.ttf',
  '/public/dist/game.js',
  '/public/dist/home.js',
  '/public/dist/levels.js',
  '/public/clone.js',
  '/public/404.html',
  '/public/sw.js',
  '/public/sw-reg.js',
  '/public/mainfest.json',
  '/public/favicon.ico'
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