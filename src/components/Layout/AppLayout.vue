<template>
  <a-layout class="layout-container">
    <!-- 布局顶部 -->
    <a-layout-header :class="`layout-header ${theme}-layout-header`">
      <layout-header></layout-header>
    </a-layout-header>
    <a-layout>
      <!-- 布局侧边栏 -->
      <transition name="slide-fade">
        <a-layout-sider v-model="collapsed"
                        :theme="theme"
                        :trigger="null"
                        :width="collapsed ? 80 : 260"
                        class="layout-sider"
                        v-show="!fullScreen">
          <layout-sider @full="handleFullScreen"></layout-sider>
          <TRIGGER :class="`trigger ${theme}-trigger`" @toggle="handleToggle"></TRIGGER>
        </a-layout-sider>
      </transition>
      
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
import TRIGGER from '@comp/Trigger/index.vue'

export default {
  components: { LayoutHeader, LayoutSider, LayoutContent, LayoutFooter, TRIGGER },
  data () {
    return {
      theme: window.custom.menuTheme,
      copyright: window.custom.copyright,
      collapsed: false,
      fullScreen: true
    }
  },
  created () {
    
  },
  methods: {
    handleToggle () {
      this.collapsed = !this.collapsed
    },
    handleFullScreen (fullScreen) {
      this.fullScreen = fullScreen
    }
  }
}
</script>

<style lang="less" scoped>
  .slide-fade-enter-active {
    transition: all .3s;
  }
  .slide-fade-leave-active {
    transition: all .3s;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateX(-260px);
    opacity: 0;
  }
  .layout-container{
    height: 100%;
    .layout-header{
      height: 75px;
      padding: 0;
      transition: all 0.3s;
      box-shadow: 0px 3px 8px 0px rgba(185, 200, 210, 0.5);
      z-index: 100;
    }
    .light-layout-header{
      background: #fff;
      color: #999;
    }
    .dark-layout-header{
      background: #001529;
      color: #ddd;
    }
    .layout-sider{
      box-shadow: 3px 0px 8px 0px rgba(185, 200, 210, 0.5);
      z-index: 90;
      position: relative;
      .trigger{
        position: absolute;
        top: 0;
        bottom: 0;
        right: -24px;
        margin: auto;
        z-index: 110;
      }
      .light-trigger{
        background: #fff;
        color: #999;
      }
      .dark-trigger{
        background: #001529;
        color: #fff;
      }
    }
    .layout-content{
      // background: #1890ff;
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
