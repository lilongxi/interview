/**
 * 
 * @param {*} nums 
 * @returns
 * 
 * 技巧题：
 * 把数字放到该索引位置：比如数字 4 就放到 nums[3] 的位置
 */

function findDuplicates(nums) {
    const result = []
    for (let i = 0; i < nums.length; i++) {
        const index = Math.abs(nums[i]) - 1
        if (nums[index] < 0) {
            result.push(Math.abs(nums[i]));
        } else {
            nums[index] = -nums[index]
        }
    }
    return result
}

const nums = [4, 3, 2, 7, 8, 2, 1, 1];
const duplicates = findDuplicates(nums);
console.log(duplicates);