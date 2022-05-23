<template>
  <div>
    <!--页面主体-->
    <div class="register">
      <h2>新用户注册</h2>
      <ul>
        <li>
          <span>邮箱：</span>
          <input
            type="text"
            id="uname"
            placeholder="请输入邮箱名"
            v-model="email"
            @blur="checkEmail"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-if="status_email == 2 || status_email == 3 || status_email == 4"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-if="status_email == 5"
          ></em>
          <i style="display: inline;" v-if="status_email == 2"
            >请输入您的注册邮箱</i
          >
          <i style="display: inline;" v-if="status_email == 3"
            >请输入正确的邮箱格式</i
          >
          <i style="display: inline;" v-if="status_email == 4"
            >此邮箱已被其他用户注册</i
          >
        </li>
        <li>
          <span>密码：</span>
          <input
            type="password"
            id="upwd"
            placeholder="请输入密码"
            v-model="passwd"
            @blur="checkPasswd"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-if="status_passwd == 2 || status_passwd == 3"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-if="status_passwd == 4"
          ></em>
          <i style="display: inline;" v-if="status_passwd == 2"
            >请输入您的密码</i
          >
          <i style="display: inline;" v-if="status_passwd == 3"
            >密码长度应为6~12个字符之间</i
          >
        </li>
        <li>
          <span>重复密码：</span>
          <input
            type="password"
            id="upwd2"
            placeholder="请重复输入密码"
            v-model="repasswd"
            @blur="checkRepasswd"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-if="status_repasswd == 2"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-if="status_repasswd == 3"
          ></em>
          <i style="display: inline;" v-if="status_repasswd == 2"
            >两次密码不一致</i
          >
        </li>
        <li>
          <span>手机号：</span>
          <input
            type="text"
            id="phone"
            placeholder="请输入手机号"
            v-model="phone"
            @blur="checkPhone"
          />
          <em
            class="icon_error"
            style="display: inline;"
            v-if="status_phone == 2 || status_phone == 3 || status_phone == 4"
          ></em>
          <em
            class="icon_ok"
            style="display: inline;"
            v-if="status_phone == 5"
          ></em>
          <i style="display: inline;" v-if="status_phone == 2"
            >请输入您的手机号</i
          >
          <i style="display: inline;" v-if="status_phone == 3"
            >请输入正确的手机号格式</i
          >
          <i style="display: inline;" v-if="status_phone == 4"
            >此手机号已被其他用户注册</i
          >
        </li>
        <li>
          <span>验证码：</span>
          <input
            type="text"
            class="inp_yzm"
            placeholder="请输入验证码"
            v-model="code"
          />
          <img src="../assets/images/yzm.png" alt="" />
          <strong class="icon_refresh"></strong>
        </li>
        <li class="li_checkbox">
          <label>
            <input type="checkbox" v-model="agree" />
            <span>我已阅读并同意用户注册协议</span>
          </label>
        </li>
        <li class="li_btn">
          <button type="button" v-if="agree" @click="doRegist">提交注册</button>
          <button type="button" class="disabled" disabled="" v-else>
            提交注册
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agree: true,
      email: "",
      passwd: "",
      repasswd: "",
      phone: "",
      code: "",
      // ---------
      status_email: 1,
      status_passwd: 1,
      status_repasswd: 1,
      status_phone: 1,
    };
  },
  methods: {
    doRegist() {
      let url = "user_register.php";
      let params = `uname=${this.email}&upwd=${this.passwd}&phone=${this.phone}`;

      this.axios.post(url, params).then((res) => {
        console.log(res);
        let { code, uid, uname } = res.data;

        if (code == 1) {
          alert("恭喜您，注册成功！即将为您跳转到刚才的页面。");

          this.$store.commit("updateUser", { uid, uname, phone: this.phone });

          // 跳转到首页
          this.$router.replace("/");
        } else {
          alert("很遗憾, 注册失败! 请稍后重试");
        }
      });
    },

    //1.邮箱验证
    checkEmail() {
      let email = this.email.trim(); //trim() 去掉两侧空白
      //状态:
      //1.1. 普通状态, 什么都不显示
      //1.2. 空
      if (email.length == 0) return (this.status_email = 2);
      //1.3. 格式错误     
      var reg = /^([a-zA-Z0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/; //格式依赖 正则表达式
      if (!reg.test(email)) return (this.status_email = 3);
      //1.4. 注册成功
      let url = "user_check_uname.php?uname=" + email;
      this.axios.get(url).then((res) => {
        console.log(res);
        // code 1已存在  2不存在
        if (res.data.code == 1) {
          this.status_email = 4;
        } else {
          this.status_email = 5;
        }
      });
    },

    //2.密码验证
    checkPasswd() {
      let passwd = this.passwd.trim();
      //状态：
      //2.1. 普通
      //2.2. 空
      if (passwd.length == 0) return (this.status_passwd = 2);
      //2.3. 长度错误 6~12
      if (passwd.length < 6 || passwd.length > 12)
        return (this.status_passwd = 3);
      //2.4. 正确
      this.status_passwd = 4;
    },

    //3.重复密码验证
    checkRepasswd() {
      let repasswd = this.repasswd.trim();
      let passwd = this.passwd.trim();
      //3.1. 普通
      //3.2. 不一致
      if (this.passwd != this.repasswd) return (this.status_repasswd = 2);
      //3.3. 一致
      this.status_repasswd = 3;
    },

    //4.手机号验证
    checkPhone() {
      let phone = this.phone.trim();
      //状态：
      //1.普通
      //2.空
      if (phone.length == 0) return (this.status_phone = 2);
      //3.格式错误
      var myreg = /^1[3-8]\d{9}$/;
      if (!myreg.test(phone)) return (this.status_phone = 3);
      //4.已注册
      let url = "user_check_phone.php?phone=" + phone;
      this.axios.get(url).then((res) => {
        console.log(res);
        if (res.data.code == 1) {
          this.status_phone = 4;
        } else {
          this.status_phone = 5;
        }
      });
      //5.正确
    },
    
    
    
  },
};
</script>

<style></style>
