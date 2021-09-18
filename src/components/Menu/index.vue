<script>
export default {
  data () {
    return {
      menus: [],
      selectedKeys: [],
      openKeys: []
    }
  },
  computed: {
    listenMenus () {
      return this.$store.state.user.menus
    },
    listenSelectedKeys () {
      return this.$store.state.selected.menuSelectedKeys
    },
    listenOpenKeys () {
      return this.$store.state.selected.menuOpenKeys
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
    },
    listenSelectedKeys: {
      deep: true,
      immediate: true,
      handler (selectedKeys) {
        this.selectedKeys = _.cloneDeep(selectedKeys)
      }
    },
    listenOpenKeys: {
      deep: true,
      immediate: true,
      handler (openKeys) {
        this.openKeys = _.cloneDeep(openKeys)
      }
    }
  },
  methods: {
    handleClick (menu) {
      this.selectedKeys = [menu.target]
      this.$router.push(menu.path)
      this.$bus.$emit('onUpdateTab', menu)
      this.$store.commit('selected/SET_MENUSELECTEDKEYS', this.selectedKeys)
    },
    handleOpen (openKeys) {
      this.openKeys = openKeys
      this.$store.commit('selected/SET_MENUOPENKEYS', this.openKeys)
    }
  },
  render () {
    let self = this

    const menuProps = {
      mode: 'inline',
      theme: window.custom.menuTheme,
      selectedKeys: self.selectedKeys,
      openKeys: self.openKeys
    }

    const menuEvents = {
      openChange: self.handleOpen
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
            <a-menu-item key={ menu.target } on={ { click: () => self.handleClick(menu) } }>
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
