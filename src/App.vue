<template>
  <md-theme id="app" md-name="default">
    <toolbar></toolbar>
    <div id="container">
      <creator></creator>
      <visualizer></visualizer>
    </div>
  </md-theme>
</template>

<script>
import Toolbar from './components/Toolbar';
import Creator from './components/Creator';
import Visualizer from './components/Visualizer';

export default {
  components: {
    Toolbar,
    Creator,
    Visualizer,
  },
};
</script>

<style>
html {
  height: 100%;
}

#app {
  width: 100%;
  height: 100%;
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
}

#container {
  margin: 10px;
  padding: 10px;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
