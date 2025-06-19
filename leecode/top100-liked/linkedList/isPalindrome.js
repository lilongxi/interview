/**
 * https://leetcode.cn/problems/palindrome-linked-list/?envType=study-plan-v2&envId=top-100-liked
 * @param {*} head 
 * 
 * 解法2: 找到中间节点后 反转链表
 */

var isPalindromeStr = function(str) {
    let left = 0, right = str.length - 1
    while (left < right) {
        if (str[left] !== str[right]) return false
        left++
        right--
    }
    return true
}

var isPalindrome = function(head) {
    let str = ''
    while (head !== null) {
        str += head.val
        head = head.next
    }
    return isPalindromeStr(str)
};