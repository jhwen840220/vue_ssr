// 通用entry (universal entry)

import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/router.js';
import { createStore } from './store/index.js'
import { sync } from 'vuex-router-sync'

// 輸出一個function

export function createApp() {
  // 建立 router
  const router = createRouter();
  const store = createStore();

  // 同步路由狀態(route state)到 store
  sync(store, router)

  const app = new Vue({
    // 注入 router, store 到根 Vue 實例
    router,
    store,
    // the root instance simply renders the App component.
    render: h => h(App)
  });

  return { app, router, store };
}
