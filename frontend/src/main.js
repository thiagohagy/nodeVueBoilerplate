import Vue from 'vue';
import App from './App.vue';
import router from './core/router';
import store from './store/index';
import http from './core/http';
import VueProgressBar from 'vue-progressbar';
import Toasted from 'vue-toasted';
import 'material-design-icons/iconfont/material-icons.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import './core/globalMixin';
import './core/filter';
import './core/mask';

import './assets/bootstrap.min.css';
import './assets/fontAwesome/faall.css';
import './assets/fontAwesome/fasolid.css';
import './assets/bootstrap.min.css';

library.add(fas)



Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$http = http;

Vue.config.productionTip = false;

Vue.use(Toasted, {
  iconPack: 'fontawesome', // set your iconPack, defaults to material. material|fontawesome
  position: 'top-right',
  duration: 5000,
  // theme: 'primary',
  // theme: 'bubble',
  // theme: 'toasted-primary',
  theme: 'outline',
  icon: {
    name: 'done',
    after: true, // this will append the icon to the end of content
  }
});

Vue.use(VueProgressBar, {
  color: 'blue',
  failedColor: 'red',
  height: '2px'
})

export default new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
