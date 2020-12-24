<template>
  <div class="my">
    <div class="myWrapper">
      <img class="avatar" :src="info.avatar" />
      <span class="name">{{ info.name }}</span>
    </div>
    <div class="config">
      <el-dropdown @command="tt" trigger="click">
        <span class="el-dropdown-link">
          <span class="iconfont configIcon" style="color: #777777"></span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="item.command" v-for="item in dropDownData" :key="item.id" >{{item.label}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      dropDownData: [
        {
          id: 0,
          command: "logout",
          label: "退出",
          fn(val) {
            this.$confirm("确定退出吗", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "退出成功!",
                });
                this.$apis.logout();
                // this.$router.push({
                //   name: "login",
                // })
              })
              .catch(() => {});
          },
        },
      ],
    };
  },
  methods: {
    tt(command) {
      let fn = this.dropDownData.find((item) => item.command === command).fn;
      fn.call(this, 123);
    },
  },
  computed: {
    info() {
      let { name } = this.$store.state.user.info;
      if (name.length > 10) {
        name = name.substr(0, 10) + "...";
      }
      return {
        ...this.$store.state.user.info,
        name,
      };
    },
  },
};
</script>

<style lang="scss">
@import "~@/css/instance.scss";
.my {
  width: 100%;
  box-sizing: border-box;
  padding: $leftRightPadding;
  display: flex;
  align-items: center;
  //   &::after {
  //     content: "";
  //     clear: both;
  //     display: block;
  //   }
  .myWrapper {
    // float: left;
    flex-grow: 1;
    display: flex;
    align-items: center;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 2px;
      margin-right: 10.625px;
    }
    .name {
      color: #fff;
      font-size: 18px;
      text-overflow: ellipsis;
    }
  }
  .config {
    // float: right;
    cursor: pointer;
    width: 20px;
  }
}
</style>