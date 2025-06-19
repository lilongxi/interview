/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    const traverse = function(root) {
        if (root == null) return 

        // 每一个节点都调转 左右子树
        // const temp = root.left
        // root.left = root.right
        // root.right = temp
        
        // traverse(root.left)
        // traverse(root.right)

        const left = traverse(root.left)
        const right = traverse(root.right)

        root.left = right
        root.right = left

        return root

    }
    traverse(root)
    return root
};