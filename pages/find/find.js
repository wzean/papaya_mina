const app = getApp();
/*
get_find_universal: (type, page, kw, fuid) => {
    wx.request({
      url: app.globalData.domain + '/mina_find/get_find_pagination', // common for get newest.
      data: {
        type: type,
        page: page,
        user_id: app.globalData.user_id,
        token: app.globalData.token,
        keyword: kw,
        find_user_id: fuid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        this.setData({ items: res.data.items, page: res.data.page });
      }, fail: res => { console.log(res); }
    })
  }
  
*/

Page({
  data: {
    items:[],
    page:1,
    domain: app.globalData.domain,
    type:'common',
    total_pages:null
  }, 
  onLoad: function (options) {
    wx.request({
      url: app.globalData.domain + '/mina_find/get_find_pagination', // common for get newest.
      data: {
        type: 'common',
        page: 1,
        user_id: app.globalData.user_id,
        token: app.globalData.token
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res);
        this.setData({ items: res.data.items , total_pages:res.data.pages});
      }, fail: res => { console.log(res); }
    })
  },
  get_find:function(e){
    if(e.detail.value==''){this.setData({type:'common'});this.onLoad();return;};
    var kw = e.detail.value;
    console.log(e);
    this.setData({type:'keyword'});//used for reach bottom event.
    wx.request({
      url: app.globalData.domain + '/mina_find/get_find_pagination', // common for get newest.
      data: {
        type: 'keyword',
        page: 1,
        user_id: app.globalData.user_id,
        token: app.globalData.token,
        keyword: kw,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res);
        this.setData({ items: res.data.items, total_pages: res.data.pages });
      }, fail: res => { console.log(res); }
    });
    
  },
  add_find:e=>{
    wx.navigateTo({
      url: '../add_find/add_find'
    })
  },
  onShow:function(){
    this.onLoad();
  },
  onReachBottom:function(){
    if (this.data.page >= this.data.total_pages) { return; }
    if (this.data.type == 'common'){
      wx.request({
        url: app.globalData.domain + '/mina_find/get_find_pagination', // common for get newest.
        data: {
          type: 'common',
          page: this.data.page + 1,
          user_id: app.globalData.user_id,
          token: app.globalData.token
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          console.log(res);
          this.setData({ items: this.data.items.concat( res.data.items) ,page:this.data.page+1});
        }, fail: res => { console.log(res); }
      })
    }else if(this.data.type=='keyword'){
      wx.request({
        url: app.globalData.domain + '/mina_find/get_find_pagination', // common for get newest.
        data: {
          type: 'keyword',
          page: this.data.page + 1,
          user_id: app.globalData.user_id,
          token: app.globalData.token,
          keyword: kw,
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        success: res => {
          console.log(res);
          this.setData({ items: this.data.items.concat( res.data.items ), total_pages: res.data.pages ,page:this.data.page+1 });
        }, fail: res => { console.log(res); }
      });

    }
  }

})


