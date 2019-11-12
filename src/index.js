import Vue from 'vue'
import App from './App.vue'
import { createRouter } from './router/router.js';

// 輸出一個function

export function createApp() {
  // 建立 router
  const router = createRouter();

  const app = new Vue({
    // 注入 router 到根 Vue 實例
    router,
    // the root instance simply renders the App component.
    render: h => h(App)
  });

  return { app, router };
}
