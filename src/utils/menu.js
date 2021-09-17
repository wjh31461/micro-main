export function handleMenus (children, target) {
  let menus = []
  recursiveMenu(children, target, menus)
  return menus
}

function recursiveMenu (children, target, arr) {
  children.forEach((child, index) => {
    let path
    if (target) {
      path = `${target}/${child.target}`
    } else {
      path = `${child.target}`
    }
    if (child.activeRule) {
      path += child.activeRule
    }
    arr.push({
      title: child.title,
      icon: child.icon ? child.icon : 'table',
      target: child.target,
      path: path,
      children: []
    })
    // 当存在次级菜单，继续递归处理
    if (child.children && child.children.length) {
      recursiveMenu(child.children, target ? target + '/' + child.target : child.target, arr[index].children)
    }
  })
}
