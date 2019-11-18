<template>
  <div id="app">
    <div>APP</div>
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
  mounted() {
    console.log(process.env.NODE_ENV)
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