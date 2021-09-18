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
    },
    listenSelectedKeys () {
      return this.$store.state.selected.navSelectedKeys
    }
  },
  watch: {
    listenNavs: {
      deep: true,
      immediate: true,
      handler: function (navs) {
        this.navs = _.cloneDeep(navs)
      }
    },
    listenSelectedKeys: {
      deep: true,
      immediate: true,
      handler (selectedKeys) {
        this.selectedKeys = _.cloneDeep(selectedKeys)
      }
    }
  },
  methods: {
    handleClick (nav) {
      this.$store.commit('user/SET_MENUS', nav.menus)
      this.$store.commit('selected/SET_NAVKEYS', [nav.target])
      if (!nav.menus || !nav.menus.length) {
        if (this.$route.fullPath !== nav.path) {
          this.$router.replace(nav.path)
          this.$bus.$emit('onUpdateTab', nav)
        }
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
          <a-menu-item key={ nav.target } on={ { click: () => self.handleClick(nav) } }>
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
