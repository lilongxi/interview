/*
 * @Author: leelongxi leelongxi@foxmail.com
 * @Date: 2025-05-25 20:42:52
 * @LastEditors: leelongxi leelongxi@foxmail.com
 * @LastEditTime: 2025-05-25 20:50:19
 * @FilePath: /interview-coding/basic-knowledge/react/diff/d1.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
type VNode = {
  key: string
  tag: string | null
  props: { [key: string]: any }
}

// 比较类型和props 替换节点和属性
function diffNode (oldNode: VNode, newNode: VNode) {
  if (oldNode.tag !== newNode.tag) {
    return {
      type: 'replace',
      node: newNode
    }
  }
  const patchs: Record<string, any> = {}

  for (const key in newNode.props) {
    if (newNode.props[key] !== oldNode.props[key]) {
      patchs[key] = newNode.props[key]
    }
  }

  for (const key in oldNode.props) {
    if (!newNode.props.hasOwnProperty(key)) {
      patchs[key] = null
    }
  }

  if (Object.keys(patchs).length > 0) {
    return {
      type: 'patch',
      patchs
    }
  } else {
    return null
  }

}

// 通过 key 来对齐位置，处理增删改/移动	
function diffChildren (oldChildren: VNode[], newChildren: VNode[]) {
  const oldMap = new Map(oldChildren.map((item, index) => [item.key, { item, index }]));
  const patchs: any[] = []; 

  newChildren.forEach((newNode, index) => {
    const oldNode = oldMap.get(newNode.key);
    if (!oldNode) {
      patchs.push({
        type: 'insert',
        node: newNode,
        at: index
      })
    } else if (oldNode.item.tag !== newNode.tag) {
      patchs.push({
        type: 'replace',
        node: newNode,
        at: index
      })
    } else if (oldNode.index !== index) {
      patchs.push({
        type: 'move',
        from: oldNode.index,
        to: index
      })
    }
  })

  oldChildren.forEach((oldNode, index) => {
    if (!newChildren.find((newNode) => newNode.key === oldNode.key)) {
      patchs.push({
        type: 'remove',
        at: index
      })
    }
  })
  return patchs

}