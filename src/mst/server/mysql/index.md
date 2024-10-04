### 如何给表的某个字段建立索引
```
INDEX `card_id_idx` (`user_id`),
```
以上是INDEX 是建立索引，索引名是 card_id_idex，这个是用于加速 user_id 的访问的。

### 如何添加外键约束
```
 CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
 ```
 CONSTRINT user_id FOREIGN KEY 是给 user_id 添加一个外键约束，然后 user_id REFERENCES user id 则是指定 user_id 引用这 user 表的 id 列。