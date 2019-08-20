Page({

  data: {
      url:null
  },
  onLoad: function (options) {
    this.setData({url:"https://mp.weixin.qq.com/s/"+options.url});
  }
})