
const app = getApp();

Page({
  data: {
    image_url:null

  },

  onLoad: function (options) {

  },

  contain_num:e=>{
    //used to contain number of words one can type in.
    // a find contains on more than 140 words.
    // fyi, no more than 9 pictures.
    console.log(e);
  },
  add_pic:function(e){
    var that = this;
    wx.chooseImage({
      count:1,
      sizeType:['compressed'],
      sourceType:['album'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: app.globalData.domain + '/upload/find_pic',
          filePath: tempFilePaths[0],
          name: 'pic', header: {
            "Content-Type": "multipart/form-data"//记得设置
          },
          formData:{
            'user_id':app.globalData.user_id,
            'token':app.globalData.token
          },
          success:res=>{
            
            e = JSON.parse(res.data);
            console.log(e);
            that.setData({image_url:app.globalData.domain + e.url})

            // save the iamge id and url somewhere for a find comit.
          }
        })
      }
        
        })
      },
      commit:e=>{
        
      }
  

})