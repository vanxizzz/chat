<template>
  <div class="right">
    <template v-if="curChattingTarget.targetId == null">
      <!-- 没找人聊天的模板 -->
      <div class="noChat">
        <div class="iconfont wechatIcon wechat"></div>
        <p>未选中聊天</p>
      </div>
    </template>
    <template v-else>
      <div class="wrapper">
        <Header />
        <ChattingRecord />
        <RichText />
      </div>
    </template>
  </div>
</template>

<script>
import Header from "./Header";
import { mapState } from "vuex";
import ChattingRecord from "./ChattingRecord";
import RichText from "./RichText";
export default {
  components: {
    Header,
    ChattingRecord,
    RichText,
  },
  computed: {
    ...mapState("chatting", ["curChattingTarget"]),
  },
};
</script>

<style lang="scss" scoped>
.right {
  height: 100%;
  background-color: #eee;
  flex-grow: 1;
  position: relative;
  .noChat {
    color: #ccc;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .wechat {
      font-size: 40px;
      text-align: center;
    }
  }
  .wrapper {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>