import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import axios from 'axios'
import './assets/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueToastify from "vue-toastify";
Vue.use(VueToastify);
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.config.productionTip = false
axios.defaults.withCredentials= true;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
