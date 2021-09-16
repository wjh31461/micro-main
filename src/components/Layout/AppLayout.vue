<template>
  <a-layout class="layout-container">
    <!-- 布局顶部 -->
    <a-layout-header class="layout-header">
      <layout-header></layout-header>
    </a-layout-header>
    <a-layout>
      <!-- 布局侧边栏 -->
      <a-layout-sider :theme="theme" class="layout-sider">
        <layout-sider></layout-sider>
      </a-layout-sider>
      <a-layout>
        <!-- 布局内容 -->
        <a-layout-content class="layout-content">
          <layout-content></layout-content>
        </a-layout-content>
        <!-- 布局底部 -->
        <a-layout-footer class="layout-footer" v-if="copyright">
          <layout-footer :copyright="copyright"></layout-footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script>
import LayoutHeader from './App/LayoutHeader.vue'
import LayoutSider from './App/LayoutSider.vue'
import LayoutContent from './App/Layout.vue'
import LayoutFooter from './App/LayoutFooter.vue'

export default {
  components: { LayoutHeader, LayoutSider, LayoutContent, LayoutFooter },
  data () {
    return {
      theme: window.custom.menuTheme,
      copyright: window.custom.copyright
    }
  },
  created () {
    console.log(this.theme)
  }
}
</script>

<style lang="less" scoped>
  .layout-container{
    height: 100%;
    .layout-header{
      height: 75px !important;
      padding: 0 !important;
      color: #ddd;
    }
    .layout-sider{
      flex: 0 0 260px !important;
      max-width: 260px !important;
    }
    .layout-content{
      
    }
    .layout-footer{
      height: 50px;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
