<script>
import { generateOpenKeys } from '@/utils/menu'

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
    }
  },
  watch: {
    listenMenus: {
      deep: true,
      immediate: true,
      handler: function (menus) {
        this.menus = _.cloneDeep(menus)
        // 如果当前没有菜单，则全屏展示content部分
        if (!this.menus.length) {
          this.$emit('full', true)
        } else {
          this.$emit('full', false)
        }
      }
    },
    $route: {
      deep: true,
      immediate: true,
      handler: function (route) {
        this.handleUpdate()
      }
    }
  },
  methods: {
    handleClick (menu) {
      this.selectedKeys = [menu.key]
      this.$router.push(menu.path)
      this.$bus.$emit('onUpdateTab', menu)
    },
    handleOpen (openKeys) {
      this.openKeys = openKeys
    },
    handleUpdate () {
      let self = this
      let findCurrentMenu = function (menus) {
        menus.forEach(menu => {
          if (self.$route.fullPath === menu.path) {
            self.selectedKeys = [menu.key]
            // 动态计算openKeys
            self.openKeys = generateOpenKeys(menu.key)
          } else {
            if (menu.children && menu.children.length) {
              return findCurrentMenu(menu.children)
            }
          }
        })
      }
      findCurrentMenu(self.menus)
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
            <a-sub-menu key={ menu.key }>
              <span slot="title">
                { menu.icon && <a-icon type={ menu.icon } /> }
                <span>{ menu.title }</span>
              </span>
              { renderMenus(menu.children) }
            </a-sub-menu>
          )
        } else {
          return (
            <a-menu-item key={ menu.key } on={ { click: () => self.handleClick(menu) } }>
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
