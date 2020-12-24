<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  async mounted() {
    console.log("?????????");
    try {
      const resp = await this.$apis.whoami();
      console.log("rrrrrrrrresp");
      console.log(resp);
      if (resp.status) {
        this.$store.commit("user/login", resp.data);
        this.$router.push("/");
      }
    } catch (error) {
      console.log(error);
      console.log("识别失败");
    } finally {
    }
  },
  beforeDestroy() {
    this.$socket.disconnect();
  },
};
</script>

<style lang="scss" >
@import "./css/iconfont.scss";
html {
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
</style>
