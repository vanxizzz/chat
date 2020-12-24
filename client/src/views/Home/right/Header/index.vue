<template>
  <div class="header">
    <div class="content">
      <div class="box" >
        <div class="name">{{ name }}</div>
        <div class="iconfont bottomArrowIcon"></div>
      </div>
    </div>
    <div :class="`alertWrapper ${showGroupOnes ? 'show' : 'hide'}`">
      <vue-custom-scrollbar class="groupOneScrollBar">
        <div class="imgItem add" @click="alertAddPage">
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </div>
        <div class="imgItem" v-for="item in friends" :key="item">
          <div class="avatar">
            <el-avatar
              class="avatar"
              shape="square"
              :src="item.avatar"
            ></el-avatar>
          </div>
          <div class="name">{{item.name}}</div>
        </div>
      </vue-custom-scrollbar>
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      @close="changeAlertWrapper(false)"
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
              <div class="checkboxItem" v-for="item in friends" :key="item.id">
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
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddGroup">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        // suppressScrollY: false,
        // suppressScrollX: false,
        // wheelPropagation: false,
        // maxScrollbarLength: 60,
        wheelSpeed: 0.08,
      },
      showGroupOnes: false,
      dialogVisible: false,
      curCheckedListId: [],
    };
  },
  computed: {
    name() {
      const state = this.$store.state;
      let { type, targetId } = state.chatting.curChattingTarget;
      console.log("targetIddddddd");
      console.log(targetId);
      // group_id
      let target;
      if (type === "user") {
        target = state.user.info.friends.find((item) => item.id === targetId);
      } else if (type === "group") {
        target = state.user.info.groups.find(
          (item) => item.group_id === targetId
        );
      }
      if (!target) {
        return "";
      }
      return target.name;
    },

    friends() {
      return this.$store.state.user.info.friends;
    },
  },
  methods: {
    alertAddPage() {
      this.changeAlertWrapper(true);
    },
    changeAlertWrapper(status) {
      this.dialogVisible = status;
      // this.showGroupOnes = false;
    },
    addGroupOne() {
      this.dialogVisible = true;
    },
    confirmAddGroup() {},
    isChecked(id) {
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
  },
  components: {},
};
</script>

<style lang="scss" scoped>
.friendsScrollBar {
  max-height: 300px;
  overflow: hidden;
}
.header {
  width: 100%;
  height: 51px;
  position: relative;
  z-index: 6;
  background-color: #eee;
  .addPage {
    z-index: 10;
  }
  .content {
    width: 95%;
    height: 100%;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .box {
      display: flex;
      cursor: pointer;
      .name {
        color: #000;
        margin-right: 13px;
      }
      .bottomArrowIcon {
        color: rgb(167, 166, 166);
      }
    }
  }
  .alertWrapper {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 51px;
    width: 95%;
    max-height: 300px;
    overflow: hidden;
    transition: all 0.5s;
    background-color: #eee;
    .groupOneScrollBar {
      height: 300px;
      overflow: hidden;
    }
    // display: flex;
    // flex-wrap: wrap;
    // .img-area {
    //   height: 100px;
    //   width: 100%;
    //   position: relative;
    // }
    &.show {
      opacity: 1;
      z-index: 5;
    }
    &.hide {
      opacity: 0;
      z-index: -1;
    }
    &::after {
      content: "";
      display: block;
      clear: both;
    }

    .imgItem {
      box-sizing: border-box;
      width: calc(100% / 8);
      padding: 7px;
      float: left;
      cursor: pointer;
      &.add {
        border: 1px dashed #000;
      }
      .avatar {
        width: 70px;
        height: 70px;
      }
      .name {
        text-align: center;
        font-size: 12px;
      }
      .avatar-uploader-icon {
        width: 70px;
        height: 70px;
        line-height: 63px;
        font-size: 28px;
        text-align: center;
      }
    }
  }
}
</style>