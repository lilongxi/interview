/**
 * @param {string} s
 * @return {number}
 * https://leetcode.cn/problems/roman-to-integer/?envType=study-plan-v2&envId=top-interview-150
 */
var romanToInt = function(s) {

    const symbolValues = new Map();
    symbolValues.set('I', 1);
    symbolValues.set('V', 5);
    symbolValues.set('X', 10);
    symbolValues.set('L', 50);
    symbolValues.set('C', 100);
    symbolValues.set('D', 500);
    symbolValues.set('M', 1000);  

    let result = 0

    for (let i = 0; i < s.length; i++) {
        const val = symbolValues.get(s[i])
        const nextNum = s[i + 1]
        // 主要是边界判断
        if (nextNum && val < symbolValues.get(nextNum)) {
            result -= val
        } else {
            result += val
        }
    }

    return result

};

console.log(romanToInt('LVIII'))