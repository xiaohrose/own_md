typescript 是 js 的类型系统。

why？

js 是动态类型，意味着在运行时可以随时修改变量中的值。当然数据类型也是可以随时变

what？
typescript 类型

基本类型
* 包含 js 的基本类型，string、number、boolean、undefined、null等等
* Object、object、{} 区别
* 字面量类型、基本类型、联合类型、枚举类型



how？



#### 类型断言相关问题
在开发时，会出现类型断言不成功，但也一直没有探其究竟。对类型一知半解。一个好的开发者，肯定不允许这种事发生。

其实之前经历类型断言不成功，其实是类型不能匹配导致，那如何才能使用类型断言呢？

* 使用ts类型断言的条件：
expr as T;

上面代码中，expr是实际的值，T是类型断言，它们必须满足下面的条件：expr是T的子类型，或者T是expr的子类型。

* 如果不满足上面的条件，又如何使用呢？
    可以先将需要的值断言成 unknown 然后在断言成想要的类型。
    ```
    // 或者写成 <T><unknown>expr
    expr as unknown as T;
    ```