//到今天没有碰到过手写promise函数的，但每次都会涉及 promise 相关问题，还有好几次没有完成过；归根结底都是因对promise底层不了解导致，所以很有必要完整手写一个

class MyPromise {

    static rejected = 'rejected'
    static fulfilled = 'fulfilled'
    static pendding = 'pendding'

    status = MyPromise.pendding
    fulfilledCallback = [];
    rejectedCallback = [];
    value = ''

    constructor(fn) {
        try {
            fn(this.resolve.bind(this), this.reject.bind(this))
        } catch (error) {
            this.reject(error)
        }
    }

    reject(value) {
        if (this.status !== MyPromise.pendding) return;
        this.status = MyPromise.rejected;
        this.value = value;

        this.rejectedCallback.forEach(callback => callback())
    }

    resolve(value) {
        if (this.status !== MyPromise.pendding) return;
        this.status = MyPromise.resolve;
        this.value = value;

        this.fulfilledCallback.forEach(callback => callback())
    }

    then(fulfilled = val => val, rejected = err => {
        throw err
    }) {

        let promise1 = new MyPromise((resolve, reject) => {
            if (this.status === MyPromise.rejected) {
                queueMicrotask(() => {
                    try {

                        const x = rejected(this.value);
                        this.resolve_promise(promise1, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })

                return
            }
            if (this.status === MyPromise.resolve) {
                queueMicrotask(() => {
                    try {

                        const x = fulfilled(this.value);
                        this.resolve_promise(promise1, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
                return
            }

            this.fulfilledCallback.push(() => {
                queueMicrotask(() => {
                    try {

                        const x = fulfilled(this.value);
                        this.resolve_promise(promise1, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            })


            this.rejectedCallback.push(() => {
                queueMicrotask(() => {
                    try {
                        const x = rejected(this.value);
                        this.resolve_promise(promise1, x, resolve, reject)
                    } catch (err) {
                        reject(err)
                    }
                })
            })

        })
        return promise1
    }

    resolve_promise(promise, x, resolve, reject) {

        if (promise === x) {
            reject(new Error('same promise'));
            return
        }

        if (typeof x === 'object' && x !== null || typeof x === 'function') {

            let called = false
            let then = x.then
            try {
                if (typeof then === 'function') {
                    then.call(x, res => {
                        if (called) return
                        called = true
                        this.resolve_promise(promise, res, resolve, reject)
                    }, err => {
                        reject(err)
                    })
                } else {
                    resolve(x)
                }


            } catch (err) {

                if (called) return
                called = true;
                reject(err)
            }



        } else {
            resolve(x)
        }


    }

}


const promise = new MyPromise(res => {
    setTimeout(res, 2000)
})
