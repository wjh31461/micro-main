<script>
export default {
  data () {
    return {
      navs: []
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
    handleClick (menu) {
      let path = '/' + menu.keyPath.reverse().join('/')
      let nav = this.navs.filter(nav => nav.path === path)[0]
      this.$store.commit('user/SET_MENUS', nav.menus)
      if (!nav.menus || !nav.menus.length) {
        if (this.$route.fullPath !== path) {
          this.$router.replace(path)
        }
      }
    }
  },
  render () {
    const navProps = {
      mode: 'horizontal',
      theme: window.custom.menuTheme
    }

    const navEvents = {
      click: this.handleClick
    }

    function renderNavs (navs) {
      return navs.map(nav => {
        return (
          <a-menu-item key={ nav.target }>
            { nav.icon && <a-icon type={ nav.icon } /> }
            <span>{ nav.title }</span>
          </a-menu-item>
        )
      })
    }

    return (
      <a-menu props={ navProps } on={ navEvents }>
        {renderNavs(this.navs)}
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
