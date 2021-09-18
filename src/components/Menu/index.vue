<script>
export default {
  data () {
    return {
      menus: []
    }
  },
  computed: {
    listenMenus () {
      return this.$store.state.user.menus
    }
  },
  watch: {
    listenMenus: {
      deep: true,
      immediate: true,
      handler (menus) {
        this.menus = _.cloneDeep(menus)
        // 如果当前没有菜单，则全屏展示content部分
        if (!this.menus.length) {
          this.$emit('full', true)
        } else {
          this.$emit('full', false)
        }
      }
    }
  },
  methods: {
    handleClick (menu) {
      let path = '/' + menu.keyPath.reverse().join('/')
      this.$router.push(path)
    }
  },
  render () {
    const menuProps = {
      mode: 'inline',
      theme: window.custom.menuTheme
    }

    const menuEvents = {
      click: this.handleClick
    }

    function renderMenus (menus) {
      return menus.map(menu => {
        if (menu.children && menu.children.length) {
          return (
            <a-sub-menu key={ menu.target }>
              <span slot="title">
                { menu.icon && <a-icon type={ menu.icon } /> }
                <span>{ menu.title }</span>
              </span>
              { renderMenus(menu.children) }
            </a-sub-menu>
          )
        } else {
          return (
            <a-menu-item key={ menu.target }>
              { menu.icon && <a-icon type={ menu.icon } /> }
              <span>{ menu.title }</span>
            </a-menu-item>
          )
        }
      })
    }

    return (
      <div class="menu-wrapper">
        <a-menu props={ menuProps } on={ menuEvents }>
          {renderMenus(this.menus)}
        </a-menu>
      </div>
    )
  }
}
</script>

<style lang="less" scoped>
  ::v-deep.ant-menu-inline{
    border: none;
    .ant-menu-item,
    .ant-menu-submenu-title{
      font-size: 15px;
    }
  }
</style>
