function beibao(n, c, w, value) {


    const dp = new Array();

    for (let i = 0; i < n; i++) {
        for (let v = w[i]; v <= c; v++) {
            dp[i][v] = Math.max(dp[i - 1][v], dp[i - 1][v - w[i]] + value[i])
        }
    }

}