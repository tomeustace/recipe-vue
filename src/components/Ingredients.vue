<template>
  <div id="ingredient-container">
    <md-input-container>
      <md-icon>kitchen</md-icon>
      <label>Ingredients</label>
      <md-input v-model="ingredient"></md-input>
    </md-input-container>
    <md-button v-on:click.native="add()" class="md-icon-button">
      <md-icon>add</md-icon>
      <md-tooltip md-delay="400" md-direction="top">Add Ingredient</md-tooltip>
    </md-button>
  </div>
</template>

<style>
#ingredient-container {
  display: flex;
}
.ingredient {
}

.add-ingredient {
  align-items: flex-end;
}
</style>

<script>
import { store } from '../main';

export default {
  data() {
    return {
      title: 'Title Here',
      ingredient: '',
    };
  },
  methods: {
    add: function add() {
      store.dispatch('updateIngredients', this.ingredient);
    },
  },
};
</script>
