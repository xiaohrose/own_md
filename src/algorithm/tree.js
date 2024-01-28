
function backTraveTree(root) {

    if (!root) return root;

    let stack = [root], res = [];

    while (stack.length) {


        const cur = stack.pop();


        res.unshift(cur.val);

        if (cur.left) {
            stack.push(cur.left)
        }

        if (cur.right) {
            stack.push(cur.right)
        }

    }

    return res;
}