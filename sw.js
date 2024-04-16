self.addEventListener('install', async event => {
    const cache = await caches.open('cm-appshell');
    /* pre-cache all those assets */
    cache.addAll(
        [
            '/', 
            '/styles.css',
            '/scripts/API.js',
            '/scripts/app.js',
            '/scripts/Menu.js',
            '/scripts/Order.js',
            '/scripts/Router.js',
            '/images/logo.svg',
            '/images/icons/icon.png',
            'https://cdn.jsdelivr.net/npm/idb@8/build/umd.js',
            'https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap',
            "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0", 
            'https://fonts.gstatic.com/s/materialsymbolsoutlined/v175/kJF1BvYX7BgnkSrUwT8OhrdQw4oELdPIeeII9v6oDMzByHX9rA6RzaxHMPdY43zj-jCxv3fzvRNU22ZXGJpEpjC_1n-q_4MrImHCIJIZrDCvHOej.woff2 ',
            'https://fonts.gstatic.com/s/opensans/v40/memvYaGs126MiZpBA-UvWbX2vVnXBbObj2OVTS-muw.woff2',
        ]
    );
});


self.addEventListener("fetch", async event => {
    if (event.request.url == '/order') {
        event.respondWith(fetch('/'))
    }

    event.respondWith(

        (async () => {
            try {
                const fetchResponse = await fetch(event.request);
                const cache = await caches.open('cm-updatedAssets');
                cache.put(event.request, fetchResponse.clone());
                /* We are cloning it because we can't reuse HTTP responses. They are like streams. If once was used, it is gone, we can't reuse it. */

                return fetchResponse;
            } catch (e) {
                const cachedResponse = await caches.match(event.request);
                if (cachedResponse) return cachedResponse;
            }
        })()

    );
});



/* self.addEventListener('fetch', event => {
    if (event.request.url == '/order') {
        event.respondWith(fetch('/'))
    }
    event.respondWith(
        (async () => { */
            /* caches.match() checks all caches available in the origin. match is search, If we don't want to look through all caches in the origin, at first we can open the cache with he name and then do a match. */
           /*  const cachedResponse = await caches.match(event.request);
            
            if (cachedResponse) {
                return cachedResponse;
            } else {
                return fetch(event.request);
            }
        })()
    );
}); */