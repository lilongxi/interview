/**
 * page87
 * https://leetcode.cn/problems/minimum-window-substring/?envType=study-plan-v2&envId=top-100-liked
 * 最小覆盖子串
 * 1.  什么时候移动 right 扩大窗口 窗口扩大时更新哪些数据
 * 2.  什么时候窗口暂停扩大 移动 left 缩小窗口 窗口移出的时候 应该更新什么
 * 3.  结果应该在扩大窗口 还是 缩小窗口的时候进行更新
 */

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */

var minWindow = function(s, t) {
    let window = {},need = {};
    //计算需要的字符串词频
    for(const c of t){
        need[c] = (need[c] || 0) + 1;
    }
    let left = 0, right = 0, minLen = Number.MAX_SAFE_INTEGER, valid = 0, start = 0;
    const len = s.length,keyLen = Object.keys(need).length;
    while(right < len){

        const c = s.charAt(right++);
        window[c] = (window[c] || 0) + 1; //计算词频
        if(window[c] === need[c]) valid++;//满足匹配的字母又多一个
        // 当窗口满足字符串 t 的时候开始缩小
        while(keyLen === valid){ //当满足匹配时先记录起始点和长度，然后再不断收缩
            // 更新最小子串长度： right右区间 right - left 完成缩小窗口的操作
            // 最后完成的就是 s 包含 t 的最小字符串区间
            if(right - left < minLen){
                start = left;
                minLen = right - left;
            }

            const c = s.charAt(left++);
            if(window[c]-- === need[c]) valid--; //又不满足了
        }
    }

    return minLen < Number.MAX_SAFE_INTEGER ? s.substring(start, start + minLen) : ""

};

console.log(minWindow('ADOBECODEBANC', 'ABC'))
