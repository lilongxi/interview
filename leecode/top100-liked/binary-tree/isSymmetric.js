/**
 * 镜像树核心考点：左子树的值 === 右子树的值
 * @param {*} root 
 * @returns 
 */

var isSymmetric = function(root) {
    const helper = function(left, right) {
        if (!left && !right) return true
        if (left && right) {
            return (
                left.val === right.val &&
                helper(left.left, right.right) &&
                helper(left.right, right.left)
            )
        }
        return false
    }
    return !root || helper(root.left, root.right)
}