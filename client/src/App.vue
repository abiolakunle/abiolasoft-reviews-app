<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

    <Projects msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Projects from "./components/Projects.vue";

export default {
  name: "app",
  components: {
    Projects
  }
};
</script>



<style lang="scss">
#app {
  //font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  //color: #2c3e50;
  //background: transparent;
}
</style>
