import Vue from 'vue';
import {store} from './store';
import titleMixin  from './scripts/titleMixin';
import App from './App.vue';
import router from './router';

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueTippy, { TippyComponent } from "vue-tippy";

Vue.config.productionTip = false
Vue.mixin(titleMixin)

Vue.use(VueSweetalert2);

Vue.use(VueTippy);
Vue.component("tippy", TippyComponent);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
