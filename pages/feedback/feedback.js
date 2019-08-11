const app = getApp();


Page({

  data: {
    type:'bug',
    text:null
  },

  onLoad: function (options) {

  },
  get_type:function(e){
    console.log(e);
    this.setData({type:e.target.id})
  },
  get_text:function(e){
    console.log(e);
    this.setData({text:e.detail.value})
  },
  commit:function(e){
    console.log(e);
    wx.request({
      url: app.globalData.domain + '/mina_api/feedback',
      data:{
        user_id:app.globalData.user_id,
        token:app.globalData.token,
        type:this.data.type,
        text:this.data.text
      },
      success:res=>{
        console.log(res);
        wx.showToast({
          title: '反馈成功!',duration:1500
        });
        wx.navigateBack();
      }
    })
  }
})