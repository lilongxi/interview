/**
 * 
 * @param {*} url 
 * @returns 
 * 1. 正则匹配出 ？
 * 2. 根据 & 拆分所有变量
 * 3. 拆解 = 如果有则是 kv 否则记录成 boolean
 * 4. 匹配是否是数字 /^\d+$/
 * 5. 如果存在多个相同的 k 转成数组
 */
function parseParam(url) {
    const paramsStr = /.+\?(.+)$/.exec(url)[1]; // 将 ? 后面的字符串取出来
    const paramsArr = paramsStr.split('&'); // 将字符串以 & 分割后存到数组中
    const paramsObj = {};
    // 将 params 存到对象中
    paramsArr.forEach(param => {
      if (/=/.test(param)) { // 处理有 value 的参数
        let [key, val] = param.split('='); // 分割 key 和 value
        val = decodeURIComponent(val); // 解码
        val = /^\d+$/.test(val) ? parseFloat(val) : val; // 判断是否转为数字
        if (paramsObj.hasOwnProperty(key)) { // 如果对象有 key，则添加一个值
          paramsObj[key] = [].concat(paramsObj[key], val);
        } else { // 如果对象没有这个 key，创建 key 并设置值
          paramsObj[key] = val;
        }
      } else { // 处理没有 value 的参数
        paramsObj[param] = true;
      }
    })
    return paramsObj;
}

function checkIsChildObject(child, parent) {
  for (const key in child) {
    if (typeof child[key] === 'object' && typeof parent[key] === 'object') {
      // 如果属性是对象，递归调用检查子对象
      if (!checkIsChildObject(child[key], parent[key])) {
        return false;
      }
    } else if (child[key] !== parent[key]) {
      // 如果属性不是对象，检查值是否相等
      return false;
    }
  }
  return true;
}
