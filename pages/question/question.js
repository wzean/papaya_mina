const app = getApp();

const dict = ['em','new','hot'];

Page({

  data: {
    currentTab: 0,
    is_showing_post:true,
    result_array:[],
    page:1,
    rq_url:null,
    kind:'em',
    total_pages: null, 
    dom: [
      { type: 'text', value: "这是自带的一个文本框" },
    ],
    title: null,
    is_urgent: false
  },
  onLoad: function (options) {
    this.get_em();
  },
  get_new:function(e){
    this.setData({kind:'new',page:1});
    wx.request({
      url: app.globalData.domain + '/mina_api/get_top',
      data:{
        token:app.globalData.token,
        user_id:app.globalData.user_id,
        kind: 'new',
        page: this.data.page
      },
      header:{
        'content-type': 'application/json'
      },
      success:res=>{
        console.log(res);
        var pi = res.data.page_items;
        for (let i = 0; i < pi.length; i++) {
          if (pi[i].body.length > 30) {
            pi[i].body = pi[i].body.slice(0, 30) + '...';
          }
        }
        this.setData({ result_array: pi,total_pages:res.data.page });
      }
    })
  },
  get_hot: function (e) {
    this.setData({ kind: 'hot',page:1});
    wx.request({
      url: app.globalData.domain + '/mina_api/get_top',
      data: {
        token: app.globalData.token,
        user_id: app.globalData.user_id,
        kind: 'hot',
        page: this.data.page
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        var pi = res.data.page_items;
        for (let i = 0; i < pi.length; i++) {
          if (pi[i].body.length > 30) {
            pi[i].body = pi[i].body.slice(0, 30) + '...';
          }
        }
        this.setData({ result_array: pi, total_pages: res.data.page });
      }
    })
  },
  get_em: function (e) {
    this.setData({ kind: 'em',page:1 });
    wx.request({
      url: app.globalData.domain + '/mina_api/get_top',
      data: {
        token: app.globalData.token,
        user_id: app.globalData.user_id,
        kind: 'em',
        page:this.data.page
      },
      header: {
        'content-type': 'application/json'
      },
      success: res => {
        console.log(res);
        var pi = res.data.page_items;
        for (let i = 0; i < pi.length; i++) {
          if (pi[i].body.length > 30) {
            pi[i].body = pi[i].body.slice(0, 30) + '...';
          }
        }
        this.setData({ result_array: pi, total_pages: res.data.page });
      }
    })
  },
  raise:function(){
    wx.navigateTo({
      url: '../raise_with_pic/raise_with_pic',
    })
  },
  get_post: function (e) {
    console.log(e.currentTarget.id);
    //var id = e.id;
    wx.navigateTo({
      url: '../post/post?post_id=' + e.currentTarget.id
    })
  },
  onReachBottom: function () {
    if (this.data.page >= this.data.total_pages) { return; }
    wx.request({
      url: app.globalData.domain + '/mina_api/get_top',
      data: {
        user_id: app.globalData.user_id,
        token: app.globalData.token,
        page: this.data.page + 1,
        kind:this.data.kind
      },
      header: {
        "Content-Type": "application/json"
      },
      success: res => {
        console.log(res);
        //注意这里，是把新数据加到page_items的后面，而不是替换
        var pi = res.data.page_items;
        for (let i = 0; i < pi.length; i++) {
          if (pi[i].body.length > 30) {
            pi[i].body = pi[i].body.slice(0, 30) + '...';
          }
        }
        this.setData({ result_array: this.data.result_array.concat(pi) });
        /*  concat方法连接两个array，得到一个新的array，原来的array不变 */
        console.log(res);
        this.setData({ page: this.data.page + 1, total_pages: res.data.page });
      }
    });
  },
  swichNav: function (e) {
    console.log(e);
    const cur = e.target.dataset.current;
    var that = this;
    if (this.data.currentTab === cur) {return;} 
    else {
      switch(cur){
        case '0':
          that.setData({ is_showing_post: true, currentTab: cur, kind: dict[cur]});that.get_em();break;
        case '1':
          that.setData({ is_showing_post: true, currentTab: cur, kind: dict[cur]});that.get_new();break;
        case '2':
          that.setData({ is_showing_post: true, currentTab: cur, kind: dict[cur] });that.get_hot();break;
        case '3':
          that.setData({ is_showing_post: false, currentTab: cur});
      }
    }
  },
  add_text: function (e) {
    console.log(e);
    this.setData({ dom: this.data.dom.concat({ type: 'text', value: null }) });
  },
  get_title: function (e) {
    console.log(e);
    this.setData({ title: e.detail.value });
  }
  ,
  add_pic: function (e) {
    console.log(e);
    var that = this;
    //upload picture
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        console.log(res);
        var pic_local_path = res.tempFilePaths[0];
        //现在要先缓存再上传了
        that.setData({ dom: that.data.dom.concat({ type: 'img', value: pic_local_path, pi_id: null }) });
      },
    });
  },
  on_edit_text: function (e) {
    console.log(e);
    var new_dom = this.data.dom;
    new_dom[Number(e.target.id)].value = e.detail.value;
    this.setData({ dom: new_dom });
  },
  delete_node: function (e) {
    console.log(e);
    var new_dom = this.data.dom;
    delete new_dom[Number(e.target.id)];
    this.setData({ dom: new_dom });
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
        url: app.globalData.domain + '/mina_api/ask',
        data: {
          user_id: app.globalData.user_id,
          token: app.globalData.token,
          dom: body,
          body: text,
          title: this.data.title,
          is_urgent: this.data.is_urgent,
          tags: ''
        },
        header: {
          "Content-Type": "application/json"
        },
        success: res => {
          console.log(res);
          wx.showToast({
            title: '发布成功', duration: 1500
          });
          this.setData({ is_showing_post: true, currentTab: 0, kind: 'em' }); 
          this.get_em();
          
        }
      });
    });
  },
  set_urgent: function (e) {
    this.setData({ is_urgent: !this.data.is_urgent });
  }

})