<template>
  <div class="relation">
    <div class="relationWrapper">
      <vue-custom-scrollbar
        class="scroll-area"
        :settings="settings"
        @ps-scroll-y="scrollHanle"
      >
        <div class="box">
          <div class="item">阿斯顿</div>
          <div class="item">阿斯顿</div>
          <div class="item">阿斯顿</div>
          <div class="item">阿斯顿</div>
          <div class="item">阿斯顿</div>
          <div class="item">阿斯顿</div>
          <div class="item">阿斯顿</div>
          <div class="item">阿斯顿</div>
          <div class="item">阿斯顿</div>
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
        wheelSpeed: 2,
        wheelPropagation: true,
        minScrollbarLength: 20,
      },
    };
  },
  computed: {
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
    chat(type, id) {
      console.log(type);
      console.log(id);
      this.$store.commit("chatting/updateCurChattingTarget", { id, type });
    },
    scrollHanle(evt) {
      console.log(evt);
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
      height: 200px;
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