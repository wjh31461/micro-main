const menu = [
  {
    title: '首页',
    icon: '',
    target: 'home',
    activeRule: '/micro/',
    children: []
  },
  {
    title: '导航栏1',
    icon: '',
    target: '',
    activeRule: '',
    children: [
      {
        title: '二级菜单1',
        icon: '',
        target: '',
        activeRule: '',
        children: [
          {
            title: '三级菜单1',
            icon: '',
            target: 'subMenu1',
            activeRule: '/micro/',
            children: []
          },
          {
            title: '三级菜单2',
            icon: '',
            target: 'subMenu2',
            activeRule: '/micro/',
            children: []
          },
          {
            title: '三级菜单3',
            icon: '',
            target: 'subMenu3',
            activeRule: '/micro/',
            children: []
          }
        ]
      },
      {
        title: '二级菜单2',
        icon: '',
        target: 'menu2',
        activeRule: '/micro/',
        children: []
      },
      {
        title: '二级菜单3',
        icon: '',
        target: 'menu3',
        activeRule: '/micro/',
        children: []
      },
      {
        title: '二级菜单4',
        icon: '',
        target: 'menu4',
        activeRule: '/micro/',
        children: []
      }
    ]
  },
  {
    title: '导航栏2',
    icon: '',
    target: 'nav2',
    activeRule: '/micro/',
    children: []
  }
]

export default menu
