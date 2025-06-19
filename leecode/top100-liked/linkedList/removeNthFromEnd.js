/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 * 
 * 考点：通过快慢指针 计算后移的 n 个 位置
 */
var removeNthFromEnd = function(head, n) {
    const dumy = new ListNode('0', head)
    let slow = dumy, fast = dumy
    while (n-- > 0) fast = fast.next
    // 当 fast 走到头 slow 就是第n个了
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next
    }
    // 跳过第 n 个节点
    slow.next = slow.next.next
    return dumy.next
};

// 单链表倒数第K个
var findFromEnd = function(head, k) {
    let slow = head, fast = head
    while (k-- > 0) fast = fast.next
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next
    }
    return slow
}