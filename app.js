//app.js

App({
  onLaunch: function () {
    wx.login({
      success: res => {
        if(res.code){
          wx.request({
            url: this.globalData.domain + '/mina_api/login',
            data:{
              code:res.code
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            success: res=>{
              console.log(res);
              wx.setStorageSync('user_id',res.data.user_id);
              wx.setStorageSync('token',res.data.token);
              this.globalData.user_id = res.data.user_id;
              this.globalData.token = res.data.token;
            }, fail: ()=>{
              this.globalData.user_id = wx.getStorageSync('user_id');
              this.globalData.token = wx.getStorageSync('token');
              // and hope the token works.
            }
          })
        }
      },
      fail: ()=> {
        this.globalData.user_id = wx.getStorageSync('user_id');
        this.globalData.token = wx.getStorageSync('token');}
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                res =>{
                  wx.request({
                    url: this.globalData.domain +  '/main_api/get_info',
                    data:{
                      user_info:this.globalData.user_info
                    }, header: {
                      "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success:res=>{
                      console.log(res);
                    }
                  })
                }
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    domain:'http://localhost:5000',
    token:null,
    user_id:null
  }
})