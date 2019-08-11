const app = getApp();

Page({
  data: {
    disabled:true,
    search_words:"",
    rq_url:app.globalData.domain + '/mina_api/search_post',
    result_array:[],
    page:1,
    tips:"北航知道v2 RC1 上线了! \
    Thank you for using 北航知道.\
    You are breathtaking!",
    words:"<image src='{{url}}'></image>",
    url: app.globalData.domain + '/static/3fa9134c9dd84a82bdfff7c0c684ded5.jpg'
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
    wx.request({
      url: this.data.rq_url,
      data: {
        user_id: app.globalData.user_id,
        word: this.data.search_words,
        token: app.globalData.token,
        page: this.data.page + 1
      },
      header: {
        "Content-Type": "application/json"
      },
      success: res => {
        //注意这里，是把新数据加到page_items的后面，而不是替换
        this.setData({ result_array: this.data.result_array.concat(res.data.page_item) });
        /*  concat方法连接两个array，得到一个新的array，原来的array不变 */
        console.log(res);
        this.setData({ page: this.data.page + 1 });
      }
    });
  },
  confirm:e=>{
    console.log(e);
  }
})