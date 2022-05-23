<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2><a href="">首页</a>&gt;<a href="">公司动态</a></h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="data">
      <div class="news_details">
        <h2>{{ data.title }}</h2>
        <span>发布时间：{{ data.pubTime | date }}</span>
        <div class="news_content" v-html="data.content">
        </div>
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
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      console.log(this.$route);
      let nid = this.$route.params.nid;
      let url =
        "http://www.codeboy.com:9999/mfresh/data/news_detail.php?nid=" + nid;
      this.axios.get(url).then(res => {
        console.log(res);
        // 图片路径前缀替换
        res.data.content = res.data.content.replace(
          /src="news_imgs/g,
          'src="http://www.codeboy.com:9999/mfresh/news_imgs'
        );

        this.data = res.data;
      });
    },
  },
};
</script>

<style></style>
