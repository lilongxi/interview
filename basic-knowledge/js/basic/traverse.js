function depthFirstTraverse(root) {
    // console.log(root, root.tagName)
    // const c = root.childNodes
    // if (c.length) {
    //     c.forEach(node => {
    //         depthFirstTraverse(node)
    //     });
    // }
    const stack = []
    stack.push(root)
    while (stack.length) {
        const curNode = stack.pop()
        console.log(curNode.tagName)
        if (curNode == null) break
        const c = curNode.children
        if (c.length) {
            [...c].reverse().forEach(node => stack.push(node))
        }
    }
}

function breathFirstTraverse(root) {
    const queue = []
    queue.push(root)
    while (queue.length) {
        const curNode = queue.shift()
        printInfo(curNode);
        if (curNode == null) break
        const c = [...curNode.children]
        if (c.length) {
            c.forEach(node => {
                queue.push(node)
            })
        }
    }
}

// DOM 的 左右视图
const traverse = (ndRoot) => {
    const queue = [ndRoot], rightSide = [], leftSide = [];
    while (queue.length) {
       const length = queue.length
       rightSide.push(queue[queue.length - 1].className)
       leftSide.push(queue[0].className)
       for (let i = 0; i < length; i++) {
         const curNode = queue.shift()
         printInfo(curNode)
         if (curNode.children.length) {
            [...curNode.children].forEach(x => queue.push(x))
         }
       }
    }
    console.log(rightSide, leftSide)
};

const printInfo = (node) => {
    console.log(node.tagName, `.${node.className}`);
};

traverse(document.querySelector('.root'));
// breathFirstTraverse(document.querySelector('.root'))