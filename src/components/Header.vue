<template>
  <div class="header_box">
    <!-- header.html -->
    <header class="header container">
      <h1 class="logo"><router-link to="/" class="link"></router-link></h1>
      <div class="h_con">
        <ul class="clearfloat">
          <li class="phone">4000-585-116</li>
          <li><a href="#">中文</a></li>
          <li><em>|</em></li>
          <li><a href="#">English</a></li>
          <li><a href="#" class="weixin"></a></li>
          <li><a href="#" class="weibo"></a></li>
          <li v-if="!$store.state.uid"><router-link to="/login" class="h_login">登录</router-link></li>
          <li v-if="!$store.state.uid"><em>|</em></li>
          <li v-if="!$store.state.uid">
            <router-link to="/register" class="h_register">注册</router-link>
          </li>
          <li v-if="$store.state.uid" class="top_user"><a href="">{{$store.state.uname}}</a></li>
          <li v-if="$store.state.uid" class="top_quit"><a @click="$store.commit('logout')" style="cursor:pointer">退出</a></li>
        </ul>
        <div class="search clearfloat">
          <button type="button"></button>
          <input type="text" />
        </div>
      </div>
    </header>
    <!--nav-->
    <nav class="navbar">
      <div class="container">
        <div class="nav">
          <ul>
            <!-- 跳转到index -->
            <li>    
              <router-link to="/">
                <span class="icon_home"></span>首页
              </router-link>
            </li>

            <!-- 跳转到about -->
            <li><router-link to="/about">关于净美仕</router-link></li>

            <!-- 跳转到news -->
            <li>
              <router-link to="/news" :class="{ 'router-link-exact-active': $route.name == 'NewsDetails' }">
                公司动态
              </router-link>
            </li>

            <!-- 跳转到product -->
            <li class="nav_pd">
              <router-link to="/product/1" :class="{ 'router-link-exact-active': $route.name == 'Product' || $route.name == 'ProductDetails'}">
                产品中心<span class="icon_pd"></span>
              </router-link>
              <div class="pd_dropdown">
                <router-link to="/product/1">净美仕净化器</router-link>
                <router-link to="/product/2">净美仕滤网</router-link>
              </div>
            </li>

            <!-- 跳转到contact -->
            <li><router-link to="/contact">联系我们</router-link></li>
          </ul>
        </div>

        <!-- 跳转到cart -->
        <div class="s_cart" v-if="$store.state.uid">
          <router-link to="/cart">
            <span class="icon_cart"></span>
            购物车(<strong id="cart_sum">0</strong>)
            <span class="icon_sj"></span>
          </router-link>
          <div class="cart_dropdown">
            <ul>
            </ul>
            <div class="cd_js clearfloat">
              <span>共计：<strong>0.00</strong></span>
              <a href="#">结算</a>
            </div>
          </div>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
export default {};
</script>

<style>
.navbar .router-link-exact-active,
.navbar .router-link-active:hover {
  background: orange;
}
</style>
