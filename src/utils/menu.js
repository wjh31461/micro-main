export function handleMenus (children, target) {
  let menus = []
  recursiveMenu(children, menus)
  return menus
}

function recursiveMenu (children, arr, key) {
  children.forEach((child, index) => {
    arr.push({
      title: child.title,
      icon: child.icon ? child.icon : 'table',
      path: child.activeRule ? child.activeRule + child.target : '',
      key: key ? key + '-' + (index + 1) : index + 1,
      children: []
    })
    // 当存在次级菜单，继续递归处理
    if (child.children && child.children.length) {
      recursiveMenu(child.children, arr[index].children, arr[index].key)
    }
  })
}
