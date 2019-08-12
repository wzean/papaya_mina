# papaya_mina

## 2019.8.12
目前我已经完成了所有的踩坑工作，基本上所有的东西都做完了。
但是我不想再写一遍回答的部分了，各位依样画葫芦吧。

## Regrets
有一些遗憾

1. 虽然可以发图片了，但是还是很不爽，因为竟然不能回复。是不是应该可以回复？
![一张还算能看的示意图](demo.png)



## How to parse a dom?
参考微信相关文档和代码中的注释。
rich-text支持的是html元素而不是微信小程序内部的元素，名称和属性是不同的，详情参考文档:
[微信官方文档 rich-text](https://developers.weixin.qq.com/miniprogram/dev/component/rich-text.html)

具体的dom思路参考papaya_flask的[how_to.md](https://github.com/holazzer/papaya_flask/blob/v1/how_to.md)


### tips:
1. 解决自动换行的问题:在dom树的图片外面再套一层div
2. 使用\<br>进行换行，这是允许的
3. 使用\<hr>可以添加html式的分割线





另外注意:
1. 现在发回服务器的数据是stringified JSON,你在前端拿到之后，需要先parse一下,用来显示摘要，要不然就很难看了。
2. ...想到再说吧


