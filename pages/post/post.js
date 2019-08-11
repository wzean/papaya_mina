const app = getApp();
Page({
  data: {
    post:null,
    post_id:null
  },
  onLoad: function (options) {
    console.log(options.post_id);
    this.setData({post_id:options.post_id});
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
  },
  censor:function(e){
    //举报
    console.log(e);
    wx.navigateTo({
      url: '../censor/censor?id=' + e.target.id
    })
    
  },
  like:function(e){
    console.log(e);

    wx.request({
      url: app.globalData.domain + '/mina_api/like',
      data:{
        token:app.globalData.token,
        user_id:app.globalData.user_id,
        post_id:e.target.id.split('.')[0]
      },
      success:res=>{
        post.page_items[Number(e.target.id.split('.')[1])].like_num += 1;
        wx.showToast({
          title: '点赞成功',duration:1500
        })
      }
    })
  }
})