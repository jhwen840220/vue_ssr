<template>
  <div id="page2">
    <p>server: {{time}}</p>
  </div>
</template>
<script>
export default {
  data(){
    return{
    }
  },
  asyncData({ store, route }) {
    // 觸發 action 後，會返回 Promise
    return store.dispatch('fetchTime')
  },
  mounted() {
  },
  computed: {
    time() { 
      return this.$store.state.time 
      },
  }
}

</script>
<style></style>