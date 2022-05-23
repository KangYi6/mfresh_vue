import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入axios
import axios from "axios";
import VueAxios from "vue-axios";

// 全局url前缀  axios请求时可以使用
axios.defaults.baseURL = "http://www.codeboy.com:9999/mfresh/data/";

// 引入swiper
import VueAwesomeSwiper from "vue-awesome-swiper";
// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'
// import style (<= Swiper 5.x)
import "swiper/css/swiper.css";
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

import Header from './components/Header'
export default{
  components: {Header}
}


// 全局过滤器 注册
import { date } from "./filter";
Vue.filter("date", date);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
