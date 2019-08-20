const app = getApp();

var util = require('../../utils/util.js');


Page({
  data: {
    post:null,
    post_id:null,
    nodes:[],
    btn_text:"我来回答",
    canIanswer:true,
    q_links:null
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
        console.log(res);
        const dom = JSON.parse(res.data.dom);
        // parse dom for question
        var nodes = util.parseDom(dom);
        var q_links = nodes[1];
        nodes = nodes[0];
        console.log(nodes);
        // parse every answer
        var postData = res.data;
        console.log(postData);
        var ok = null;
        for(let i = 0;i<postData.replies.length;i++){
          ok = util.parseDom(JSON.parse(postData.replies[i].dom));
          postData.replies[i].dom = ok[0];
          postData.replies[i].links = ok[1];
        }
        this.setData({post:postData,nodes:nodes,q_links:q_links});
        if (this.data.post.status == 3 && app.globalData.status < 8) { this.setData({ canIanswer: false }); return; };
        if (this.data.post.user.id == app.globalData.user_id) {
          this.setData({ btn_text: "关闭问题" });
        }
      }
    });
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
        var p = this.data.post
        p.replies[Number(e.target.id.split('.')[1])].like_num += 1;
        this.setData({post:p});
        wx.showToast({
          title: '点赞成功',duration:1500
        })
      }
    })
  },
  reply:function(e){
    console.log(e);
    //回复看来不重写是不行了
  },
  see_link:function(e){
    console.log(e.target.id);

    wx.navigateTo({
      url: '../link/link?url='+e.target.id.slice(27,)
    })
  }
})