<template>
  <div>
      <!--页面主体-->
    <div class="login_box">
    <div class="container">
        <div class="login">
        <h2>用户登录</h2>
        <dl class="clearfloat">
            <dt><span class="tips" id="uname_prompt_text" style="display: block;" v-if="showErr">用户名或密码不正确</span>用户名：</dt>
            <dd>
            <input type="text" id="uname" placeholder="邮箱/手机号" v-model="uname" @blur="showErr=false"/>
            <em class="icon_user"></em>
            <i class="icon_error" id="uname_prompt_icon"></i>
            </dd>
        </dl>
        <dl>
            <dt><span class="tips" id="pwd_prompt_text">请输入密码</span>密码：</dt>
            <dd>
            <input type="password" id="pwd" placeholder="密码" v-model="upwd"/>
            <em class="icon_pwd"></em>
            <i class="icon_error" id="pwd_prompt_icon"></i>
            </dd>
        </dl>
        <p><label>
            <input type="checkbox"/>
            <span>自动登录</span>
        </label></p>
        <button type="button" id="login" @click="doLogin">立 即 登 录</button>
        </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            uname:"",
            upwd:"",
            showErr:false
        }
    },
    methods:{
        doLogin(){
            console.log(this.uname,this.upwd);
            // 请求接口 post    dingding  123456
            let url="user_login.php";
            let params=`unameOrPhone=${this.uname}&upwd=${this.upwd}`;
            this.axios.post(url,params).then((res)=>{
                // code: 400  找不到用户
                console.log(res);
                //登录成功--uid有值，未登录--默认值
                if(res.data.code==1){
                  // vuex 更新数据
                  this.$store.commit("updateUser",res.data)
                  // 跳转到上一页
                  this.$router.go(-1);
                }else{
                    this.showErr=true;
                }
            });
        }
    }
}
</script>

<style>

</style>