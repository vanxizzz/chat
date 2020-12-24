<template>
  <div class="searchBar">
    <div class="searchWrapper">
      <span class="iconfont searchIcon icon"></span>
      <input type="text" class="inp" placeholder="搜索" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("user", ["info"]),
  },
};
</script>

<style lang="scss">
@import "~@/css/instance.scss";
.searchBar {
  padding: 0 $leftRightPadding;
  width: 100%;
  box-sizing: border-box;
  .searchWrapper {
    background-color: #26292e;
    display: flex;
    align-items: center;
    height: 30px;
    .icon {
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      font-weight: bold;
      // padding: 0 15px;
    }
    .inp {
      flex-grow: 1;
      outline: none;
      border: none;
      background: none;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 12px;
      color: #fff;
    }
  }
}
</style>