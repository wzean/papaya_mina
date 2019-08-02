const app = getApp();

//提醒一下，这里面所有的查询，返回的都是分页的结果，每页20个，继续加载的我没有写，你们可以自行开发。

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
        this.setData({result_array:res.data.result});
      }
    })
  }
  
})