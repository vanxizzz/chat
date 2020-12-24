<template>
  <div class="relation">
    <div class="relationWrapper">
      <vue-custom-scrollbar
        class="scroll-area"
        :settings="settings"
      >
        <div class="wrapper">
          <template>
            <!-- 朋友 -->
            <div
              v-for="item in friends"
              :class="{ item: true, cur: item.id === target.targetId  }"
              :key="`user ${item.id}`"
              @click="chat('user', item.id)"
            >
              <img :src="item.avatar" alt="" class="avatar" />
              <span class="name">{{ item.name }}</span>
            </div>
          </template>
          <template>
            <!-- 群 -->
            <div
              :class="{ item: true, cur: item.id === target.targetId }"
              v-for="item in groups"
              :key="`group ${item.group_id}`"
              @click="chat('group', item.group_id)"
            >
              <img :src="item.avatar" alt="" class="avatar" />
              <span class="name">{{ item.name }}</span>
            </div>
          </template>
        </div>
      </vue-custom-scrollbar>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      settings: {
        // suppressScrollY: false,
        // suppressScrollX: false,
        // wheelPropagation: false,
        // maxScrollbarLength: 60,
        wheelSpeed: 0.2,
      },
    };
  },
  computed: {
    target(){
      return this.$store.state.chatting.curChattingTarget
    },
    friends() {
      return this.$store.state.user.info.friends.map((item) => {
        let name = item.name;
        if (name.length > 10) {
          name = item.name.substr(0, 10) + "...";
        }
        return {
          ...item,
          name,
        };
      });
    },
    groups() {
      return this.$store.state.user.info.groups.map((item) => {
        let name = item.name;
        if (name.length > 10) {
          name = item.name.substr(0, 10) + "...";
        }
        return {
          ...item,
          name,
        };
      });
    },
    relations() {
      return [...this.friends(), ...this.groups()];
    },
  },
  methods: {
    chat(type, targetId) {
      console.log(type);
      console.log(targetId);
      const myId = this.$store.state.user.info.id;
      const { limit, page } = this.$store.state.chatting.curChattingTarget;
      this.$socket.emit("getChatting", {
        type,
        targetId,
        myId,
        limit,
        page,
        getAll: true,
      });
      // this.$store.commit("chatting/updateCurChattingTarget", { id, type });
    },
  },
};
</script>

<style lang="scss">
@import "~@/css/instance.scss";
.relation {
  user-select: none;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
  .relationWrapper {
    width: 100%;
    height: 100%;
    .scroll-area {
      position: relative;
      margin: auto;
      width: 100%;
      height: 100%;
    }
    .wrapper {
      width: 100%;
    }
    .item {
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
      &.cur {
        background: rgba(255, 255, 255, 0.1);
      }
      transition: all 0.2s;
      cursor: pointer;
      width: 100%;
      padding: 10px $leftRightPadding;
      box-sizing: border-box;

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
  }
}
</style>