<template>
  <div class="left">
    <Header />
    <!-- <SearchBar /> -->
    <Functions />
    <Relation />
  </div>
</template>

<script>
import Header from "./Header";
import SearchBar from "./SearchBar";
import Relation from "./Relation";
import Functions from "./Functions";

export default {
  components: {
    Header,
    SearchBar,
    Relation,
    Functions,
  },
};
</script>

<style lang="scss" scoped>
.left {
  background-color: #2e3238;
  height: 100%;
  width: 280px;
  display: flex;
  flex-direction: column;
}
</style>