<template>
  <div class="richText">
    <div class="toolBar"></div>
    <vue-custom-scrollbar
      class="scroll-area"
    >
      <div>

      <textarea class="textArea" v-model="val" />
      </div>
    </vue-custom-scrollbar>
    <div class="sendWrapper">
      <div class="box">
        <button class="sendBtn" @click="sendChatting">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      val: "",
    };
  },
  methods: {
    sendChatting() {
      const info = this.val;
      const state = this.$store.state;
      let targetId = state.chatting.curChattingTarget.id;
      let myId = state.user.info.id;
      console.log(myId, targetId, info);
      this.$socket.emit("sendUserChatting", { myId, targetId, info });
    },
  },
};
</script>

<style scoped lang="scss">
$richTextHeight: 180px;
$toolBarHeight: 40px;
$sendWrapperHeight: 30px;
.richText {
  height: $richTextHeight;
  // background: #f40;
  width: 100%;
  .toolBar {
    height: $toolBarHeight;
    box-sizing: border-box;
    background: #00f;
  }
  .scroll-area {
    height: $richTextHeight - $toolBarHeight - $sendWrapperHeight;
    width: 100%;
  }
  .textArea {
    // display: block;
    background-color: #eee;
    border: none;
    outline: none;
    min-height: $richTextHeight - $toolBarHeight - $sendWrapperHeight;
    padding: 0 10px;
    max-height: 100%;
    // overflow: hidden;
    font-size: 20px;
    box-sizing: border-box;
    width: 100%;
    // max-width: 1000px;
    resize: none;
  }
  .sendWrapper {
    height: $sendWrapperHeight;
    &::after {
      content: "";
      clear: both;
      display: block;
    }
    .box {
      height: 100%;
      float: right;
      .sendBtn {
        height: 100%;
        border: 1px solid #000;
        outline: none;
        background: #fff;
        padding: 0 30px;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          background: #eee;
        }
      }
    }
  }
}
</style>