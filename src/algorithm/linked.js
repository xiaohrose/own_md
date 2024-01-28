const reverseLine = l1 => {

    let cur = l1;
    let pre = null;

    while (cur) {
        l1.next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = l1.next;
    }

    return l1
}

/**
 * 局部反转链表
 * @param {*} l1 
 * @param {*} m 
 * @param {*} n 
 * @returns 
 */
const partRevese = (l1, m, n) => {

    let head = {
        val: '',
        next: l1
    }

    let p = head;

    for (let i = 0; i < m - 1; i++) {
        p = p.next;
    }

    let leftIndex = p;
    let start = p.next;
    let pre = start;
    let cur = pre.next;

    for (let i = m; i < n; i++) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
    // 最左边的节点连接pre节点
    leftIndex.next = pre;
    // 最右边的节点cur 被最开始start连接
    start.next = cur;

    return head.next;
}