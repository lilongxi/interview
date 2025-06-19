/**
 * https://leetcode.cn/problems/implement-trie-prefix-tree/solutions/717239/shi-xian-trie-qian-zhui-shu-by-leetcode-ti500/?envType=study-plan-v2&envId=top-100-liked
 */

var Trie = function() {
    this.children = {}
};

/** 
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    let node = this.children
    for (const char of word) {
        if (!node[char]) node[char] = {}
        // 每次都往 children 的子节点写入新的 对象
        node = node[char]
    }
    // 每个单词迭代完成后记录结束
    node.isEnd = true
};

Trie.prototype.searchPrefix = function(prefix) {
    let node = this.children
    for (const char of prefix) {
        if (!node[char]) return false
        node = node[char]
    }
    return node
}

/** 
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    const node = this.searchPrefix(word)
    return node !== undefined && node.isEnd !== undefined
};

/** 
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    return this.searchPrefix(prefix)
};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */

const trie = new Trie();
trie.insert("apple");

console.log(trie)