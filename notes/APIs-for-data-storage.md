# Why Browser Data Storage?

- Increase User Experience.
- Increase Performance.
- Offline support.
- We can store: 
    - User-generated content.
    - App's state (e.g. if user leaves an app and then opens again, saved app's state will enable to resume from the state when they left the application).
    - Cached assets (we can cache assets on client's side, instead of making many HTTP requests to retrieve those assets).
    - Authentication tokens.
    - Analytics (we can store analytics data on client side and every once in a while sync that data with the server).

### All browser data storage is public to the user. They can see and change the data.

## How does it work?

- We should always treat it as data that can disappear any time.
- The data will persist between browsing sessions.
- On most APIs, we won't require any explicit permission from the user to store data on client side (so every website that user visits, can store up to 1GB data without need for user's permission).
- Data is not shared to the server or with other web apps (or at least web apps with different origin). Only exception is cookies.
- Cookie is automatically shared with your server on every HTTP request.


# Origin

Simply speaking, origin is Our domain (e.g. frontendmasters.com).

Origin = protocol + host + port;

Protocol - HTTP / HTTPS
Host - Domain / IP Address

These are all different origins:
- http://example.com
- http://example.ge
- https://example.com
- http://www.example.com
- http://example.com:4000

### www prefix existence makes difference with origins.
- Some browsers hide ```www``` prefix (like SAFARI).
- To show it, we need to click in the URL bar.
- Country TLDs make difference (like example.en and example.ge).
- Different subdomains create diferent origins (lise example.ge and learn.example.ge).

### Storage is origin based!
- Only the code that runs on the same origin, can access that data in the storage.


.................................................

# APIs for Browser Data Storage

- Cookies --- don't use.
- Web Storage (has Session Storage and Local Storage) --- avoid using.
- WebSQL <- deprecated!
- Application Cache <- deprecated!

- IndexedDB +++ use.
- File and Directories <- to be deprecated!
- Cache Storage +++ use.
- FileSystem Access (has subset API: Origin Private File System) ++ can use but doesn't have 100& compatibility.


# Cookies

Cookies is not a good way to store a data.

- It can store limited amount of data.
- Structure of that data is string based.
- Cookies are sent to the server. This is bad because on every HTTP request, that is made to our server, that data will travel to the server. And that will impact the performance.

# Web Storage = Session Storage + Local Storage

We shouldn't use it any more.

Problem is the Performance. Session Storage and Local Storage are synchronous APIs. It is not available on Workers or Service Workers.

# IndexedDB

No SQL Database. An Object-based client side database.

IndexedDB stores data, typically JavaScript objects or bytes. It also can store numbers, string and booleans too, but it is not common.

- Every entry has a key.
- The API is asynchronous.
- No permission needed from user.
- When storing objects, indexedDB <b>clones</b> them and cloning happens synchronously. This might cause problems if we are storing large objects.
    - Solution: use indexedDB in a worker.
- The API is event based. We can convert IndexedDB into Promise-Based API.
- Supports transactions. The wrapper, that converts IndexedDB into Promise-Based API, has automatic transactions for the most common situations.
- Supports DB versioning.



# Cache Storage

Cache Storage API is actually a Cache Storing Interface. It's not its own API, it's part of the service worker spec. But anyway, Pt's not only available from a service worker. 

Cache Storage stores HTTP responses. It stores the whose response, including headers and the body.


# FileSystem Access 

Supported only on Chromium based systems.

It allows to work with real file system with user's permission.

Safari supports its subset API - Origin Private File System.


### Can use - IndexedDB and Cache Storage
### Use in special cases - FileSystem Access (and a subset API: Origin Private File System)
### Try to avoid - Web Storage ( Session Storage API and Local Storage API)


|                   | Stores | Using a key of | Grouped in | Up to |
|-------------------|--------|----------------|------------|-------|
| IndexedDB         | JS Objects and binary data | A keyPath within the object (keyPath - name of a property in the object that is the primary key) | Object Stores in Databases | Available Quota (up to 1GB) |
| Cache Storage     | HTTP Responses | HTTP Request | Caches | Available Quota (up to 1GB) |
| Web Storage       | Strings | String | --- | Session Storage 12MB /  Local Storage 5MB |
| FileSystem Access | Files | --- | --- | --- |


# Storage Per Origin

Storage per origin can be defined as:
- Best effort.
- Persistent.

### Best Effort

- Default state on every browser.
- Browser can clear the data:
    - On storage pressure (low storage).
    - After some time of inactivity (only safari).
    - With usr intervention.
    - If when user uninstals PWA, user has an option to delete data (it doesn't get deleted automatically, because PWA is browser based).


### Persistent
- Browser can clear data with usr intervention.

### Persistent Storage Request

```await navigator.storage.persist();```
Returns a promise. It will tell us if permission was granted or not.

- Firefox will ask user if user wants persistent storage for the website.
- In Chrome whether it grants persistent storage or not, depends on user's engagement with the website. E.g. if the user has installed PWA, it will grant it. If the user has subscibed to web push notifications it will grant it, because if the push message arrives, there should be a service woker to attend that message. If we don't request persistent storage, Best Effort will be by default.
    - My Experience: The first time Google didn't grant me persistent storage. I got persistent storage for this website only on next day.
    - Solution: Until I got persistent storage granted, I used Firefox browser, which asked me whether I wanted persistent storage or not.

```await navigator.storage.persisted();```
Will check if persistent storage was granted.


# navigator.storage

- navigator.storage holds persistent storage API.
- navigator.storage is part of <b>StorageManager API</b>
- ```await navigator.storage.estimate()``` - In browsers (except webkit based (safari)), we can ask for estimation of the quota. It will return an object that will give us total quota and the current storage. It is an estimation, not the exact number. Sometimes browsers are faking the data to avoid fingerprinting (mostly if we are saving cross domain resources on cache storage).
- The Storage APIs return promises - remember to use async / await with them.