const lowestCommonAncestor = function(root, p, q) {
    if (!root || root === p || root === q) return root
    const left = lowestCommonAncestor(root.left, p, q)
    const right = lowestCommonAncestor(root.right, p, q)
    // base case: p q 分别位于 root 左右两侧
    if (left && right) return root
    // 否则 p q 位于同一侧
    return left || right
}