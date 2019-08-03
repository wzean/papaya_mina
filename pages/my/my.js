const app = getApp();

//提醒一下，这里面所有的查询，返回的都是分页的结果，每页20个，继续加载的我没有写，你们可以自行开发。

//todo:实现bingtap函数打开页面.
//todo:实现举报按钮。大家都喜欢。

//bug: 问题很大！这里面有一些并不是source的也出现在了问题里面。肯定时后端哪里出了问题。
//已经解决。filter对象一次只能写一个条件。

Page({
  data: {
    title:null,
    type:{"q":"问题","a":"回答","msg":"消息"},
    result_array:null,
    page:1
  },
  onLoad: function (options) {
    this.setData({title:this.data.type[options.type]});//拿到类型
    wx.request({
      url: app.globalData.domain +  '/mina_api/my',
      data: { type: options.type, user_id: app.globalData.user_id, token: app.globalData.token, page: this.data.page},
      header: {
        "Content-Type": "application/json"
      },
      success:res=>{
        console.log(res);
        this.setData({result_array:res.data.page_items});
      }
    })
  },
  get_post:e=>{
    console.log(e);
    wx.navigateTo({
      url: '../post/post?post_id=' + e.target.id
    })
  },
  delete_record:e=>{
    console.log(e);
    //我不建议实现删除功能。最好只有我们可以删除。
  }
  
})