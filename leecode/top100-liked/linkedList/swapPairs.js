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
 */
var swapPairs = function(head) {
    if (!head || !head.next) return head
    // 每次都把前两个链表交换位置
    let firstHead = head
    let secondHead = head.next
    let thridHead = head.next.next
    // 交换 第一个 和 第二个
    secondHead.next = firstHead
    // 第二个开始递归依次交换
    firstHead.next = swapPairs(thridHead)
    return secondHead
};