<template>
  <div>
    <Header />
    <!-- 路由切换页面：使用 router-view -->
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
// 引入子组件
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  //注册子组件
  components: { Header, Footer },
};
</script>

<style>
/* 引入css样式文件 */
@import "./assets/css/common.css";
@import "./assets/css/mycss.css";
</style>
