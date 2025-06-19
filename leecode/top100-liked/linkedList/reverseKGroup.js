/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 * 
 * 反转2个的 抽象版本 swapPairs
 * 先反转前 K 个，然后递归反转
 */
var reverseKGroup = function(head, k) {
    if (!head) return null
    let a = head, b = head
    for (let i = 0; i < k; i++) {
        if (!b) return head
        b = b.next
    }
    const newHead = reverse(a, b)
    a.next = reverseKGroup(b, k)
    return newHead
};

var reverse = function(a, b) {
    let pre = null, cur = a, nxt = a;
    // while 终止的条件改一下就行了
    while (cur !== b) {
        nxt = cur.next;
        cur.next = pre;
        pre = cur;
        cur = nxt;
    }
    // 返回反转后的头结点
    return pre;
};