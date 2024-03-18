// 一直对promise 不够熟悉，虽然对于大部分api 使用相当数量，但是本质上面还是有一定生疏，所以，这次借这次对于promise 的实现，进一步了解promise的特性
class Mypromise {

    Fn = [];

    static FULLFILLED = 'fullfilled'
    static REJECTED = 'rejected'
    static PENDING = 'pending'
    status = Mypromise.PENDING;

    static resolve() { }

    static reject() { }

    value = ''
    constructor(fn) {

        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    reject(error) {
        if (this.status !== Mypromise.PENDING) return;

        this.status = Mypromise.REJECTED;
        this.value = error;
        this.Fn.forEach(item => this._handle(item));
    }

    resolve(value) {
        if (this.status !== Mypromise.PENDING) return

        if (value && (typeof value === 'function' || typeof value === 'object')) {
            let then = value.then || value

            if (typeof then === 'function') {
                // 这里是要将改变状态的函数传递下去，所以直接return
                then.call(value, reolve, reject);
                return;
            }
        }

        this.status = Mypromise.FULLFILLED;
        this.value = value;

        this.Fn.forEach(item => this._handle(item))
    }

    then(fn1 = () => { }, fn2 = () => { }) {
        let promise = new Mypromise((resolve, reject) => {

            if (this.status === Mypromise.FULLFILLED) {
                resolve(fn1(this.value))
                return
            }

            if (this.status === Mypromise.REJECTED) {
                reject(fn2(this.value))
                return
            }

            this.Fn.push({
                fullfilled: fn1,
                rejected: fn2,
                resolve,
                reject
            })
        })

        return promise
    }

    catch() { }


    _handle(callback) {
        if (this.status === Mypromise.PENDING) {
            this.Fn.push(callback);
            return;
        }
        // 这里如果then 中传入了成功或者失败需要执行的函数，那么就执行函数，如果没有，就将 value 值传递给resolve或者reject函数。
        let cb = this.status === Mypromise.FULLFILLED ? callback.fullfilled:callback.rejected;
        let value = this.value
        if (cb) {
            value = cb(this.value)
        }

        cb = this.status === Mypromise.FULLFILLED?callback.resolve:callback.reject;
        cb(value)
    }

}


(new Mypromise((resolve, reject) => {
    console.log('hello')

    setTimeout(() => resolve('heloo'))
})).then(res => {
    console.log(res);
})


function handleResolvePromise(result, reject, resolve) {

}



// all allsettled race any resolve reject withrosolver finnally then catch
