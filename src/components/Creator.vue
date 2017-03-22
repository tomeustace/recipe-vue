<template>
  <md-card>
    <div id="creator">

      <div class="recipe-details">

        <div class="recipe-title">
          <md-input-container>
            <md-icon>restaurant</md-icon>
            <label>Recipe Title</label>
            <md-input v-model="title"></md-input>
          </md-input-container>
        </div>
        
        <div class="recipe-details-meta">
          <div class="detail recipe-time">
            <md-input-container>
              <md-icon>alarm</md-icon>
              <label>Cooking Time</label>
              <md-input v-model="time"></md-input>
            </md-input-container>
          </div>

          <div class="detail recipe-serves">
            <md-input-container>
              <md-icon>accessibility</md-icon>
              <label>Serves</label>
              <md-input v-model="serves"></md-input>
            </md-input-container>
          </div>
        </div>

      </div>

      <ingredients></ingredients>

      <method></method>

    </div>
  </md-card>
</template>

<script>

import { store } from '../main';
import Ingredients from './Ingredients';
import Method from './Method';

const vm = {
  data() {
    return {
      title: '',
      time: '',
      serves: '',
    };
  },
  watch: {
    title: function updateTitle() {
      store.dispatch('updateTitle', this.title);
    },
    time: function updateTime() {
      store.dispatch('updateTime', this.time);
    },
    serves: function updateServes() {
      store.dispatch('updateServes', this.serves);
    },
  },
  components: {
    Ingredients,
    Method,
  },
};

export default vm;

</script>

<style>
#creator {
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.recipe-details {
  display: flex;
  flex-direction: row;
}
.recipe-details-meta {
  display: flex;
  flex-direction: row;
}
.detail {
  margin: 0 20px;
}
.recipe-title {
  min-width: 400px;
}
.recipe-time {
  min-width: 200px;
}
.recipe-serves {
  min-width: 200px;
}
.md-input-container {
  max-width: 450px;
}
</style>
