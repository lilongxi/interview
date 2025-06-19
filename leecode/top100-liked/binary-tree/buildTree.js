/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 * https://leetcode.cn/problems/construct-binary-tree-from-preorder-and-inorder-traversal/?envType=study-plan-v2&envId=top-100-liked
 * 请根据二叉树的前序遍历，中序遍历恢复二叉树，并打印出二叉树的右视图
 */
var buildTree = function(preorder, inorder) {
    if (preorder.length === 0) return null
    if (preorder.length === 1) return new TreeNode(preorder[0])
    const head = preorder[0]
    const index = inorder.indexOf(head)
    const leftTree = inorder.slice(0, index)
    const rightTree = inorder.slice(index + 1)
    // 前序树 中间节点在第一个 也就是使用 index 往后推一个就是左右子树
    const pLeftTree = preorder.slice(1, index + 1)
    const pRightTree = preorder.slice(index + 1)
    const node = new TreeNode(head)
    node.left = buildTree(pLeftTree, leftTree)
    node.right = buildTree(pRightTree, rightTree)
    return node
};