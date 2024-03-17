
function test (n) {
    if(!n)return ''

    let res = []

    _dfs(n, n, '');

    return res

    function _dfs (left, right , result ) {

        if (left === 0 && right === 0) {

            return res.push(result);
        }


        if (left > 0) {
            _dfs(left - 1, right, result + '(');
        }

        if (right > left) {
            _dfs(left, right - 1, result + ')')
        }
    }

}




console.log(test(15))
