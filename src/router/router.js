import Vue from 'vue'
import Router from 'vue-router'
import hello from '../components/hello.vue'
import page2 from '../components/page2.vue'

Vue.use(Router)

export function createRouter(){
  return new Router({
    routes: [
      {
        path: '/',
        name: 'hello',
        component: hello
      },
      {
        path: '/page2',
        name: 'page2',
        component: page2
      },
    ]
  });
}
