//client-entry.js
import { createApp } from './index.js';

const { app, router } = createApp()

// 這裡假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
    app.$mount('#app')
})