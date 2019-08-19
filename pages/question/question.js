const app = getApp();

Page({

  data: {
    result_array:[],
    page:1,
    rq_url:null,
    kind:'new',
    total_pages:null
  },
  onLoad: function (options) {
    this.get_new();
  },
  get_new:function(e){
    this.setData({kind:'new',page:1});
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
        var pi = res.data.page_items;
        for (let i = 0; i < pi.length; i++) {
          if (pi[i].body.length > 30) {
            pi[i].body = pi[i].body.slice(0, 30) + '...';
          }
        }
        this.setData({ result_array: pi,total_pages:res.data.page });
      }
    })
  },
  get_hot: function (e) {
    this.setData({ kind: 'hot',page:1});
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
        var pi = res.data.page_items;
        for (let i = 0; i < pi.length; i++) {
          if (pi[i].body.length > 30) {
            pi[i].body = pi[i].body.slice(0, 30) + '...';
          }
        }
        this.setData({ result_array: pi, total_pages: res.data.page });
      }
    })
  },
  get_em: function (e) {
    this.setData({ kind: 'em',page:1 });
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
        var pi = res.data.page_items;
        for (let i = 0; i < pi.length; i++) {
          if (pi[i].body.length > 30) {
            pi[i].body = pi[i].body.slice(0, 30) + '...';
          }
        }
        this.setData({ result_array: pi, total_pages: res.data.page });
      }
    })
  },
  raise:function(){
    wx.navigateTo({
      url: '../raise_with_pic/raise_with_pic',
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
    if (this.data.page >= this.data.total_pages) { return; }
    wx.request({
      url: app.globalData.domain + '/mina_api/get_top',
      data: {
        user_id: app.globalData.user_id,
        token: app.globalData.token,
        page: this.data.page + 1,
        kind:this.data.kind
      },
      header: {
        "Content-Type": "application/json"
      },
      success: res => {
        console.log(res);
        //注意这里，是把新数据加到page_items的后面，而不是替换
        var pi = res.data.page_items;
        for (let i = 0; i < pi.length; i++) {
          if (pi[i].body.length > 30) {
            pi[i].body = pi[i].body.slice(0, 30) + '...';
          }
        }
        this.setData({ result_array: this.data.result_array.concat(pi) });
        /*  concat方法连接两个array，得到一个新的array，原来的array不变 */
        console.log(res);
        this.setData({ page: this.data.page + 1, total_pages: res.data.page });
      }
    });
  },

})