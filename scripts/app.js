import Menu from './Menu.js';
import Order from './Order.js';
import Router from './Router.js';

navigator.serviceWorker.register('/serviceWorker.js');

(async function() {
    if (navigator.storage.persist()) {
        const result = await navigator.storage.persisted();
        console.log('Persistance request result: ', result);
    }
})();

(async function() {
    if (navigator.storage && navigator.storage.estimate) {
        const q = await navigator.storage.estimate();
        console.log('Quota available: ', q.quota/* Measured in bites. To measure in kb - q.quote / 1024 */);
        console.log('Quota used: ', q.usage);
    }
})();

window.addEventListener("DOMContentLoaded", () => {
    Router.init();
    Menu.load();
    Order.render();
 });
