import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/ja";
import "element-ui/lib/theme-chalk/index.css";
import draggable from "vuedraggable"

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale });
Vue.use(draggable);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
