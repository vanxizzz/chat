<template>
  <vue-custom-scrollbar
    :settings="settings"
    :swicher="swicher"
    :tagname="tagname"
    ref="bar"
  >
    <slot></slot>
  </vue-custom-scrollbar>
</template>

<script>
export default {
  data() {
    return {
      mySettings: {},
    };
  },
  props: {
    settings: {
      default: null,
    },
    swicher: {
      type: Boolean,
      default: true,
    },
    tagname: {
      type: String,
      default: "section",
    },
  },
  updated() {
    this.$nextTick().then(() => {
      console.log("增强了零零零零");
      this.$refs.bar.$el.scrollTop = 99999999999;
    });
  },
  mounted() {
    this.$nextTick().then(() => {
      console.log("增强了零零零零");
      this.$refs.bar.$el.scrollTop = 99999999999;
    });
  },
};
</script>

<style>
</style>