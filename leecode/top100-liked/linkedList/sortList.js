/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 * https://leetcode.cn/problems/sort-list/?envType=study-plan-v2&envId=top-100-liked
 *  思路：数组的归并排序
 *  拆分：
 *  1. 拆借出链表的中点 类似获取数组的中间值
 *  2. 从中点断开后 分成左右两个链表
 *  3. 递归拆解 只剩下左右两个节点 比较大小 返回新的链表
 */
var sortList = function(head) {

    const mergeTwoLists = function(l1, l2) {
        const dummy = new ListNode(-1)
        let p1 = l1, p2 = l2, p = dummy
        while (p1 && p2) {
            if (p1.val < p2.val) {
                p.next = p1
                p1 = p1.next
            } else {
                p.next = p2
                p2 = p2.next
            }
            p = p.next
        }
        if (p1) p.next = p1
        if (p2) p.next = p2
        return dummy.next
    }

    const mergeSort = function(root) {
        if (!root || !root.next) return root
        let slow = root, fast = root.next
        while (fast && fast.next) {
            slow = slow.next
            fast = fast.next.next
        }
        // 右边节点
        const right = slow.next
        // 断开原节点
        slow.next = null
        // 左边节点
        const left = root
        return mergeTwoLists(mergeSort(right), mergeSort(left))
    }

    return mergeSort(head)
};