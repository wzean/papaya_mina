const app = getApp();


Page({
  data: {
    dom:[
      {type:'text',value:"这是自带的一个文本框"},
      ],
      post_id:null
      
  }, onLoad: function (options) {

    this.setData({ post_id: Number(options.post_id) });
    console.log(this.data.post_id);
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
        var pic_local_path = res.tempFilePaths[0];
        //现在要先缓存再上传了
        that.setData({dom: that.data.dom.concat({ type: 'img', value: pic_local_path ,pi_id:null})});
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
    const promise = new Promise((resolve,reject)=>{
      var nodes = [];
      var text = '';
      var dom = this.data.dom;
      for (let i = 0; i < dom.length; i++) {
        if (dom[i]) {
          if (dom[i].type == 'text') {
            text += dom[i].value;
            nodes[nodes.length] = dom[i];
            if (i == dom.length - 1) {
              console.log(nodes);
              resolve({ msg: 'success', nodes: nodes, text: text });
            }
          } else if (dom[i].type == 'img') {
            // upload the picture
            wx.uploadFile({
              url: app.globalData.domain + '/upload/post_pic',
              filePath: dom[i].value,
              name: 'pic',
              header: {
                "Content-Type": "multipart/form-data"//记得设置
              },
              formData: {
                'user_id': app.globalData.user_id,
                'token': app.globalData.token
              },
              success: res => {
                console.log(res);
                e = JSON.parse(res.data);
                // 要记得把新的img_url给img
                dom[i].value = app.globalData.domain + e.url;
                nodes[nodes.length] = dom[i];
                console.log('nodes', i, nodes);
                if(i==dom.length-1){
                  console.log(nodes);
                  resolve({msg:'success',nodes:nodes,text:text});
                }
              }
            })
          }
        }
      }
    });
    promise.then(res=>{
      console.log(res);
      const body = JSON.stringify(res.nodes);
      console.log('body', body);
      wx.request({
        url: app.globalData.domain + '/mina_api/reply',
        data: {
          user_id: app.globalData.user_id,
          token: app.globalData.token,
          dom: body,
          body: res.text,
          post_id:this.data.post_id
        },
        header: {
          "Content-Type": "application/json"
        },
        success: res => {
          console.log(res);
          wx.showToast({
            title: '回答成功', duration: 1500
          });
          wx.navigateBack();
        }
      });
    })
    
  }
})

//把问问题的那一套复制过来，稍微改改