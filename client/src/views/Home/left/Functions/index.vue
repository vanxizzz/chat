<template>
  <div class="funcs">
    <div class="itemWrapper">
      <div class="item" v-for="(item, index) in funcs" :key="item.id">
        <a
          href="#"
          :class="`iconfont ${item.icon} icon`"
          :style="item.style ? item.style : {}"
          :title="item.title"
          @click.prevent="alertPrompt(index)"
        ></a>
      </div>
    </div>
    <div class="alertPage">
      <el-dialog
        :visible.sync="dialogVisible[0]"
        @close="initForm(0)"
        width="30%"
        key="1"
      >
        <template #title>
          <span>通过账号添加好友</span>
        </template>
        <template #default>
          <div class="item">
            <el-input
              v-model="dialogInput[0].accountValue"
              placeholder="请输入对方账号"
            />
          </div>
          <div class="item">
            <vue-custom-scrollbar class="infoScrollBar">
              <el-input
                type="textarea"
                show-word-limit
                class="infoInput"
                placeholder="请输入验证信息。。。"
                v-model="dialogInput[0].info"
                resize="none"
              />
            </vue-custom-scrollbar>
          </div>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button type="primary" @click.stop="confirmAddFriend"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogVisible[1]"
        @close="initForm(1)"
        width="30%"
        key="2"
      >
        <template #title>
          <span>请选择好友添加</span>
        </template>
        <template #default>
          <div class="item">
            <vue-custom-scrollbar class="friendsScrollBar">
              <div class="checkboWrapper">
                <div
                  class="checkboxItem"
                  v-for="item in friends"
                  :key="item.id"
                >
                  <el-checkbox
                    :value="isChecked(item.id)"
                    :label="item.name"
                    @change="updateCheckbox(item.id)"
                    style="width: 100%"
                  ></el-checkbox>
                </div>
              </div>
            </vue-custom-scrollbar>
          </div>
          <div class="item">
            <el-input
              v-model="dialogInput[1].groupName"
              placeholder="请输入创建的群名"
            />
          </div>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button type="primary" @click="confirmAddGroup">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogVisible[2]"
        @close="initForm(2)"
        width="30%"
      >
        <template #title>
          <span>修改个人信息</span>
        </template>
        <template #default>
          <el-form :model="dialogInput[2]" label-width="50px">
            <el-form-item label="账号">
              <el-input disabled :value="dialogInput[2].account" />
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="dialogInput[2].name" />
            </el-form-item>
            <el-form-item label="头像">
              <el-upload
                class="avatar-uploader"
                :action="uploadAction"
                :show-file-list="false"
                :multiple="false"
                name="avatar"
                :on-success="successUploadImg"
                :headers="myHeaders"
              >
                <img
                  v-if="dialogInput[2].avatar"
                  :src="dialogInput[2].avatar"
                  class="avatar"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="hideDialog">取 消</el-button>
            <el-button type="primary" @click="confirmUpdateInfo"
              >修 改</el-button
            >
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "element-ui";
import { REQUEST_HOST, AVATAR_INTERFACE } from "@/apis/config.js";
export default {
  created() {
    this.uploadAction = `${REQUEST_HOST}${AVATAR_INTERFACE}`;
    const { account, name, avatar } = this.$store.state.user.info;
    this.dialogInput[2].account = account;
    this.dialogInput[2].name = name;
    this.dialogInput[2].avatar = avatar;
    console.log("createddddddd");
    console.log(this.dialogInput[2]);
  },
  data() {
    return {
      myHeaders: {
        authorization: localStorage.token,
      },
      dialogVisible: {
        0: false,
        1: false,
        2: false,
      },
      dialogInput: [
        {
          accountValue: "",
          info: "",
        },
        {
          groupName: "",
        },
        {
          account: "",
          name: "",
          avatar: "",
        },
      ],
      groupName: "",
      curCheckedListId: [],
      funcs: [
        {
          id: 0,
          title: "添加好友",
          icon: "friendIcon",
          style: {
            color: "#f40",
          },
        },
        {
          id: 1,
          title: "添加群",
          icon: "groupIcon",
          style: {
            color: "#02B6FD",
          },
        },
        {
          id: 2,
          title: "修改个人信息",
          icon: "editIcon",
        },
      ],
    };
  },
  computed: {
    friends() {
      return this.$store.state.user.info.friends;
    },
  },
  methods: {
    /* 确定修改信息 */
    async confirmUpdateInfo() {
      console.log("确定修改吗");
      console.log(this.dialogInput[2]);
      let response = await this.$apis.updateMyInfo({ ...this.dialogInput[2] });
      this.dialogVisible[2] = false;
      console.log("返回的结果");
      console.log(response);
      this.$message({
        message: response.msg,
        type: response.status ? "success" : "error",
      });
      if (response.status) {
        const { name, avatar } = response.data;
        this.$store.commit("user/updateMyInfo", { name, avatar });
        // this.$socket.emit("getFriends"); //获取朋友数据
        // this.$socket.emit("getGroups"); //获取群数据
        this.$socket.emit("updateMyInfo");
        this.$socket.emit("getAllChattingRecord", { getAll: true }); //获取所有群和朋友的聊天记录
        this.$root.$forceUpdate();
      }
    },
    initForm(index) {
      if (index === 2) {
        const { account, name, avatar } = this.$store.state.user.info;
        this.dialogInput[2].account = account;
        this.dialogInput[2].name = name;
        this.dialogInput[2].avatar = avatar;
        return;
      }
      let obj = this.dialogInput[index];
      for (let prop in obj) {
        obj[prop] = "";
      }
    },
    /* 上传图片成功触发的函数 */
    successUploadImg(response) {
      if (response.status) {
        this.dialogInput[2].avatar = response.data.imgSrc;
      }
      console.log("上传成功");
    },
    isChecked(id) {
      console.log("this.curCheckedListId");
      console.log(this.curCheckedListId);
      return this.curCheckedListId.includes(id);
    },
    /* 更新当前选中的checkbox */
    updateCheckbox(id) {
      let findIndex = this.curCheckedListId.findIndex((item) => item === id);
      if (findIndex !== -1) {
        /* 本来是选中的，接下来要不选中 */
        this.curCheckedListId = this.curCheckedListId.filter(
          (item) => item !== id
        );
      } else {
        /* 本来就没选中，接下来要选中 */
        this.curCheckedListId.push(id);
      }
    },
    /* 添加好友 */
    confirmAddFriend() {
      const { accountValue, info } = this.dialogInput[0];
      this.$socket.emit("enquireAddFriend", {
        targetAccount: accountValue,
        info,
        // title,
      });
      this.hideDialog();
    },
    /* 创建群 */
    confirmAddGroup() {
      console.log("结果");
      console.log(this.curCheckedListId);

      /* 发起请求 */
      let targetArr = this.friends.filter((item) =>
        this.curCheckedListId.includes(item.id)
      );
      this.$socket.emit("addGroup", {
        groupData: {
          name: this.dialogInput[1].groupName,
        },
        inviteTarget: targetArr,
      });
      /* 清空当前选项和群名 */
      this.curCheckedListId = [];
      /* 隐藏掉模态框 */
      this.hideDialog();
    },
    hideDialog() {
      for (let prop in this.dialogVisible) {
        this.dialogVisible[prop] = false;
      }
    },
    async alertPrompt(index) {
      // MessageBox.alert("<strong>这是 <i>HTML</i> 片段</strong>", "HTML 片段", {
      //   dangerouslyUseHTMLString: true,
      //   cancelButtonText:"取消",
      //   confirmButtonText:"添加",
      //   closeOnClickModal:true
      // });
      this.hideDialog();
      this.dialogVisible[index] = true;
      console.log(this.dialogVisible);
      return;
      // return;
      let title = ["通过账号添加好友", "通过群id添加", "占位符"][index];
      try {
        if (index === 0) {
          /* 添加好友 */
          let { value } = await MessageBox.prompt(title, {
            dangerouslyUseHTMLString: true,
            cancelButtonText: "取消",
            confirmButtonText: "添加",
            closeOnClickModal: true,
          });
          const { id } = this.$store.state.user.info;
          // this.$socket.emit("addFriend", { myId: id, targetAccount: value });
          console.log(value);
        } else if (index === 1) {
          /* 添加群 */
          this.dialogVisible = true;
        }
      } catch (error) {
        /* 取消了 */
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.funcs {
  // display: flex;
  .itemWrapper {
    display: flex;
    .item {
      flex-grow: 1;
      height: 38px;
      box-sizing: border-box;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #24272c;
      &:last-child {
        border: none;
      }
      &.cur {
        .icon {
          color: #b2e281;
        }
      }
      .icon {
        text-decoration: none;
        color: #fff;
        font-size: 25px;
      }
    }
  }
  .alertPage {
    .item {
      margin-bottom: 10px;
    }
    .checkboxItem {
      margin: 20px 0;
    }
    .friendsScrollBar {
      max-height: 300px;
      overflow: hidden;
    }
    .infoScrollBar {
      width: 100%;
      height: 180px;
      overflow: hidden;
      /deep/ .infoInput.el-textarea {
        textarea {
          width: 100%;
          height: 180px;
        }
      }
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>