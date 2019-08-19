const app = getApp();

Page({
  data: {
    disabled:true,
    search_words:"",
    rq_url:app.globalData.domain + '/mina_api/search_post',
    result_array:[],
    page:1,
    tips:"北航知道v2 alpha 上线了!尽管玩吧！反正alpha过后，这些数据不会保留的。",

    total_pages:null
  },
  search_input:function(e){
    var content = e.detail.value;
    console.log(content);
    if(content!=''){
      this.setData({search_words:content,disabled:false});
    }
  },
  search_execute:function(e){
    this.setData({page:1,total_pages:null})
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
          console.log(res);
          // slice(0,140) in case there's too many words.
          var pi = res.data.page_item;
          for(let i=0;i<pi.length;i++){
            if(pi[i].body.length > 30){
              pi[i].body = pi[i].body.slice(0,30) + '...';
            }
          }
          this.setData({result_array:pi,total_pages:res.data.total_pages});
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
    if (this.data.page >= this.data.total_pages) { return; }
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
        var pi = res.data.page_item;
        for (let i = 0; i < pi.length; i++) {
          if (pi[i].body.length > 30) {
            pi[i].body = pi[i].body.slice(0, 30) + '...';
          }
        }
        this.setData({ result_array: this.data.result_array.concat(pi) });
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