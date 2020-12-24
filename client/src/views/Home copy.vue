<template>
  <div class="home">
    首页
    <p>账号：<input type="text" v-model="account" /></p>
    <p>密码：<input type="text" v-model="password" /></p>
    <p>姓名：<input type="text" v-model="userName" /></p>
    <button @click="handleRegister">注册</button>
    <button @click="handleLogin">登录</button>
    <button @click="who">我是谁</button>
    <el-button @click="logout">注销</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import this.$apis from "../this.$apis";
export default {
  name: "Home",
  data() {
    return {
      account: "",
      password: "",
      userName: "",
    };
  },
  methods: {
    logout(){
      this.$store.commit("user/logout");
      this.$router.push("/identify/login")
    },
    async handleRegister() {
      const { account, password, userName } = this;
      const res = await this.$apis.register({ account, password, name: userName });
      console.log("注册成功");
      console.log(res);
    },
    async handleLogin() {
      const { account, password } = this;
      console.log(account, password);
      const res = await this.$apis.login({ account, password });
      console.log("account, password");
      console.log("登录成功");
      console.log(res);
    },
    async who() {
      const res = await this.$apis.whoami();
      console.log(res);
    },
  },
  components: {},
};
</script>
