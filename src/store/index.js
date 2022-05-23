import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存组件间共享的数据
    uname:sessionStorage.getItem("uname"),
    uid:sessionStorage.getItem("uid"),
    phone:sessionStorage.getItem("phone"),
    
  },
  mutations: {
    // 存放更新的值的方法
    updateUser(state,user){
      state.phone=user.phone;
      state.uid=user.uid;
      state.uname=user.uname;

      // session 存储
      sessionStorage.setItem("phone",user.phone);
      sessionStorage.setItem("uid",user.uid);
      sessionStorage.setItem("uname",user.uname);
    },
    // 退出
    logout(state){
      state.phone=null;
      state.uid=null;
      state.uname=null;

      // session在读取null的时候会变成字符串null，所以使用空字符串代替
      sessionStorage.setItem("phone","");
      sessionStorage.setItem("uid","");
      sessionStorage.setItem("uname","");
    }
  },
  actions: {
  },
  modules: {
  }
})
