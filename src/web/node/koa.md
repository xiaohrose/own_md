### koa 中间件原理

中间件在前端框架当中使用很频繁，redux、koa、express等等，下面是 koa 的中间件使用：

#### use 的一般实现
```javascript
use (fn) {
    // 先将所有注册的中间件放到数组 middleWare 中
    this.middleWare.push(fn);
    return this;
}
```
#### listen 实现方式
```javascript
listen (...args) {
    /**
     * this.callback 返回个函数 (res, req) => {}
     * */
    const server = http.createServer(this.callback())

    server.listen(args)
}
```

callback 实现呢？看代码可以了解 返回的是一个方法，能处理req、和res 的函数。然后将这些数据给传递到中间件当中进行处理。
```javascript
callback () {
    // 注意当前调用 compose 没有传第二个参数；
    const fn  = this.compose(this.middleWare)           


    return function (req, res) {
        // 处理 res、req 头
        const ctx = this.createContext(req, res);
        // 将 ctx 和中间件函数 fn 传递给 this.handleRequest 方法
        return this.handleRequest(ctx, fn)
    }
}

```

```javascript
    handleRequest (ctx, fn) {

        const res = ctx.res;
        res.statusCode = 404;
        const onerror = err => ctx.onerror(err);
        // 框架内部逻辑，暂不关注
        const handleResponse = () => respond(ctx);
        // 将 ctx 对象传递给中间件函数 fnMiddleware
        return fnMiddleware(ctx).then(handleResponse).catch(onerror);

    }
```

中间件当中最重要的 compose 函数实现，当然这是一种实现方式，还有一种相对有意思的实现方式， reduce 也是可以实现的。
```javascript
  
// fns 代表中间件
function compose(fns) {

    return function (ctx, next) {


        let index = -1;
        return dispatch(0);


        function dispatch(i) {

            if (i <= index) return Promise.reject('called to much times!')
            index = i;

            let fn = fns[i];

            // 此时 fn 应该没有了， 所以讲 fn 赋值为 next ，第一次 next 为 null
            if (i === fns.length) fn = next;
            if (!fn) return Promise.resolve()

            try {
                // 这里传 dispatch 就相当于传了 fn[i + 1] 的方法；
                return Promise.resolve(fn(ctx, dispatch.bind(null, index + 1)))
            } catch (error) {
                return Promise.reject(error)
            }
        }
    }
}
```


总结：koa 内部通过中间件方式实现了拓展，也就是大家常讲的洋葱模型，当一个请求过来时，象一条流水线一样，先进过各个中间件处理请求，最终才返回给客户端。

候策《前端基础架构》小记