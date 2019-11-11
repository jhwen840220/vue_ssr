import Vue from 'vue'
import app from './app.vue'
import router from './router/router.js'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    mounted() {
       console.log('Hello World');
    },
    components: { app },
    template: '<app/>'
})