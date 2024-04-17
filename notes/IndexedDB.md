# IndexedDB

No SQL Database. An Object-based client side database.

IndexedDB stores data, typically JavaScript objects or bytes. It also can store numbers, string and booleans too, but it is not common.

- Every entry has a key.
- No permission needed from user.
- When storing objects, indexedDB <b>clones</b> them and cloning happens synchronously. This might cause problems if we are storing large objects.
    - Solution: use indexedDB in a worker.
- The API is event based. We can convert IndexedDB into asynchronous Promise-Based API.
- Supports transactions. The wrapper, that converts IndexedDB into Promise-Based API, has automatic transactions for the most common situations.
- Supports DB versioning.

# IndexedDB working scheme

- Open a IndexedDB database with <b>name</b> and <b>version number</b>.
- Does it exist with that <b>name</b>.
    1. No:
        - Upgrade event.
        - Success.
    2. Yes:
        - Is the <b>version number</b> greater than the browser version?
            1. Yes:
                - Upgrade event.
                - Success. 
            2. No:
                - Is the <b>version number</b> equal to the browser version?
                    1. Yes:
                        - Success.
                    2. No:
                        - Error!

```
Open a IndexedDB database ----------------> Does it exist --------- No ----------------|
     with 'name' and                       with that 'name'                            |
     'version number'                             |                                    |
                                                  |                                    |
                                                  |                                    |
                                                 Yes                                   |
                                                  |                                    |
                                                  |                                    |
                                                  v                                    v
                                         Is the 'version number'------ Yes -----> Upgrade event
                                            greater than the                           |
                                            browser version?                           |
                                                  |                                    |
                                                  |                                    |
                                                  No                                   |
                                                  |                                    |
                                                  |                                    |
                                                  v                                    |
                                         Is the 'version number'                       v
            Error! <-------- No ---------     equal to the      ------- Yes ------> Success
                                            browser version?          
```

# IndexedDB API working steps

```js
let db = null; 
/* 
Global variable where we will save the returned value from API call.
*/

const request = indexedDB.open(name); 
/* 
Make an API call. Second argument is a version number (optional). If not provided, default value will be 1.
*/

request.onerror = (event) {

}
/* 
Error case.
*/

request.onsuccess = (event) => {
    db = event.target.result;
    /* 
    Returned value is saved in the 'event.target.result', and that is why do we need to save it in the global value (or anywhere we need).
    */
}
/* 
Success case.
*/
```

# # IndexedDB API with wrapper - idb - working steps

There are other wrappers, other than idb.

#### Open DB
```js
const db = await idb.openDB(name, version);
```

#### Open DB and handle upgrade
```js
const db = await idb.openDB(name, version {
    upgrade(db, oldVersion, newVersion, transactionObj, event) {}
    // More event-based functions, such as 'blocked'
});
```

#### Create object store

- No key
```js
const objectStore = await db.createObjectStore(name);
```

- With key
```js
const objectStore = await db.createObjectStore(name, {keypath: property_name});
```

- With key generator
```js
const objectStore = await db.createObjectStore(name, {autoIncrement: true});
```


#### Delete DB

- Delete DB
```js
await idb.deleteDB(name);
```
- Delete DB and handle block
```js
const db = idb.deletedb(name, {
    blocked(db) {}
});
```


## Cache First pattern

When a resource is requested by a web page, whe browser checks if the resource is available in its cache. If it is found in the cache, browser retrieves the resource from the cache and serves it to the user without making a network request. If the resourc is not found in the cache, the browser then proceeds to fetch the resource from the network.