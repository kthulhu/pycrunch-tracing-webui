import Vue from 'vue'
import App from './App.vue'
import Meta from 'vue-meta'

import './shared/array_utilities';

import router from './router'
Vue.use(Meta)

import store from './store'


import VueHotkey from 'v-hotkey'
require('./third-party/mousetrap.min')

import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/css/bootstrap-grid.css';

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import 'element-theme-dark';

import './styles/main.scss';

// window.webglUtils = require('./webgl-utils')
// require('./webgl-utils')

Vue.use(ElementUI);
Vue.use(VueHotkey)
Vue.use(require('vue-moment'));


Vue.config.productionTip = false

require('./shared/filters')


new Vue({
  router,
  store,
  render: h => h(App),

}).$mount('#app')
