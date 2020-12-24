<template>
  <div class="home">
    <div class="wrapper">
      <Left />
      <Right />
    </div>
    <div class="alertInfo">
      
    </div>
  </div>
</template>

<script>
import Left from "./left";
import Right from "./right";
export default {
  name: "Home",
  data() {
    return {
      account: "",
      password: "",
      userName: "",
    };
  },
  methods: {},
  components: {
    Left,
    Right,
  },
  mounted() {
    console.log("*****************")
    this.$socket.launch();
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100vh;
  background-image: url("https://res.wx.qq.com/a/wx_fed/webwx/res/static/img/2zrdI1g.jpg");
  background-size: cover;
  .wrapper {
    height: 100%;
    max-width: 1000px;
    min-width: 800px;
    margin: 0 auto;
    display: flex;

    
  }
}
</style>
