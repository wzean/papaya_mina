const app = getApp();

Page({
  data: {
    disabled:true,
    search_words:"",
    rq_url:app.globalData.domain + '/mina_api/search_post',
    result_array:[],
    page:1,
  },
  search_input:function(e){
    var content = e.detail.value;
    console.log(content);
    if(content!=''){
      this.setData({search_words:content,disabled:false});
    }
  },
  search_execute:function(e){
    if(this.data.search_words!=''){
      wx.request({
        url: this.data.rq_url,
        data:{
          user_id:app.globalData.user_id,
          word:this.data.search_words,
          token:app.globalData.token,
          page:this.data.page},
        header: {
          "Content-Type": "application/json"
        },
        success:res=>{
          this.setData({result_array:res.data.page_item});
          console.log(res);
        }
      })
    }
  },
  get_post:function(e){
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../post/post?post_id=' + e.currentTarget.id
    })
  }
  ,
  onReachBottom:function(){
    //try to get next page. make a new request.
  }
})