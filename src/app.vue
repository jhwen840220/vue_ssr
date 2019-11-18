<template>
  <div id="app">
    <div>APP {{node_env}}</div>
    <router-link to="/">首頁</router-link> <br>
    <router-link to="/page2">server & client</router-link>
    <router-view></router-view>
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      who: 'world'
    }
  },
  computed: {
    node_env(){
      return process.env.NODE_ENV
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
#app {
  padding: .5em;
  font-size: 2em;
  background-color: #fcf;
}
</style>