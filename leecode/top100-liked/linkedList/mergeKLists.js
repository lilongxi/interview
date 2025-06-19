/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 * https://leetcode.cn/problems/merge-k-sorted-lists/
 * 思路：首先链表数组是升序的 
 * 1. 使用二分把链表数组依次拆开
 * 2. 两两合并
 * 3. base case 当 left 和 right 相遇的时候 就返回链表
 */
var mergeKLists = function(lists) {

    if (!lists.length) return null

    const mergeTwoLists = function(l1, l2) {
        if (!l1) return l2
        if (!l2) return l1
        if (l1. val < l2.val) {
            l1.next = mergeTwoLists(l1.next, l2)
            return l1
        } else {
            l2.next = mergeTwoLists(l1, l2.next)
            return l2
        }
    }

    const merge = function(left, right) {
        // base casee
        if (left >= right) return lists[left]
        const midd = (left + right) >> 1
        const l1 = merge(left, midd)
        const l2 = merge(midd + 1, right)
        return mergeTwoLists(l1, l2)
    }

    return merge(0, lists.length - 1)

};