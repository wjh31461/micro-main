<template>
  <div class="content-container">
    <!-- tab组件容器 -->
    <div :class="`tab-container ${theme}-tab-container`">
      <TAB></TAB>
    </div>
    <!-- 子应用渲染容器 -->
    <div class="app-container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import TAB from '@comp/Tab/index.vue'

export default {
  components: { TAB },
  data () {
    return {
      theme: window.custom.menuTheme
    }
  }
}
</script>

<style lang="less" scoped>
  .content-container{
    height: 100%;
    .tab-container{
      height: 40px;
    }
    .light-tab-container{
      background: #fff;
    }
    .dark-tab-container{
      background: #001529;
    }
    .app-container{
      height: calc(~"100% - 40px");
    }
  }
</style>
