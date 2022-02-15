<template>
  <div id="app">
    <LargeScoreboard :scores="scores"/>
  </div>
</template>

<script>
import LargeScoreboard from '../../components/LargeScoreboard.vue'

export default {
  name: 'App',
  components: {
    LargeScoreboard,
  },
  data: function () {
    return {
      scores: undefined
    }
  },
  mounted: function () {
    window.api.receive('scores-recieve', (json) => {
      this.scores = JSON.parse(json);
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
