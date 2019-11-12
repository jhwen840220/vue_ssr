<template>
  <div id="page2">
    <p>server: {{serverItem}}</p>
    <p>client: {{clientItem}}</p>
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
    return store.dispatch('fetchItem', 'server')
  },
  mounted() {
    this.$store.dispatch('fetchItem', 'client')
  },
  computed: {
    serverItem() { return this.$store.state.items.server },
    clientItem() { return this.$store.state.items.client }
  }
}

</script>
<style></style>