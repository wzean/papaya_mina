/*这里出现了一个问题，我没解决：
this.userInfoReadyCallback的问题。没有办法发送请求，不知道为什么。之前没有这种问题。
我在commit时会再开一个branch，避免污染代码。
*/

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
            }
          })
        }
      },
      fail: ()=> {
        this.globalData.user_id = wx.getStorageSync('user_id');
        this.globalData.token = wx.getStorageSync('token');}
    });
    userInfoReadyCallback: res => {
      console.log(4);
      wx.request({
        url: this.globalData.domain + '/mina_api/get_info',
        data: {
          user_info: res.userInfo
        }, header: {
          "Content-Type": "application/json"
        },
        success: res => {
          console.log(res);
          this.globalData.me = res.data.me;
        }
      })
    };
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res);
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
    user_id:null,
    me:{
      name:null,
      student_id:null,
      school_id:null
    }
  }
})

