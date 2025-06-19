
/**
 * https://leetcode.cn/problems/reverse-linked-list/solutions/551596/fan-zhuan-lian-biao-by-leetcode-solution-d1k2/?envType=study-plan-v2&envId=top-100-liked
 * @param {*} head 
 * 思考：用一个栈
 */
var reverseList = function(head) {
    const stack = []
    while (head !== null) {
        stack.push(head)
        head = head.next
    }
    let start = new ListNode(0, new ListNode(0));
    let tmp = start
    while (stack.length) {
        tmp.next = stack.pop()
        tmp = tmp.next
    }
    tmp.next = null
    return start.next
};

