// 一直对promise 不够熟悉，虽然对于大部分api 使用相当数量，但是本质上面还是有一定生疏，所以，这次借这次对于promise 的实现，进一步了解promise的特性

// 这个手写不错，借鉴
// 加油！！！
class Mypromise {

    Fn = [];

    static FULLFILLED = 'fullfilled'
    static REJECTED = 'rejected'
    static PENDING = 'pending'
    status = Mypromise.PENDING;

    static resolve () {}

    static reject () {}

    value = ''
    constructor (fn) {

        try {
            fn(this.resolve.bind(this), this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    reject () {}

    resolve(value) {
       
            if (this.status !== Mypromise.PENDING) return

            this.status = Mypromise.FULLFILLED;
            this.value = value;

            this.Fn.forEach(callback => {
                callback()
            })
    }

    then (fn1 = () => {}, fn2 = () => {}) {
       let promise = new Mypromise((resolve, reject) => {

            if (this.status === Mypromise.FULLFILLED) {
                resolve(fn1(this.value))
                return
            }

            if (this.status === Mypromise.REJECTED) {
                reject(fn2(this.value))
                return
            }

            this.Fn.push(() => {
                if (this.status == Mypromise.FULLFILLED) {
                    this.resolve(fn1(this.value))
                }else {
                    this.reject(fn2(this.value))
                }

            })
        })

        return promise
    }

    catch () {}

}


(new Mypromise((resolve, reject) => {
    console.log('hello')

    setTimeout(() => resolve('heloo'))
})).then(res => {
    console.log(res);
})




// all allsettled race any resolve reject withrosolver finally then catch
