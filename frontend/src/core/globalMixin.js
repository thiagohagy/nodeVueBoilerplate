import Vue from 'vue';

import AlertMessage from './../components/shared/AlertMessage.vue';
// import Breadcrumb from './../components/shared/Breadcrumb.vue';
import Nav from './../components/shared/Nav.vue';

// used in the whole system
Vue.mixin({
  components: {
    'my-alert': AlertMessage,
    // 'my-breadcrumb': Breadcrumb,
    'my-nav': Nav,
  },
});
