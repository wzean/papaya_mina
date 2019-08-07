
const app = getApp();


Page({

  data: {
    post_id : null,
    text : null

  },

  onLoad: function (options) {
    console.log(options);
    this.setData({post_id:options.id});
  },
  set_text:function(e){
    console.log(e);
    this.setData({text:e.detail.value});
  },
  submit:function(e){
    wx.request({
      url: app.globalData.domain + '/mina_api/censor',
      data:{
        user_id:app.globalData.user_id,
        token:app.globalData.token,
        post_id:this.data.post_id,
        text:this.data.text
      },
      success:res=>{
        wx.navigateBack();
        wx.showToast({
          title: '提交成功!感谢您的反馈',
          duration:1500
        })
      }
    })
  }


  
})