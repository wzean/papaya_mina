const app = getApp();

Page({

  data: {
    result_array:[],
    page:1,
    rq_url:null
  },
  get_new:function(e){
    wx.request({
      url: app.globalData.domain + '/mina_api/get_top',
      data:{
        token:app.globalData.token,
        user_id:app.globalData.user_id,
        kind: 'new',
        page: this.data.page
      },
      header:{
        'content-type': 'application/json'
      },
      success:res=>{
        console.log(res);
        this.setData({ result_array: res.data.page_items });
      }
    })
  },
  get_hot: function (e) {
    wx.request({
      url: app.globalData.domain + '/mina_api/get_top',
      data: {
        token: app.globalData.token,
        user_id: app.globalData.user_id,
        kind: 'hot',
        page: this.data.page
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        this.setData({ result_array: res.data.page_items });
      }
    })
  },
  get_em: function (e) {
    wx.request({
      url: app.globalData.domain + '/mina_api/get_top',
      data: {
        token: app.globalData.token,
        user_id: app.globalData.user_id,
        kind: 'em',
        page:this.data.page
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        this.setData({ result_array: res.data.page_items });
      }
    })
  },
  raise:function(){
    wx.navigateTo({
      url: '../raise/raise',
    })
  },
  get_post: function (e) {
    console.log(e.currentTarget.id);
    //var id = e.id;
    wx.navigateTo({
      url: '../post/post?post_id=' + e.currentTarget.id
    })
  },
  onReachBottom: function () {
    
  },

})