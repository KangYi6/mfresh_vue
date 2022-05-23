<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品中心</a>&gt;<a href="">净美仕净化器</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container" v-if="data">
      <div class="pd_info clearfloat">
        <div class="pdinfo_img">
          <img :src="`http://www.codeboy.com:9999/mfresh/${data.pic}`" alt="" />
        </div>
        <div class="pdinfo_text">
          <h2>{{ data.title1 }}</h2>
          <ul>
            <li>型号：{{ data.model }}</li>
            <li>功能：{{ data.func }}</li>
            <li>噪音：{{ data.noise }}</li>
            <li>风量：{{ data.wind }}</li>
            <li>适用对象：{{ data.applyTo }}</li>
            <li>适用面积：{{ data.size }}</li>
            <li>空气净化能效等级：{{ data.level }}</li>
          </ul>
          <p>
            价格：<span>¥</span><strong id="price">{{ data.price }}</strong>
          </p>
          <a @click="addToCart" id="addCart" style="cursor:pointer"><span class="icon_cart"></span>加入购物车</a>
        </div>
      </div>
      <div class="details_box">
        <h2 class="title">产品详情</h2>
        <div class="pd_details" v-html="data.detail">
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
  // 挂载时触发
  mounted() {
    this.getData();
  },
  methods: {
    // 跳转到登录页面
    addToCart(){
      // 判断：登录状态--添加购物车，非登录状态--跳转到登录页面
      if(this.$store.state.uid){
        let uid=this.$store.state.uid;
        let pid=this.$route.params.pid;
        // 添加商品到购物车
        let url=`cart_detail_add.php?uid=${uid}&pid=${pid}`;
        this.axios.get(url).then((res)=>{
          console.log(res);
          if(res.data.code==1){
            alert("添加成功");
          }else{
            alert("添加失败");
          }
        });
      }else{
        // 编程式跳转：使用代码完成路由跳转
        this.$router.push("/login");
      }
    },
    getData() {
      let pid = this.$route.params.pid;
      let url = "product_detail.php?pid=" + pid;
      // 发送请求
      this.axios.get(url).then((res) => {
        console.log(res);

        // 替换产品详情中的图片路径
        res.data.detail = res.data.detail.replace(
          /<img src="product-imgs/g,
          '<img src="http://www.codeboy.com:9999/mfresh/product-imgs'
        );
        this.data = res.data;
      });
    },
  },
};
</script>

<style>
</style>
