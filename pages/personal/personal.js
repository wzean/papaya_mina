const app = getApp();

Page({
  data: {
    name:null,
    student_id:null,
    class_id:null
  },
  onLoad: function (options) {
  },
  get_name:function(e){
    console.log(e.detail.value);
    this.setData({name:e.detail.value});
  },
  get_student_id:function(e){
    this.setData({ student_id: e.detail.value });
  },
  get_class_id: function (e){
    this.setData({ class_id: e.detail.value });
  },
  commit: function (e){
    if(this.data.name && this.data.student_id && this.data.class_id){
      console.log(this.data);
      app.globalData.me = this.data;
      wx.request({
        url: app.globalData.domain +  '/mina_api/modify_user_info',
        data:{
          user_id:app.globalData.user_id,
          token:app.globalData.token,
          me:this.data
        },
        header: { "Content-Type": "application/x-www-form-urlencoded"},
        success:res=>{
          console.log(res);
          wx.navigateBack();
        }
      })
    }
  }
 
})