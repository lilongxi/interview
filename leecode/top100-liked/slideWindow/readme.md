滑动窗口框架 page85
考点：找到缩小窗口的条件
# https://labuladong.github.io/algo/di-ling-zh-bfe1b/hui-su-sua-56e11/

```js
let left = 0, right = 0
while (right < s.length) {
    // 增加窗口
    window.add(s[right])
    right++

    while (window needs shrink) {
        window.remove(s[left])
        left++
    }

}
```