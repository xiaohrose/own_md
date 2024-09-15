看了微信中分享的一片关于nginx 的文章，前端对于nginx 不是很熟悉，毕竟这个更偏向于后端，但对于日常和服务端进行沟通，学习一点 nginx 知识感觉还是挺有必要的，如果想全栈发展的话，对于学习 nginx 更是不可少的，所以想记录下关于 nginx 相关知识。

```
upstream nginx_boot{  
   # 30s内检查心跳发送两次包，未回复就代表该机器宕机，请求分发权重比为1:2  
   server 192.168.0.000:8080 weight=100 max_fails=2 fail_timeout=30s;   
   server 192.168.0.000:8090 weight=200 max_fails=2 fail_timeout=30s;  
   # 这里的IP请配置成你WEB服务所在的机器IP  
}  

server {  
    location / {  
        root   html;  
        # 配置一下index的地址，最后加上index.ftl。  
        index  index.html index.htm index.jsp index.ftl;  
        proxy_set_header Host $host;  
        proxy_set_header X-Real-IP $remote_addr;  
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;  
        # 请求交给名为nginx_boot的upstream上  
        proxy_pass http://nginx_boot;  
    }  
}  
```

刚接触一门新知识，需要不断熟悉 & 记忆。这个过程会存在一定的疑问，以下是记录：

* proxy_pass 这个代理到什么地方去， 以上一个实例，是代理到nginx_boot， 但为什么会这样，算是一个套路，就是这么写，有时候不能钻死理，没啥用。


### 反向代理
今天看node nest小册，学习的是 nginx， 想着怎么代理，感觉代理学会了，应该算学会了一部分nginx 吧，其他都是扯淡。下面是关于 nginx 反向代理的实例，实测！

```json
upstream my_server {                                                         
    server 192.168.0104:8899;                                                
    keepalive 2000;
}

server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;
    location /my/ {
        proxy_pass http://my_server/test;
        proxy_set_header Host $host:$server_port;
    }
}
```
`upstream` name 声明一个 `proxy_pass` 后面http://name,根据上面的实例，输入 `http://localhost:80/my/` 这就跳转到    `192.168.0.104:8899` 该服务下；注意/test 这个是8899 服务当中的`/test`路由。

注意⚠️： 在 跳转`/test`路由，尝试了很长时间，不知道   `/test`路由放在什么那里。这个下次再写





相关文章链接
` https://mp.weixin.qq.com/s/nf9Yif4DYqmUMvqxgI8Hvw`