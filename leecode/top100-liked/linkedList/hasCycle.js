/**
 * https://leetcode.cn/problems/linked-list-cycle/?envType=study-plan-v2&envId=top-100-liked
 * 1. 快慢指针
 * 2. 打标
 */


var hasCycle = function(head) {
    if (!head || !head.next) return false
    let slow = head
    let fast = head.next
    while (slow !== fast) {
        if (!fast || !fast.next) return false
        slow = slow.next
        fast = fast.next.next
    }
    return true
};

var hasCycle2 = function(head) {
    if (!head || !head.next) return false
    while (head !== null) {
        if (head.in) return true
        head.in = true
        head = head.next
    }
    return false
}

var hasCycle3 = function(head) {
    let slow = head, fast = head
    while (fast && fast.next) {
        slow = slow.next
        fast = fast.next.next
        if (slow === fast) return true
    }
    return false
}