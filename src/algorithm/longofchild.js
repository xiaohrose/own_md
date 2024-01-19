
/**
 * 最长子序列
 */

function longzixulie(nums) {

    const dp = new Array(nums.length).fill(1)


    for (let i = 1; i < nums.length; i++) {

        for (let j = i - 1; j >= 0; j--) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }

    return Math.max(...dp)
}