/**
 * @param {number[][]} triangle
 * @return {number}
 */
var minimumTotal = function (triangle) {
    let m = triangle.length, n = triangle[triangle.length - 1].length;
    let dp = new Array(m).fill(0).map(() => new Array(n).fill(0));
    dp[0][0] = triangle[0][0];

    for (let i = 1; i < m; i++) {
        dp[i][0] = dp[i - 1][0] + triangle[i][0];
        for (let j = 1; j < n; j++) {
            dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j - 1]) + triangle[i][j]

        }

        dp[i][i] = dp[i - 1][i - 1] + triangle[i][i]
    }
    console.log(dp)

    return Math.min(...dp[n - 1])


};

console.log(minimumTotal([[2], [3, 4], [6, 5, 7], [4, 1, 8, 3]]))