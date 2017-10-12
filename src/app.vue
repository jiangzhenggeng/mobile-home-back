<template>
  <div class="page">
    <loading v-show="$store.state.show" />
    <page-header />
    <div class="content-wrap ft">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import page_header from './components/header.vue';
  import * as types from './store/types';
  export default {
    data:function () {
      return {};
    },
    components:{
      'page-header':page_header
    },
    created:function () {

    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  @import "./style/less/_mixs.less";

</style>
