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
  submit: function (e) {
    //converting my dom to a wx-granted nodes
    // first upload the picture vis the promise
    // then upload the whole thing


    // 得像过筛子一样，先把所有的img都筛出来
    // 要不然这玩意就不稳
    // 异步操作都不稳
    const pic_promise = new Promise((resolve, reject) => {

      var dom = this.data.dom;
      var img_index = [];
      for (let i = 0; i < dom.length; i++) {
        if (dom[i] && dom[i].type == 'img') img_index.push(i);
      }
      if (!img_index.length) { resolve({ msg: 'success', dom: dom }); }
      for (let j = 0; j < img_index.length; j++) {
        wx.uploadFile({
          url: app.globalData.domain + '/upload/post_pic',
          filePath: dom[img_index[j]].value,
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
            dom[img_index[j]].value = app.globalData.domain + e.url;
            if (j == img_index.length - 1) {
              resolve({ msg: 'success', dom: dom });
            }
          }
        });
      }
    });
    pic_promise.then(res => {
      console.log(res);
      var nodes = [];
      var text = '';
      const dom = res.dom;
      for (let i = 0; i < dom.length; i++) {
        if (dom[i].type == 'text') {
          text += ' ' + dom[i].value;
          nodes[nodes.length] = dom[i];
        }
        else if (dom[i].type == 'img') {
          nodes[nodes.length] = dom[i];
        }
      }
      const body = JSON.stringify(nodes);
      console.log('body', body);
      wx.request({
        url: app.globalData.domain + '/mina_api/reply',
        data: {
          user_id: app.globalData.user_id,
          token: app.globalData.token,
          dom: body,
          body: text,
          post_id: this.data.post_id
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
    });
  }
})

//把问问题的那一套复制过来，稍微改改


