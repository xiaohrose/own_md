class Queue {

    stack = [];

    // 如队
    push(...item) {
        this.stack.push(...item)
    }

    // 出队
    pop() {
        return this.stack.pop();
    }

    isEmpty() {
        return !!this.stack.length;
    }

    first() {
        return this.stack.length ? this.stack[0] : undefined
    }

    size() {
        return this.stack.length;
    }

    peek() {

        return this.isEmpty() ? undefined : this.stack[this.size() - 1]
    }


}