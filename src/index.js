import Vue from 'vue'
import hello from './hello.vue'

new Vue({
    el: '#app',
    mounted: function () {
        console.log('Hello World');

    },
    components: { hello },
    template: '<hello/>'
})