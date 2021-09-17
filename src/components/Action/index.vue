<template>
  <div class="actions-container">
    <a-icon class="action-icon" type="logout" title="退出登录" v-if="hasLogin"></a-icon>
    <a-icon class="action-icon" type="setting" title="设置"></a-icon>
    <a-icon class="action-icon" type="bell" title="提醒"></a-icon>
    <a-icon class="action-icon" type="user" title="用户" v-if="hasLogin"></a-icon>
  </div>
</template>

<script>
export default {
  data () {
    return {
      hasLogin: window.custom.hasLogin
    }
  }
}
</script>

<style lang="less" scoped>
  .actions-container{
    height: 100%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    padding: 0 8px;
    .action-icon{
      font-size: 24px;
      margin: 0 12px;
      cursor: pointer;
    }
  }
</style>
