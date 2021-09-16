const menu = [
  {
    name: '首页',
    target: 'home',
    activeRule: '',
    children: []
  },
  {
    name: '导航栏1',
    target: 'nav1',
    activeRule: '',
    children: [
      {
        name: '子导航栏1',
        target: 'subnav1',
        activeRule: '',
        children: [
          {
            name: '菜单1',
            target: 'menu1',
            activeRule: ''
          },
          {
            name: '菜单2',
            target: 'menu2',
            activeRule: ''
          },
          {
            name: '菜单3',
            target: 'menu3',
            activeRule: ''
          }
        ]
      },
      {
        name: '子导航栏2',
        target: 'subnav2',
        activeRule: '',
        children: []
      },
      {
        name: '子导航栏3',
        target: 'subnav3',
        activeRule: '',
        children: []
      },
      {
        name: '子导航栏4',
        target: 'subnav4',
        activeRule: '',
        children: []
      }
    ]
  }
]

export default menu
