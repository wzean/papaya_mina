const app = getApp();

Page({
  data: {
    userInfo:null,
    me:null
  },
  onLoad: function () {
    this.setData({userInfo:app.globalData.userInfo,me:app.globalData.me});
  },
  get_my:e=>{
    console.log(e);
    wx.navigateTo({
      url: '../my/my?type='+e.target.id,
    })
  }
})