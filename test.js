function test(l, m, n) {

    let head = {
        next: l,
    }

    p = head;
    for (let i = 0; i < m - 1; i++) {
        p = p.next;
    }

    let leftNode = p, pre = startNode = leftNode.next;
    let cur = pre.next;

    for (let i = 0; i < n - m; i++) {
        let next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }

    pre.next = left.next;
    startNode.next = cur;
}