const app = getApp();


Page({

  data: {
    nodes:null
  },

  onLoad: function (options) {
    console.log(options);
    post_id = options.post_id;
    wx.request({
      url: app.globalData.domain + '/mina_api/get_post',
    })

  }

})