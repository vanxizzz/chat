import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import apis from "./apis"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import initElementUi from "./initComponents";
import "animate.css";
import socket from "./websocket";
initElementUi(Vue);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$apis = apis;
Vue.prototype.$socket = socket;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// (async () => {
//   try {
//     const resp = await apis.whoami();
//     if (resp.status) {
//       store.commit("user/login", resp.data);
//     }
//   } catch (error) {
//     console.log(error)
//     console.log("识别失败");
//   } finally {

//   }
// })();


