import Vue from 'vue';
import Vuetify from 'vuetify';
import * as firebase from 'firebase';
import App from './App';
import router from './router';
import store from './store';
import DateFilter from './filters/date';
import AlertCmp from './components/Shared/Alert';

Vue.use(Vuetify);
Vue.config.productionTip = false;

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      // Datos Firebase
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user);
      }
    });
    this.$store.dispatch('loadMeetups');
  },
});
