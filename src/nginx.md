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


相关文章链接
` https://mp.weixin.qq.com/s/nf9Yif4DYqmUMvqxgI8Hvw`