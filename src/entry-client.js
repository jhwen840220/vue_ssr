//client-entry.js
import { createApp } from './app.js';

const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
}

// 這裡假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
    app.$mount('#app')
})