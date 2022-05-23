<template>
  <div>
    <!--面包屑导航-->
    <div class="breadcrumb">
      <div class="container">
        <h2>
          <a href="">首页</a>&gt;<a href="">产品中心</a>
        </h2>
      </div>
    </div>
    <!--页面主体-->
    <div class="main container">
    <div class="cart">
        <div class="cart_header">
        <span>已选商品<em> {{checkNum}} </em>件</span>
        <span>总金额：<strong> {{checkPrice}} </strong></span>
        <button type="button">结算</button>
        </div>
        <div class="cart_con">
        <div class="cartcon_title">
            <span><input type="checkbox" v-model="checkAll" @change="docheckAll" /> 全选</span>
            <span>商品信息</span>
            <span>单价</span>
            <span>数量</span>
            <span>金额</span>
            <span>操作</span>
        </div>
        <ul>
            <h2 v-if="products.length==0">购物车中没有任何商品！</h2>
            <li v-for="(item,index) in products" :key="index">
                <input type="checkbox" class="cart_checkbox" v-model="item.checked" @change="doCheck" />
                <a href="" class="cart_img"><img :src="`http://www.codeboy.com:9999/mfresh/${item.pic}`" alt=""/></a>
                <a href="" class="cart_title">{{item.title1}}</a>
                <i>¥{{item.price}}</i>
                <div>
                    <span @click="updateCount(index,-1)">-</span><input type="text" :value="item.count"/><span @click="updateCount(index,+1)">+</span>
                </div>
                <strong>¥{{item.price*item.count}}</strong>
                <em @click="doDel(index)"></em>
            </li>
        </ul>
        </div>
        <div class="cart_header">
        <span>已选商品<em>{{checkNum}}</em>件</span>
        <span>总金额：<strong> {{checkPrice}} </strong></span>
        <button type="button">结算</button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            products:[],
            checkAll: false,
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        // 每一个项目的勾选变化
        doCheck(){
            let total = 0;
            this.products.forEach((item) => {
                if (item.checked) total += 1; 
          });
          if (total == this.products.length){
              this.checkAll = true
          } else {
              this.checkAll = false;
          }
        },
        // 全选商品
        docheckAll(){
            this.products.forEach(item=>{
                item.checked = this.checkAll;
            });
        },
        // 删除商品
        doDel(index){
            let did=this.products[index].did;
            let url="cart_detail_delete.php?did="+did;
            this.axios.get(url).then((res)=>{
                console.log(res);
                if(res.data.code==1){
                    this.products.splice(index,1);
                }
            });
        },
        // 数量加减
        updateCount(index,delta){
            let {did,pid,count}=this.products[index];
            // 如果商品为1，不能再继续删减
            if(count==1 && delta==-1){
                alert("商品数量最小为1");
                return;
            }
            let url=`cart_detail_update.php	?did=${did}&pid=${pid}&count=${count*1+delta}`;
            this.axios.get(url).then((res)=>{
                console.log(res);
                if(res.data.code==1){
                    this.products[index].count=count*1+delta;
                }
            })
        },
        getData(){
            let url="cart_detail_select.php?uid="+this.$store.state.uid;
            this.axios.get(url).then((res)=>{
                console.log(res);

                //人为为每条数据添加一个 checked 属性，代表是否勾选
                res.data.products.forEach(item=>{
                    item.checked = false;
                })
                this.products = res.data.products;
            });
        },
    },
    //计算属性：通过一些算法，算出来的值
    computed: {
        checkNum(){
          let total = 0;
          this.products.forEach((item) => {
            if (item.checked) total += 1; 
          });
          return total;
        },
        checkPrice(){
            let total = 0;
            this.products.forEach(item => {
                if (item.checked) total += item.price * item.count;
            });
            return total;
        },
    }
}
</script>

<style>
  span{
    user-select: none;  
  }
</style>