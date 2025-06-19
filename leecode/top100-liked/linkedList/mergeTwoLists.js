/**
 * https://leetcode.cn/problems/merge-two-sorted-lists/?envType=study-plan-v2&envId=top-100-liked
 * 合并两个有序链表
 * 核心考点：递归处理每一个部分 不过要注意的点是 合并 两个节点的顺序
 */

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function(list1, list2) {
    if (list1 === null) return list2
    if (list2 === null) return list1
    if (list1.val < list2.val) {
        list1.next = mergeTwoLists(list1.next, list2)
        return list1
    } else {
        list2.next = mergeTwoLists(list1, list2.next)
        return list2
    }
};

/**
 * 依次遍历两个链表 生成新的链表
 * @param {*} list1 
 * @param {*} list2 
 * @returns 
 */

var mergeTwoListsTwoPiont = function(list1, list2) {
    let dummy = new ListNode(-1), p = dummy
    let p1 = list1, p2 = list2
    while (p1 && p2) {
        if (p1.val > p2.val) {
            p.next = p2
            p2 = p2.next
        } else {
            p.next = p1
            p1 = p1.next
        }
        p = p.next
    }
    if (p1 != null) p.next = p1
    if (p2 != null) p.next = p2
    return dummy.next
}