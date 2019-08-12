
const app = getApp();

Page({

  data: {
    post_id:null,
    reply:null
  },

  onLoad: function (options) {
    
    this.setData({post_id:Number(options.post_id)});
    console.log(this.data.post_id);
  },
  get_reply:function(e){
    console.log(e);
    this.setData({reply:e.detail.value});
  }
  ,
  submit:function(e){
    wx.request({
      url: app.globalData.domain + '/mina_api/reply',
      data:{
        token:app.globalData.token,
        user_id:app.globalData.user_id,
        post_id:this.data.post_id,
        body:this.data.reply
      },
      header: { "Content-Type": "application/json"},
      success:res=>{
        console.log(res);
        wx.navigateBack();
        wx.showToast({
          title: '回答成功',
          duration:1500
        })
      }
    })
  }

})


