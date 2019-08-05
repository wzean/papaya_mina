const app = getApp();

Page({
  data: {
    userInfo:null,
    me:null,
    can_use_console:false
  },
  onLoad: function () {
    this.setData({userInfo:app.globalData.userInfo,me:app.globalData.me});
    if(app.globalData.status == 9){
      this.setData({"can_use_console":true});
    }
  },
  get_my:e=>{
    console.log(e);
    wx.navigateTo({
      url: '../my/my?type='+e.target.id,
    })
  },
  kill_find:e=>{
    console.log(e);
    //手动狗头。名字叫kill，因为确实只能kill。但是写出来却叫管理:)
  },
  console:e=>{
    //secret stash  a.k.a. 私货
    //console requires status == 9
    //Were I to give other admins status == 8 ... :)
    console.log(e);
  }
})