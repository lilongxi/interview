/**
 * @param {number[][]} matrix
 * @return {number[]}
 * https://leetcode.cn/problems/spiral-matrix/?envType=study-plan-v2&envId=top-100-liked
 * 思路：
 * 镜像的二维矩阵： [[1,2,3],[4,5,6],[7,8,9]] -> [[1,4,7],[2,5,8],[3,6,9]]
 * 
 * 
 */

var rotate = function(matrix) {
    var n = matrix.length;
    // 先沿对角线镜像对称二维矩阵 横向坐标 和 纵向坐标交换
    for (var i = 0; i < n; i++) {
        for (var j = i; j < n; j++) {
            var temp = matrix[i][j];
            matrix[i][j] = matrix[j][i];
            matrix[j][i] = temp;
        }
    }
   // 然后反转二维矩阵的每一行
   for (var row of matrix) {
        reverse(row);
    }
    return matrix
};

var reverse = function(arr) {
    var i = 0, j = arr.length - 1;
    while (j > i) {
        // swap(arr[i], arr[j]);
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        i++;
        j--;
    }
}

console.log(rotate([[1,2,3],[4,5,6],[7,8,9]]))