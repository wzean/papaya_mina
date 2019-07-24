const app = getApp();

Page({

  data: {
    title:null,
    body:null,
    is_urgent:false,
  },
  get_title:function(e){
    console.log(e.detail.value);
    this.setData({title:e.detail.value});
  },
  get_body:function(e){
    this.setData({body:e.detail.value});
    console.log(e.detail.value);
  },
  set_urgent:function(e){
    this.setData({is_urgent:e.detail.value});
    console.log(e.detail.value);
  },
  submit:function(e){
    wx.request({
      url: app.globalData.domain + '/mina_api/ask',
      data:{
        token:app.globalData.token,
        user_id:app.globalData.user_id,
        title:this.data.title,
        body:this.data.body,
        is_urgent:this.data.is_urgent,
        tags:''
      },
      header: {
        "Content-Type": "application/json"
      },
      
      success:res=>{
        console.log(res);
        console.log(data);
      }
    })
  }

})