<template>
  <EnhanceVueScrollBar :settings="settings" class="chattingScrolBar">
    <div class="chattingRecord">
      <!-- <RecordItem
        v-for="item in chattingData"
        :key="item.id"
        :info="item.info"
        :avatar="getTarget(type, item.id).avatar"
        :direction="item.send_id === myId ? 'right' : 'left'"
        :name="getTarget(type, item.id).name"
        chatType="user"
      /> -->
      <!-- <template v-if="type === 'user'">
        <RecordItem
          v-for="item in chattingData"
          :key="item.id"
          :info="item.info"
          :avatar="getSendData('user', item.send_id).avatar"
          :direction="item.send_id === myId ? 'right' : 'left'"
          :name="getSendData('user', item.send_id).name"
          :chatType="type"
        />
      </template>

      <template v-else-if="type === 'group'">
        <RecordItem
          v-for="item in chattingData"
          :key="item.id"
          :info="item.info"
          :avatar="getSendData('group', item.send_id).avatar"
          :direction="item.send_id === myId ? 'right' : 'left'"
          :name="getSendData('group', item.send_id).name"
          :chatType="type"
        />
      </template> -->
      <template v-if="type === 'user'">
        <RecordItem
          v-for="item in chattingData"
          :key="item.id"
          :info="item.info"
          :avatar="item.sendUserData.avatar"
          :direction="item.send_id === myId ? 'right' : 'left'"
          :name="item.sendUserData.avatar.name"
          :chatType="type"
        />
      </template>

      <template v-else-if="type === 'group'">
        <RecordItem
          v-for="item in chattingData"
          :key="item.id"
          :info="item.info"
          :avatar="item.sendUserData.avatar"
          :direction="item.send_id === myId ? 'right' : 'left'"
          :name="item.sendUserData.name"
          :chatType="type"
        />
      </template>
    </div>
  </EnhanceVueScrollBar>
</template>

<script>
import EnhanceVueScrollBar from "@/components/EnhanceVueScrollBar"
import RecordItem from "./RecordItem";

export default {
  data() {
    return {
      settings: {
        wheelSpeed: 0.3,
      },
    };
  },
  methods: {
    getSendData(type, send_id) {
      let res;
      const myId = this.$store.state.user.info.id;
      if (myId === send_id) {
        return this.$store.state.user.info;
      }
      if (type === "user") {
        res = this.$store.state.user.info.friends.find(
          (item) => item.id === send_id
        );
      } else if (type === "group") {
        res = this.$store.state.user.info.groups.find(
          (item) => item.user_id === send_id
        );
      }
      console.log(type,send_id,this.$store.state.user.info.groups)
      console.log("resssssssss")
      console.log(res)
      return res;
    },
  },
  components: {
    RecordItem,
    EnhanceVueScrollBar
  },
  computed: {
    chattingData() {
      console.log("????????????????????????????????=======")
      return this.$store.state.chatting.curChattingTarget.data;
    },
    type() {
      return this.$store.state.chatting.curChattingTarget.type;
    },
    myId() {
      return this.$store.state.user.info.id;
    },
  },
  mounted() {
    console.log("this.chattingData");
    console.log(this.chattingData);
  },
};
</script>

<style lang="scss" scoped>
.chattingScrolBar{
  flex-grow: 1;
}
.chattingRecord {
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 5%;
  // margin: 10px auto;
  overflow: hidden;
  // background-color: #000;
  // .chattingScrolBar {
  //   transition: all 0.5s;
  //   height: 100%;
  // }
}
</style>