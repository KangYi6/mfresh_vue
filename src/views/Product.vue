<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">产品中心</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
      <div class="pl_header">
        <router-link to="/product/1" :class="{ cur: $route.params.type == 1 }">
          净美仕净化器
        </router-link>
        <router-link to="/product/2" :class="{ cur: $route.params.type == 2 }">
          净美仕滤网
        </router-link>
      </div>
      <!-- 产品列表-->
      <ul class="product_list clearfloat" v-if="data">
        <li v-for="(item, index) in data.data" :key="index">
          <!-- 点击图片 动态跳转至商品详情 -->
          <router-link :to="`/product_details/${item.pid}`">
            <img :src="`http://www.codeboy.com:9999/mfresh/${item.pic}`" alt=""/>
          </router-link>
          <div class="pdlist_text clearfloat">
            <h3>
              <p>{{ item.model }}</p>
              <span>{{ item.title2 }}</span>
            </h3>
            <!-- 点击查看详情 动态跳转至商品详情 -->
            <router-link :to="`/product_details/${item.pid}`">查看详情</router-link>
          </div>
        </li>
      </ul>
      <!-- 分页导航-->
      <div class="pages" v-if="data">
        <!-- 判断：如果当前页数小于1，则可以点击进入上一页，否则不能进入上一页 -->
        <a @click="getData(data.pageNum - 1)" v-if="data.pageNum > 1">上一页</a>
        <a class="default" v-else>上一页</a>
        <!-- 鼠标点击当前页面，显示高亮 -->
        <a v-for="(item, index) in data.pageCount" :key="index" :class="{ cur: item == data.pageNum }" @click="getData(item)">
          {{ item }}
        </a>
        <!-- 判断：如果当前页数小于总页数，则可以点击进入下一页，否则不能进入下一页 -->
        <a @click="getData(data.pageNum + 1)" v-if="data.pageNum < data.pageCount">下一页</a>
        <a class="default" v-else>下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null,
    };
  },
  // 挂载时触发
  mounted() {
    console.log(this.$route);
    this.getData(1); //解决刷新时没有数据的bug
  },

  //路由守卫：当前属于重写
  //to:到哪去  from:从哪来
  beforeRouteUpdate(to, from, next) {
    //在当前路由改变，但是该组件复用时调用
    //举例来说，对于一个带有动态参数的路径  /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候
    //由于会渲染同样的Foo组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用
    //可以访问组件实例 `this`
    // console.log(to);

    next(); // 下一个：放行.. 路由走到此处，可以继续向下执行：更新路由的值为新值
    this.getData(1);
  }, 

  methods: {
    getData(pno) {
      let url = `product_select.php?type=${this.$route.params.type}&pageNum=${pno}`;
      this.axios.get(url).then((res) => {
        console.log(res);
        this.data = res.data;
      });
    },
  },
};
</script>

<style></style>
