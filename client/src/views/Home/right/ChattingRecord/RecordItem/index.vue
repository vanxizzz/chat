<template>
  <div :class="`recordItem ${direction}`">
    <div class="avatar">
      <img
        :src="avatar"
        alt=""
        class="avatarImg"
      />
    </div>
    <div class="info">
      <div class="name" v-if="chatType === 'group' && direction === 'left'">
        {{ name }}
      </div>
      <div class="word">{{info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: String,
    },
    avatar: {
      type: String,
    },
    direction: {
      default: "left",
      validator(val) {
        return ["left", "right"].includes(val);
      },
    },
    name: {
      type: String,
    },
    chatType: {
      default: "user",
      validator(val) {
        return ["user", "group"].includes(val);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.recordItem {
  // &::after{
  //     content:"";
  //     clear: both;
  //     display: block;
  // }
  display: flex;
  align-items: flex-start;
  margin: 16px 0;
  &.left {
    justify-content: flex-start;
    & .word {
      background-color: #fff;
    }
    & .avatar {
      margin-right: 5px;
    }
  }
  &.right {
    & .word {
      background-color: #b2e281;
    }
    & .avatar {
      order: 2;
    }
    justify-content: flex-end;
  }
  .info {

    margin-right: 5px;
    max-width: 80%;
  }
  .word {
    
    word-break: break-all;
    border-radius: 5px;
    padding: 10px;
  }
  .avatar {
    .avatarImg {
      width: 40px;
      height: 40px;
      border-radius: 5px;
    }
  }
}
</style>