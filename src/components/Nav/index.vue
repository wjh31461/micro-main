<script>
export default {
  data () {
    return {
      navs: [],
      selectedKeys: []
    }
  },
  computed: {
    listenNavs () {
      return this.$store.state.user.navs
    }
  },
  watch: {
    listenNavs: {
      deep: true,
      immediate: true,
      handler: function (navs) {
        this.navs = _.cloneDeep(navs)
      }
    }
  },
  methods: {
    handleClick (nav) {
      this.$store.commit('user/SET_MENUS', nav.menus)
      this.selectedKeys = [nav.key]
      // 不存在子菜单/且当前路由地址与导航栏地址不同
      if ((!nav.menus || !nav.menus.length) && (this.$route.fullPath !== nav.path)) {
        this.$router.push(nav.path)
        this.$bus.$emit('onUpdateTab', nav)
      }
    }
  },
  render () {
    let self = this
    
    const navProps = {
      mode: 'horizontal',
      theme: window.custom.menuTheme,
      selectedKeys: self.selectedKeys
    }

    function renderNavs (navs) {
      return navs.map(nav => {
        return (
          <a-menu-item key={ nav.key } on={ { click: () => self.handleClick(nav) } }>
            { nav.icon && <a-icon type={ nav.icon } /> }
            <span>{ nav.title }</span>
          </a-menu-item>
        )
      })
    }

    return (
      <a-menu props={ navProps }>
        {renderNavs(self.navs)}
      </a-menu>
    )
  }
}
</script>

<style lang="less" scoped>
  ::v-deep.ant-menu-horizontal{
    border: none;
    height: 100%;
    line-height: 75px;
    font-size: 16px;
  }
</style>
