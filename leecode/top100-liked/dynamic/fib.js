/**
 * 斐波那契数列 等价于 爬楼梯问题
 */

var fib = function(N) {
    if (N === 1 || N === 2) return 1;
    return fib(N - 1) + fib(N - 2);
};