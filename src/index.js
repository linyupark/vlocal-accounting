import Vue from 'vue';
import App from './components/App';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import config from './config';
import store from 'store';
import dayjs from 'dayjs';

Vue.use(iView);

store.set('version', '1.0.0');
Vue.prototype.$store = store;
Vue.prototype.$cf = config;
Vue.prototype.$dayjs = dayjs;
Vue.prototype.$bus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
});
