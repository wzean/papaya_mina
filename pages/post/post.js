const app = getApp();
Page({
  data: {
    post:null,
    post_id:null,
    nodes:[],
    btn_text:"我来回答",
    canIanswer:true
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
        var dom = JSON.parse(res.data.body);
        console.log(dom);
        this.setData({post:res.data,nodes:dom});
      }
    });
    if(this.data.post.status == 3){this.setData({canIanswer:false});return;};
    if(this.data.post.user.id == app.globalData.user_id){
      this.setData({btn_text:"关闭问题"});
    }
  },
  answer:function(e){
    if (this.data.post.user.id == app.globalData.user_id){
      wx.request({
        url: app.globalData.domain + '/mina_api/close',
        data:{
          user_id:app.globalData.user_id,
          token:app.globalData.token,
          post_id:this.data.post_id
        },
        header:{
          "Content-Type": "application/json"
        },
        success:res=>{
          console.log(res);
          wx.showToast({
            title: '问题已关闭',duration:1500
          });
          wx.navigateBack();
        }
      })
    }else{
    wx.navigateTo({
      url:  '../reply/reply?post_id='+this.data.post.id
    });}
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