import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        name: 'hello',
        component: () => import('../components/hello.vue')
      },
      {
        path: '/page2',
        name: 'page2',
        component: () => import('../components/page2.vue')
      },
    ]
  });
}
