//client-entry.js
import { createApp } from './app.js';

const { app, router, store } = createApp()

console.log(store)
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 這裡假定 App.vue 模板中根元素具有 `id="app"`
router.onReady(() => {
  // // 添加路由鉤子函數，用於處理 asyncData.
  // // 在初始路由 resolve 後執行，
  // // 以便我們不會二次預取(double-fetch)已有的數據。
  // // 使用 `router.beforeResolve()`，以便確保所有異步组件都 resolve。

  // router.beforeResolve((to, from, next) => {
  //   const matched = router.getMatchedComponents(to)
  //   const prevMatched = router.getMatchedComponents(from)

  //   // 我們只關心非預渲染的組件
  //   // 所以我們比對他們，找出兩個匹配列表的差異组件
  //   let diffed = false
  //   const activated = matched.filter((c, i) => {
  //     return diffed || (diffed = (prevMatched[i] !== c))
  //   })

  //   if (!activated.length) {
  //     return next()
  //   }

  //   // 這裏如果有加載指示器 (loading indicator)，就觸發

  //   Promise.all(activated.map(c => {
  //     if (c.asyncData) {
  //       return c.asyncData({ store, route: to })
  //     }
  //   })).then(() => {
  //     // 停止加載指示器(loading indicator)
  //     next()
  //   }).catch(next)
  // })
  app.$mount('#app')
})