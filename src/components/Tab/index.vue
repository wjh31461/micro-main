<template>
  <div class="tab-container">
    <a-tabs v-model="activeTab" 
            hide-add 
            type="editable-card"
            @change="handleChange">
            <a-tab-pane class="tab-pane" v-for="tab in tabs" :key="tab.path" :closable="tabs.length > 1">
              <div slot="tab" class="tab-card">
                <span class="title">{{tab.title}}</span>
                <a-icon class="close" type="close"></a-icon>
              </div>
            </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTab: null,
      tabs: []

    }
  },
  mounted () {
    let self = this
    self.$bus.$on('onUpdateTab', function (data) {
      self.handleUpdate(data)
    })
  },
  beforeDestroy () {
    this.$bus.$off('onUpdateTab')
  },
  methods: {
    handleUpdate (data) {
      if (!this.tabs.filter(tab => tab.path === data.path).length) {
        this.tabs.push({
          title: data.title,
          path: data.path
        })
      }
      this.activeTab = data.path
    },
    handleChange (path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="less" scoped>
  ::v-deep.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab{
    border: none;
    background: #F5F5F5;
  }
  ::v-deep.ant-tabs.ant-tabs-card .ant-tabs-card-bar .ant-tabs-tab-active{
    background: #fff;
  }
  .tab-container{
    height: 100%;
    .tab-pane{
      height: 0;
    }
    .tab-card{
      .close{
        color: #8B98A6;
        margin-left: 12px;
      }
    }
  }
</style>
