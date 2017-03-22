<template>
    <md-card id="vis-container">

	  <md-card-header>
            <div class="recipe-details">
              <div class="detail recipe-title md-title">
                <md-icon>restaurant</md-icon>
                <span md-display-2>{{getTitle}}</span>
              </div>
              <div class="detail recipe-time md-title">
                <md-icon>alarm</md-icon>
                <span md-display-2>{{getTime}}</span>
              </div>
              <div class="detail recipe-serves md-title">
                <md-icon>accessibility</md-icon>
                <span md-display-2>{{getServes}}</span>
              </div>
            </div>
	  </md-card-header>

	  <md-card-content id="recipe-visualization">
            <span md-display-1>Ingredients</span>
	    <md-list id="ingredient-list">
	      <md-list-item v-for="ingredient in getIngredients" :key="ingredient">
		<md-icon>kitchen</md-icon> <span>{{ingredient}}</span>
                <md-tooltip md-delay="400" md-direction="top">Click To Remove</md-tooltip>
	      </md-list-item>
	    </md-list>
	  </md-card-content>

          <md-card-actions>
            <md-button v-on:click.native="createVisualizationBundle()" class="md-icon-button">
              <md-icon>visibility</md-icon>
              <md-tooltip md-delay="400" md-direction="top">Create Recipe Visualization Script</md-tooltip>
            </md-button>
          </md-card-actions>

          </md-card>
</template>

<script>
/*eslint-disable */
import { mapState } from 'vuex';
import { bus, store } from '../main';

const vm = {
  data() {
    return {
      title: '',
      steps: {},
    };
  },
  computed: {
    getTitle: function getTitle() {
      return store.state.recipe.title;
    },
    getTime: function getTime() {
      return store.state.recipe.time;
    },
    getServes: function getServes() {
      return store.state.recipe.serves;
    },
    getIngredients: function getIngredients() {
      return store.state.recipe.ingredients;
    },
    getSteps: function getSteps() {
      console.log('step added');
      this.steps = store.state.recipe.steps;
    },
  },
  methods: {
    createVisualizationBundle: function createVisualizationBundle() {
      let jsonString = JSON.stringify(store.state.recipe);
      let json = JSON.parse(jsonString);
      store.dispatch('requestBundle', json);
    },
  },
  created: function created() {
    //bus.$on('step.add', addStep);
  },
};

export default vm;
</script>

<style>
#vis-container {
  margin-top: 20px;
  min-height: 100px;
}
.recipe-details {
  display: flex;
  flex-direction: row;
}
.detail {
  margin: 0 20px;
}
.recipe-title {
  display: inline-block;
}
#ingredient-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.md-icon { 
  margin-right: 10px !important;
}
</style>
