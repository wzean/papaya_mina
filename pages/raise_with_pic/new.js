const app = getApp();


Page({
  data: {
    dom:[
      {type:'text',value:"这是自带的一个文本框"},
      ],
      title:null
  },
  add_text:function(e){
    console.log(e);
    this.setData({dom:this.data.dom.concat({ type:'text',value:null} )});
  },
  get_title:function(e){
    console.log(e);
    this.setData({title:e.detail.value});
  }
  ,
  add_pic:function(e){
    console.log(e);
    var that = this;
    //upload picture
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function(res) {
        console.log(res);
        var tempFilePaths = res.tempFilePaths;
        //现在要先缓存再上传了
        wx.uploadFile({
          url: app.globalData.domain + '/upload/post_pic',
          filePath: tempFilePaths[0],
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
            console.log(e);
            // e.pi_id : post_image_id
            // e.url : post_image_url
            that.setData({dom:that.data.dom.concat({type:'img',value: app.globalData.domain + e.url,pi_id:e.pi_id})});
            // save the iamge id and url somewhere for a find commit.
          }
        })
      },
    });
  },
  on_edit_text:function(e){
    console.log(e);
    var new_dom = this.data.dom;
    new_dom[Number(e.target.id)].value = e.detail.value;
    this.setData({dom:new_dom});
  },
  delete_node:function(e){
    console.log(e);
    var new_dom = this.data.dom;
    delete new_dom[Number(e.target.id)];
    this.setData({dom:new_dom});
  },
  submit:function(e){
    //converting my dom to a wx-granted nodes
    var nodes = [];
    var used_ids = [];
    const dom = this.data.dom;
    for(let i = 0;i<dom.length;i++){
      if(dom[i]){
        if(dom[i].type=='text'){nodes[nodes.length] = {type:'text',text:dom[i].value};}
        else if(dom[i].type=='img' ){nodes[nodes.length] = {name:'img',attrs:{src:dom[i].value,width:'300px'}};used_ids[used_ids.length]=dom[i].pi_id;}
      }
    }
    //var rd = {name:'div',children:nodes};
    var body = JSON.stringify(nodes);
    wx.request({
      url: app.globalData.domain + '/mina_api/ask',
      data:{
        user_id:app.globalData.user_id,
        token:app.globalData.token,
        body:body,
        used_ids:used_ids,
        title:this.data.title,
        is_urgent:false,
        tags:''
      },
      header:{
        "Content-Type": "application/json"
      },
      success:res=>{
        console.log(res);
        wx.showToast({
          title: '发布成功',duration:1500
        });
        wx.navigateBack();
      }
    })


  }
})




/* 本页的任务很艰巨啊
我打算这样做这个东西:
允许你插入两种节点到dom里面：
1. {type:'text',value:"text in the textarea."}
2. {type:'img',value:"url of the image",pi_id:(post_image_id) }
所以当你点击按钮插入一个text，dom里会加一个1,然后由于block是按dom渲染的，于是你就多了一个textarea
如果你点击插入图片，那么会打开一个上传图片的页面，后端会返回这张图片的url和id
但是会把图片记为status=0，提交时需要同时提交一个使用图片的id列表，把这些id标记为1
status=0的图片每天早上4点会被删掉

*/