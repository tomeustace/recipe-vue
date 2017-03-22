import 'vue-material/dist/vue-material.css';
import Vue from 'vue';
import Vuex from 'vuex';
import vueResource from 'vue-resource';
import VueMaterial from 'vue-material';
import App from './App';
import addNewStep from './lib/steps';

Vue.use(Vuex);
Vue.use(vueResource);
Vue.http.options.xhr = { withCredentials: true };

Vue.use(VueMaterial);
Vue.material.registerTheme({
  default: {
    primary: {
      color: 'light-green',
      hue: 700,
    },
    accent: 'red',
  },
  teal: {
    primary: 'blue',
    accent: 'pink',
  },
  purple: {
    primary: 'purple',
    accent: 'orange',
  },
});

const addStep = function addStep(step) {
  addNewStep(step);
};

/*eslint-disable*/
export
const store = new Vuex.Store({
  state: {
    recipe: {
      title: '',
      time: '',
      serves: '',
      ingredients: [],
      methods: [],
    },
  },
  actions: {
    updateTitle (context, title) {
      context.commit('updateTitle', title);
    },
    updateTime (context, time) {
      context.commit('updateTime', time);
    },
    updateServes (context, serves) {
      context.commit('updateServes', serves);
    },
    updateIngredients (context, ingredient) {
      context.commit('updateIngredients', ingredient);
    },
    updateMethod (context, method) {
      context.commit('updateMethod', method);
    },
    requestBundle() {
      let jsonString = JSON.stringify(store.state.recipe);
      let recipe = JSON.parse(jsonString);

      Vue.http.post('http://localhost:9119/create-bundle', recipe).then(response => {
        let res = response.body;
        console.log('body ' + res);
      }, response => {
        console.log('error loading tables');
      });
    }
  },
  mutations: {
    updateTitle (context, title) {
      store.state.recipe.title = title;
    },
    updateTime (context, time) {
      store.state.recipe.time = time;
    },
    updateServes (context, serves) {
      store.state.recipe.serves = serves;
    },
    updateIngredients (context, ingredient) {
      store.state.recipe.ingredients.push(ingredient);
    },
    updateMethod (context, method) {
      store.state.recipe.methods.push(method);
      addStep(method)
    }
  }
});
/*eslint-enable*/

export
const bus = new Vue();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
