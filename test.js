/**
 * @param {number[][]} triangle
 * @return {number} 
 * 给定一个三角形 triangle ，找出自顶向下的最小路径和。

    每一步只能移动到下一行中相邻的结点上。相邻的结点 在这里指的是 下标 与 上一层结点下标 相同或者等于 上一层结点下标 + 1 的两个结点。也就是说，如果正位于当前行的下标 i ，那么下一步可以移动到下一行的下标 i 或 i + 1 。
    示例 1：

    输入：triangle = [[2],[3,4],[6,5,7],[4,1,8,3]]
    输出：11
    解释：如下面简图所示：
    2
    3 4
    6 5 7
    4 1 8 3
    自顶向下的最小路径和为 11（即，2 + 3 + 5 + 1 = 11）。
 * 动态规划的主要思想就是当前的问题是由前一个子问题而来的，所以子问题的最优解，就是影响当前解的东西
 */
var minimumTotal = function (triangle) {
    let m = triangle.length, n = triangle[triangle.length - 1].length;
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    dp[0][0] = triangle[0][0];

    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + triangle[i][0];
        for (let j = 1; j < i; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j]

        }

        dp[i][i] = dp[i - 1][i - 1] + triangle[i][i]
    }
    console.log(dp)

    return Math.min(...dp[n - 1])


};

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]))








function test (triangle) {

    let n = triangle.length, m = triangle[triangle.length - 1].length;
    let dp = new Array(n).fill(0).map(() => new Array(m).fill(0))

    dp[0][0] = triangle[0][0];

    for (let i = 1; i < n; i++) {

        dp[i][0] = dp[i-1][0] + triangle[i][0];
        
        for (let j = 0; j < m; j++) {


        }
    }

}

































