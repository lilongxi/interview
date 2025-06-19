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
 * https://leetcode.cn/problems/remove-duplicates-from-sorted-list/
 */
var deleteDuplicates = function(head) {
    if (!head) return null
    let slow = head, fast = head
    while (fast) {
        if (slow.val !== fast.val) {
            // nums[slow] = nums[fast]
            slow.next = fast
            // slow++
            slow = slow.next
        }
        // fast++
        fast = fast.next
    }
    slow.next = null
    return head
};