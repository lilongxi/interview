/**
 * https://leetcode.cn/problems/linked-list-cycle-ii/solutions/441131/huan-xing-lian-biao-ii-by-leetcode-solution/?envType=study-plan-v2&envId=top-100-liked
 * 考点
 */

const detectCycle = function(head) {
    const set = new Set()
    while (head) {
        if (set.has(head)) return head
        set.add(head)
        head = head.next
    }
    return null
}

const detectCycleTwoPoint = function(head) {
    let slow, fast
    slow = fast = head
    while (fast && fast.next) {
        fast = fast.next.next
        slow = slow.next
        if (slow === fast) break
    }
    if (!fast || !fast.next) return null
    slow = head
    while (slow !== fast) {
        fast = fast.next
        slow = slow.next
    }
    return slow
}