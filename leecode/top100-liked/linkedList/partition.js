/**
 * https://leetcode.cn/problems/partition-list/
 * 单链表的分解：遍历一个大链表 然后基于 x 生成小于x的链表1 和 大于x的链表2
 */

var partition = function(head, x) {

    let dummy1 = new ListNode(-1), dummy2 = new ListNode(-1)
    let p1 = dummy1, p2 = dummy2
    while (head) {
        if (head.val >= x) {
            p2.next = head
            p2 = p2.next
        } else {
            p1.next = head
            p1 = p1.next
        }
        // 直接向后移动
        head = head.next

        // 断开原链表中的每个节点的 next 指针
        // let temp = head.next
        // head.next = null
        // head = temp
    }
    p1.next = dummy2.next
    return dummy1.next
}