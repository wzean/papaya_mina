
const app = getApp();

Page({
  data: {
    image_url:null,
    btn_text:"选择一张图片",
    text:null,
    image_id:null
  },

  onLoad: function (options) {
    
  },

  contain_num:function(e){
    this.setData({text:e.detail.value});

  },
  add_pic:function(e){
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType:['compressed'],
      sourceType:['album'],
      success: function(res) {
        console.log(res);
        var pic_local_url = res.tempFilePaths[0];
        that.setData({ image_url: pic_local_url,btn_text: "更改图片"});
      }
        })
      },
      commit:function(e){
        console.log(e);
        // upload here

        wx.uploadFile({
          url: app.globalData.domain + '/upload/find_pic',
          filePath: this.data.image_url,
          name: 'pic', header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          formData: {
            'user_id': app.globalData.user_id,
            'token': app.globalData.token
          },
          success: res => {
            console.log(res); 
            e = JSON.parse(res.data);
            this.setData({ image_id: e.f_image_id});
            wx.request({
              url: app.globalData.domain + '/mina_find/new_find',
              data: {
                user_id: app.globalData.user_id,
                token: app.globalData.token,
                text: this.data.text,
                image_id: this.data.image_id
              },
              header: {
                "Content-Type": "application/json"
              },
              success: res => {
                console.log(res);
                wx.showToast({
                  title: '发表成功',
                  duration: 1500
                });
                wx.navigateBack();
              }
            });
          }
        })}
        

        
      
  

})