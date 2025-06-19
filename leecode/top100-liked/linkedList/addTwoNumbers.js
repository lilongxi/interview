/**
 * https://leetcode.cn/problems/add-two-numbers/solutions/446483/liang-ge-shu-xiang-jia-zui-rong-yi-li-jie-de-jie-f/?envType=study-plan-v2&envId=top-100-liked
 * 考点：遍历两个链表 然后生成一个新的链表
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let node = new ListNode('0'), add = 0
    // 保留一份引用
    const head = node
    while (add || l1 || l2) {
        const total = ((l1 && l1.val) || 0) + ((l2 && l2.val)|| 0) + add
        add = total >= 10 ? 1 : 0
        node.next = new ListNode(total % 10)
        node = node.next
        if (l1) l1 = l1.next
        if (l2) l2 = l2.next
    }
    return head.next
};