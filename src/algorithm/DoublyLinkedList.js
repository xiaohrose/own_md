class Node {
    constructor(data) {
        this.data = data;
        this.pre = null;
        this.next = null;
    }
}


class DoublyLinkedList {
    constructor() {
        this.head = new Node('head');
        this.tail = this.head;
    }


    // 添加
    add(item) {
        const node = new Node(item);
        node.pre = this.tail;
        this.tail.next = node;
        this.tail = node;
    }

    addAt(item, index) {
        const node = new Node(item)
        let current = this.head.next;
        let count = 0;
        while (count <= index && current) {
            if (count === index) {
                node.next = current
                current.pre = node;
                node.pre = current.pre;
                current.pre.next = node
            }
            current = current.next;
            count++;
        }
    }

    remove(item) {

        // 这里需要考虑中间和尾部两种情况
        let current = this.head.next;

        while (current) {
            if (this.tail.data === item) {// 这代表当前的尾部要删除

                this.tail = this.tail.pre;
                this.tail.next = null;
            }
            else if (current.data === item) {
                // 这里挺有意思的，可以想象
                current.next.pre = current.pre;
                current.pre.next = current.next;
            }

            current = current.next;
        }
    }

    removeAt(index) {

        let current = this.head.next;
        let count = 0;

        while (current) {

            if (index == count) {
                current.next.pre = current.pre;
                current.pre.next = current.next;
                return true
            }

            current = current.next;
            count++

        }

        return false
    }


    reverse() {
        let current = this.head.next;
        let pre = null;

        while (current) {
            let next = current.next;


            current.next = pre;
            current.pre = next;
            pre = current;

            current = current.next;
        }

        // 之前的头给到 tail，现在的头的。next 为 pre
        this.tail = this.head.next;
        this.head.next = pre;
    }

    length() {
        let count = 0;
        let current = this.head.next;

        while (current) {

            current = current.next;
            count++
        }

        return count
    }

    // 遍历链表
    taverse(fn) {

        let current = this.head.next;

        while (current) {
            fn(current);
            current = current.next;
        }

        return true;
    }

    swap(index1, index2) {

        if (index1 > index2) {
            return this.swap(index2, index1);
        }

        let firstNode = null, current = this.head.next, count = 0;

        while (current) {
            if (count === index1) {
                firstNode = current
            }

            if (count === index2) {

                // 这里为嘛要换节点呢？直接换数据不是更好？😂

                let temp = current.data;
                current.data = firstNode.data;
                firstNode.data = temp

                return true
            }

            current = current.next;
            count++

        }

        return false
    }

    find(index) {


        let count = 0;
        let current = this.head.next;

        while (current) {

            if (count === index) {
                return current.data;
            }

            current = current.next;
            count++
        }

        return false;
    }
}


