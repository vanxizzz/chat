 <template>
  <div id="loginBox">
    <h4>登录</h4>
    <el-form
      :model="loginForm"
      :rules="loginRules"
      ref="loginForm"
      label-width="0px"
    >
      <el-form-item label="" prop="account" style="margin-top: 40px">
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
      <el-form-item style="margin-top: 55px">
        <el-button type="primary" round class="btns" @click="submitForm"
          >登录</el-button
        >
        <el-button type="primary" round class="btns" @click="toRegisterPage"
          >前往注册 <span class="iconfont rightArrowIcon" />
        </el-button>
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
        account: "",
        passWord: "",
      },
      loginRules: {
        account: [{ required: true, message: "请输入账号", trigger: "blur" }],
        passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    //提交登录
    async submitForm() {
      const { passWord, account } = this.loginForm;
      let loadingInstance1 = Loading.service({ fullscreen: true });
      const resp = await this.$apis.login({
        account: account,
        password: passWord,
      });
      if (resp.status) {
        this.$message({
          message: resp.msg,
          type: "success",
        });
        this.$store.commit("user/login", resp.data);
        this.$router.push("/");
      } else {
        this.$message({
          message: resp.msg,
          type: "error",
        });
      }
      console.log(resp);
      loadingInstance1.close();
    },
    /* 跳转到注册页面 */
    toRegisterPage() {
      this.$router.push("/identify/register");
    },
  },
  mounted() {

  },

};
</script>
 
 <style  scoped>
#bgd {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
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