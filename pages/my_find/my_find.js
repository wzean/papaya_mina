const app = getApp();

Page({
  data: {page_items:[],
  page:1,
  domain:app.globalData.domain
  },

  onLoad: function (options) {
    wx.request({
      url: app.globalData.domain + '/mina_find/get_find_pagination', // common for get newest.
      data: {
        type: 'user',
        page: 1,
        user_id: app.globalData.user_id,
        token: app.globalData.token,
        find_user_id:app.globalData.user_id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: res => {
        console.log(res);
        this.setData({ items: res.data.items });
      }, fail: res => { console.log(res); }
    })
  },
  kill:function(e){
    console.log(e);
    wx.request({
      url: app.globalData.domain + '/mina_find/delete_via_id',
      data: {
        user_id: app.globalData.user_id,
        token: app.globalData.token,
        find_id: e.target.id
      }, header: {
        "Content-Type": "application/json"
      }, success: res => {
        console.log(res);
        wx.request({
          url: app.globalData.domain + '/mina_find/get_find_pagination',
          data: { type: 'user',
           user_id: app.globalData.user_id,
            token: app.globalData.token,
             page: this.data.page ,
             find_user_id:app.globalData.user_id
             },
          header: {
            "Content-Type": "application/json"
          },
          success: res => {
            console.log(res);
            wx.showToast({
              title: '删除成功',
              duration: 1500
            });
            this.setData({ page_items: res.data.items });
          }
        })
  }
    });
}}
);