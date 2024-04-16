# Cache Storage

- It is part of the Service Worker spec, but not tied to its scope.
- We can create different storages (called <b>caches</b>) under a name.
- Every cache stores HTTP responses (header + body).
- The key is HTTP request. For simplicity, we can use URL or URL + other header.
- API is asynchronous, so it is promise based.
- No permission needed from user.
- We can store, update, delete and query HTTP responses by URL or request.

 
### We can:
- Pre-cache Assets.
- Cache assets on the fly.
- Serve assets from a Service worker.
- Query assets available for offline usage.
- Create an offline page.


## Service Worker

The Service Worker is a JS thread that we install (register) in user's browser.

Quick and dirty definition:
- A Service worker is a web server that we install on client's side. And can serve files only for my machine.

#### Always create Service Worker file in the root folder. Otherwise, it will have the scope of the folder, where it was created, and not the global scope.