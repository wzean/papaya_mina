const app = getApp();

Page({
  data: {
    userInfo:null,
    me:null,
    can_use_console:false
  },
  onLoad: function () {
    this.setData({userInfo:app.globalData.userInfo,me:app.globalData.me});
    if(app.globalData.status == 8){
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
    wx.navigateTo({
      url: '../my_find/my_find'
    })
  },
  console:e=>{
    //secret stash  a.k.a. 私货
    //console requires status == 9
    //Were I to give other admins status == 8 ... :)
    console.log(e);
    wx.scanCode({
      scanType:['qrCode'],
      success:res=>{
        console.log(res);
        var uuid = res.result;
        wx.request({
          url: app.globalData.domain + '/mina_api/scan_get',
          data:{
            token:app.globalData.token,
            user_id:app.globalData.user_id,
            uuid:uuid
          },
          header:{
            "Content-Type": "application/json"
          },success:res=>{
            console.log(res);
            wx.showActionSheet({
              itemList:['确认登陆'],
              success:res=>{
                console.log(res);
                wx.request({
                  url: app.globalData.domain + '/mina_api/scan_confirm',
                  data:{
                    token: app.globalData.token,
                    user_id: app.globalData.user_id,
                    uuid: uuid
                  },
                  success:res=>{
                    console.log(res);
                    wx.showToast({
                      title: '确认成功',
                    })
                  }
                })
              }
            })
          }
        })
      }

    })
  },
  feedback:e=>{
    console.log(e);
    wx.navigateTo({
      url: '../feedback/feedback'
    })
  },
  about:e=>{
    console.log(e);
    wx.navigateTo({
      url: '../about/about',
    })
  }
})