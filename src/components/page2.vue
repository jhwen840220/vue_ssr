<template>
  <div id="page2">
    <p>server: {{serverTime}}</p>
    <p>client: {{clientTime}}</p>
  </div>
</template>
<script>
export default {
  data(){
    return {
      clientTime: ''
    }
  },
  asyncData({ store, route }) {
    // 觸發 action 後，會返回 Promise
    return store.dispatch('fetchTime')
  },
  mounted() {
    this.clientTime = new Date()
  },
  computed: {
    serverTime() { 
      return this.$store.state.time 
    },
  },
}

</script>
<style></style>