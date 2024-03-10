

function mergeSortNums(num1, num2, m, n) {

    let len = m + n - 1;
    let left = m - 1, right = n - 1;

    while (left >= 0 && right >= 0) {
        if (num1[left] > num2[right]) {
            num1[len--] = num1[left--];
        } else {
            num1[len--] = num2[right--]
        }
    }

    while (right >= 0) {
        num1[len--] = num2[right--]
    }

    return num1;
}

console.log(test([1, 2, 3, 0, 0, 0], [2, 5, 6], 3, 3))

/**
 *  不重复三数组合
 * @param {*} nums 
 * @param {*} target 
 * @returns 
 */

function threeSum(nums, target) {

    let res = [];
    if (!nums.length) return res;
    // 先排序

    nums = nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; i++) {
        let left = i + 1, right = nums.length - 1;

        if (i > 0 && nums[i] == [nums[i - 1]]) continue;

        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum > target) {
                right--
                while (left < right && nums[right] === nums[right - 1]) {
                    right--
                }
            } else if (sum < target) {
                left++
                while (left < right && nums[left] === nums[left + 1]) left++
            } else {
                res.push([nums[i], nums[left++], nums[right--]]);

                while (left < right && nums[left] == nums[left + 1]) left++;
                while (left < right && nums[right] == nums[right - 1]) right--;
            }
        }
    }

    return res;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4], 0));


// 两数求和
function twoSum(nums, target) {
    let map = {};

    for (let i = 0; i < nums.length; i++) {
        if (!map[target - nums[i]]) {
            map[nums[i]] = i;
        } else {
            return [map[target - nums[i]], i]
        }
    }
}

console.log(twoSum([2, 3, 4, 7], 10))