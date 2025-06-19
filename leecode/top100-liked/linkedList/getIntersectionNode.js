/**
 * https://leetcode.cn/problems/intersection-of-two-linked-lists/solutions/811625/xiang-jiao-lian-biao-by-leetcode-solutio-a8jn/?envType=study-plan-v2&envId=top-100-liked
 * 相交链表
 * 考点：链表遍历 + hastable
 * 思考：从headA开始走一遍过程中记录节点值，在从headB走一遍
 * @param {*} headA 
 * @param {*} headB 
 */

var getIntersectionNode = function(headA, headB) {
    const hashTable = new Set()
    let tmp = headA
    // 先搂一遍 链表A
    while (tmp !== null) {
        hashTable.add(tmp)
        tmp = tmp.next
    }
    tmp = headB
    // 再搂一遍 链表B
    while (tmp !== null) {
        if (hashTable.has(tmp)) return tmp
        tmp = tmp.next
    }
    return null
};

/**
 * 
 * @param {*} headA 
 * @param {*} headB 
 * 主要需要让两个链表一样长 所以需要 headA 遍历玩 遍历 headB 、headB 遍历玩 遍历 headA
 */
var getIntersectionNodeTwoPoint = function(headA, headB) {
    let p1 = headA, p2 = headB
    while (p1 !== p2) {
        p1 = !p1 ? headB : p1.next
        p2 = !p2 ? headA : p2.next
    }
    return p1
}