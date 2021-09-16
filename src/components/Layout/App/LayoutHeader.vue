<template>
  <div class="header-container">
    <!-- logo区域 -->
    <div class="logo-container container">
      <div class="logo"></div>
      <div class="name">{{systemName}}</div>
    </div>
    <!-- 导航栏区域 -->
    <div class="nav-container container">

    </div>
    <!-- 系统操作区域 -->
    <div class="action-container container">
      <actions></actions>
    </div>
  </div>
</template>

<script>
import actions from '@comp/Action/index.vue'

export default {
  components: { actions },
  data () {
    return {
      systemName: window.custom.systemName
    }
  }
}
</script>

<style lang="less" scoped>
  .header-container{
    height: 100%;
    display: flex;
    .container{
      height: 100%;
    }
    .logo-container{
      width: 260px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      background: #2B3B49;
      color: #fff;
    }
    .nav-container{
      width: calc(~"100% - 660px");
    }
    .action-container{
      width: 400px;
    }
  }
</style>
