//entry-server.js
import { createApp } from './app.js';

export default context => {
  // 因為有可能會是異步路由鉤子函數或組件，所以我們將返回一個 Promise,
  // 以便服務器能夠等待所有內容在渲染前，
  // 就已經準備就緒。
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    // 設置 Server 端 router 的位置
    router.push(context.url);

    // 等到 router 將可能的異步組件和鉤子函數解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      // 匹配不到的路由，執行 reject 函數，返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 });
      }
      else { 
        // 對所有匹配的路由組件調用 `asyncData()`
        Promise.all(matchedComponents.map(Component => {
          if (Component.asyncData) {
            Component.asyncData({
              store,
              route: router.currentRoute
            })
            return 
          }
        })).then(() => {
          // 在所有預取鉤子(preFetch hook) resolve 後，
          // 我們的 store 現在已經填充入渲染應用程序所需的狀態。
          // 當我們將狀態附加到上下文，
          // 並且 `template` 選項用於 renderer 時，
          // 狀態將自動序列化為 `window.__INITIAL_STATE__`，並注入 HTML。
          context.state = store.state

          // Promise 應該 resolve 應用程序實例，以便可以渲染
          resolve(app)
        }).catch(reject)
      }
    }, reject)
  })
}