const app = getApp();
Page({
  data: {
    post:null

  },
  onLoad: function (options) {
    console.log(options.post_id);
    wx.request({
      url: app.globalData.domain + '/mina_api/get_post',
      data:{
        token:app.globalData.token,
        user_id:app.globalData.user_id,
        post_id:options.post_id
      },
      success:res=>{
        console.log(res.data);
        this.setData({post:res.data});
      }
    })
  },
  answer:function(e){
    wx.navigateTo({
      url:  '../reply/reply?post_id='+this.data.post.id
    })
  }
})