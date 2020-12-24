 <template>
  <div id="loginBox">
    <h4>注册</h4>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-width="0px"
    >
      <el-form-item label="" prop="userName" style="margin-top: 40px">
        <el-row>
          <el-col :span="2">
            <!-- <span class="iconfont">&#xe654;</span> -->
            <span class="iconfont nameIcon"></span>
          </el-col>
          <el-col :span="22">
            <el-input
              class="inps"
              placeholder="用户名"
              v-model="loginForm.userName"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="" prop="account">
        <el-row>
          <el-col :span="2">
            <!-- <span class="iconfont">&#xe654;</span> -->
            <span class="iconfont accountIcon"></span>
          </el-col>
          <el-col :span="22">
            <el-input
              class="inps"
              placeholder="账号"
              v-model="loginForm.account"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="" prop="passWord">
        <el-row>
          <el-col :span="2">
            <span class="iconfont passwordIcon"></span>
          </el-col>
          <el-col :span="22">
            <el-input
              class="inps"
              placeholder="密码"
              v-model="loginForm.passWord"
            ></el-input>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" round class="btns" @click="toLoginPage"
          ><span class="iconfont leftArrowIcon" />返回登录</el-button
        >
        <el-button type="primary" round class="btns" @click="submitForm"
          >注册</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
 
 <script>
import { Loading } from "element-ui";
export default {
  data() {
    return {
      loginForm: {
        userName: "",
        passWord: "",
        account: "",
      },
      loginRules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
      },
    };
  },
  methods: {
    /* 回去登录页 */
    toLoginPage() {
      this.$router.push("/identify/login");
    },
    //提交注册
    async submitForm() {
      const { passWord, userName, account } = this.loginForm;
      let loadingInstance1 = Loading.service({ fullscreen: true });
      try {
        const resp = await this.$apis.register({
          account,
          password: passWord,
          name: userName,
        });
        console.log("respppppppp");
        console.log(resp);
        this.$message({
          message: resp.msg,
          type: resp.status ? "success" : "error",
        });
        if (resp.status) {
          this.$router.push("/identify/login");
        }
        loadingInstance1.close();
      } catch (error) {
        console.log("发送错误嗡嗡嗡嗡嗡嗡嗡嗡嗡了");
        console.log(error);
      }
    },
  },
  mounted() {},
};
</script>
 
 <style  scoped>
#bgd {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}
#login {
  width: 100vw;
  padding: 0;
  margin: 0;
  height: 100vh;
  font-size: 16px;
  background-repeat: no-repeat;
  background-position: left top;
  background-color: #242645;
  color: #fff;
  font-family: "Source Sans Pro";
  background-size: 100%;
  background-image: url("https://res.wx.qq.com/a/wx_fed/webwx/res/static/img/2zrdI1g.jpg");
  position: relative;
}
#loginBox {
  width: 240px;
  height: 280px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 50px 40px 40px 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background: linear-gradient(
    230deg,
    rgba(53, 57, 74, 0) 0%,
    rgb(0, 0, 0) 100%
  );
}
#loginBox .btns {
  background-color: transparent;
  color: #39f;
  width: 50%;
}
/* #loginBox .iconfont {
  color: #fff;
} */
#loginBox /deep/ .el-button + .el-button {
  margin-left: 0;
}
#loginBox /deep/ .inps input {
  border: none;
  color: #fff;
  background-color: transparent;
  font-size: 12px;
}
</style>