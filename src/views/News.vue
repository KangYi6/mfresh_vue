<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">公司动态</a></h2>
      </div>
    </div>

    <!--页面主体-->
    <!-- 报错：data数据刚开始的值是null，请求完毕后才有值：在请求完毕前使用 null.data -->
    <!-- 解决方案：在加载数据前做判断 -->
    <div class="main container" v-if="data">
      <div class="news">
        <ul>
          <!-- 遍历数据 -->
          <li v-for="(item, index) in data.data" :key="index">
            <!-- 过滤器 filter 专门修改 {{}} 中的值；格式：{{ 值 | 过滤器 }} -->
            <span>{{ item.pubTime | date }}</span>
            <!-- 点击跳转至详情页 -->
            <router-link :to="`/news_details/${item.nid}`">
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 分页导航-->
      <div class="pages">
        <!-- 如果当前页大于总页数，可以点击上一页，否则不能点击上一页 -->
        <a @click="getData(data.pageNum - 1)" v-if="data.pageNum > 1">上一页</a>
        <a class="default" v-else>上一页</a>
        <!-- class="cur" 背景色高亮 -->
        <a @click="getData(item)" :class="{ cur: item == data.pageNum }" v-for="(item, index) in data.pageCount" :key="index">
          {{ item }}
        </a>
        <!-- 如果当前页小于总页数，可以点击下一页，否则不能点击下一页 -->
        <a @click="getData(data.pageNum + 1)" v-if="data.pageNum < data.pageCount">下一页</a>
        <!-- class="default 浅灰色样式" -->
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
  // 生命周期：挂载时
  mounted() {
    // 调用函数
    this.getData(1);
  },
  methods: {
    // 请求数据
    getData(pno) {
      // 如果当前页和请求数据页是同一页，则不再发请求，节省流量
      if (this.data && pno==this.data.pageNum) 
      return;
      //向服务器发请求
      let url = "http://www.codeboy.com:9999/mfresh/data/news_select.php?pageNum=" + pno;
      this.axios.get(url).then(res => {
        console.log(res);
        // 保存数据
        this.data = res.data;
      });
    },
  },
  // pubtime时间戳转换（过滤器）
  filters: {
    date(value) {
      let date = new Date(value * 1); //将字符串类型转换为数值类型
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;//返回年-月-日
    },
  },
};
</script>

<style>
.pages > a {
  /* 用户选中时：不能同时选中 */
  user-select: none;
}
</style>
