<template>
  <div id="method-container">
    <!-- <md-input-container class="item"> -->
    <!--   <label for="step.category">Category</label> -->
    <!--   <md-select name="step" id="step" v-model="step.category"> -->
    <!--     <md-option value="Chop">Chop</md-option> -->
    <!--     <md-option value="Prepare">Prepare</md-option> -->
    <!--     <md-option value="Soak">Soak</md-option> -->
    <!--   </md-select> -->
    <!-- </md-input-container> -->

    <md-input-container class="item">
      <label for="step.time">Time</label>
      <md-input type="number" placeholder="Time (Minutes) for this step" v-model="step.time"></md-input>
    </md-input-container>

    <md-input-container class="item">
      <label>Method</label>
      <md-textarea type="textarea" v-model="step.method"></md-textarea>
    </md-input-container>


    <md-button v-model="step" v-on:click.native="add()" class="md-icon-button">
      <md-icon>add</md-icon>
      <md-tooltip md-delay="400" md-direction="top">Add Method</md-tooltip>
    </md-button>
  </div>
</template>

<style>
#method-container {
  display: flex;
} 

.item {
  min-width: 300px;
  margin: 0 20px;
}
</style>

<script>
import { store, bus } from '../main';

export default {
  data() {
    return {
      step: { method: '', time: '' },
    };
  },
  methods: {
    add: function add() {
      store.dispatch('updateMethod', this.step);
    },
    remove: function remove() {
      bus.$emit('step.remove');
    },
  },
};
</script>
