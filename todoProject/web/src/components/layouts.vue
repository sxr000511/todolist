<template>
  <section class="container" :class="{ 'menu-open': menuOpen }">
    <!--最外层容器-->
    <section class="menu">
      <!--左边的容器-->
      <menus></menus>
      <!-- * -->
    </section>
    <div class="content-overlay" @click="$store.dispatch('updateMenu')"></div>
    <!-- 这个是当页面收缩覆盖在内容上面的模糊层，点击后复原 他可以直接调用vuex actions.js里面的updateMenu方法-->

    <section class="content-container">
      <!--右边的容器-->
      <todo></todo>
    </section>
  </section>
</template>

<script>
import menus from "./menus";
import todo from "./todo";

export default {
  name: "Layouts",
  components: { menus, todo },
  computed: {
    menuOpen() {
      return this.$store.state.menuOpen;
    },
  },
};
</script>

<style lang="less">
@import "../common/style/layouts.less";
</style>