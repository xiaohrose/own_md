
/**
 * 最小路径和
 * 给定一个包含非负整数的 m x n 网格 grid ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 * 说明：每次只能向下或者向右移动一步。
 * @param {*} grid 
 * @returns 
 */
function minPathSum(grid) {
    let m = grid.length, n = grid[0].length;

    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));

    dp[0][0] = grid[0][0];

    for (let i = 1; i < m; i++) {
        // 这个循环代表的是第一列边界
        dp[i][0] = dp[i - 1][0] + grid[i][0];
    }

    // 这里为啥不是走2，而是走1呢？
    for (let j = 1; j < n; j++) {
        dp[0][j] = dp[0][j - 1] + grid[0][j];
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j]
        }
    }

    return dp[m - 1][n - 1]

}
// console.log(minPathSum([[1, 3, 1], [1, 5, 1], [4, 2, 1]]));

/**
 * 
 * @param {*} m 
 * @param {*} n 
 * @returns 
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。

 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

 * 问总共有多少条不同的路径？
 */

function uniquePaths(m, n) {
    // 其中 m 代表行， n 代表列

    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));

    // 为什么边界是第一行和第一列，并且都是赋值为1？
    for (let i = 0; i < m; i++) {
        dp[i][0] = 1;
    }
    for (let j = 0; j < n; j++) {
        dp[0][j] = 1;
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
        }
    }

    return dp[m - 1][n - 1]
}


function minCostClimbing(cost) {

    // 为什么需要length + 1；花了钱代表需要往上爬， 到顶是不需要花钱的，cost 的最后一个值是代表爬到最后的上一步
    let dp = new Array(cost.length + 1);

    dp[0] = 0;
    dp[1] = 0;

    for (let i = 2; i <= cost.length + 1; i++) {
        // 当前状态和上一个状态 + cost上一个值、 上两个 + cost 上两个状态有关；
        dp[i] = Math.min(dp[i - 2] + cost[i - 2], dp[i - 1] + cost[i - 1]);
    }

    return dp[cost.length];
}

/**
 * 打家劫舍
 */

function rot(nums) {

    let dp = new Array(nums.length);

    dp[0] = nums[0];
    dp[1] = Math.max(nums[0], nums[1]);

    for (let i = 2; i < nums.length; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);// 地推公式
    }

    return dp[nums.length - 1];
}


/**
 * @param {number[][]} triangle
 * @return {number}
 * 三角形最小路径
 */
var minimumTotal = function (triangle) {
    let m = triangle.length, n = triangle[triangle.length - 1].length;
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    // 这里取第一个数组中的第一个（三角形顶点只有一个元素）
    dp[0][0] = triangle[0][0];

    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + triangle[i][0];

        //  这里不是n，猜猜他是什么😂
        for (let j = 1; j < n; j++) {
            // 这里j = 1 的原因是上面已经把第一列数据已经计算
            dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j]
        }

        dp[i][i] = dp[i - 1][i - 1] + triangle[i][i]
    }
    console.log(dp)

    return Math.min(...dp[n - 1])

};

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]))