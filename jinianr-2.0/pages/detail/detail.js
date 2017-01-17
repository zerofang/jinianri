// pages/detail/detail.js
var common=require('../../libs/common.js');
Page({
  data:{
    list:{},
    min:"",
    zoom_visibility:"hidden"
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    var select_time=options.select_time;
    var select_id=options.select_id;
    var user_id=wx.getStorageSync('openid');
    var agreement=new common.agreement(2,user_id,select_time);
    console.log(agreement);
    common.post('https://jnr.shanlian.in',agreement,'POST',function(res){
      var data=res.data.data;
      that.setData({
        list:data
      })
    })
    common.setValue('select',select_id);
    var system=wx.getSystemInfo({
      success: function(res) {
        that.setData({
          min:res.windowHeight
        })
      }
    })
  },
  zoom:function(){
    this.setData({
      zoom_visibility:"visibal"
    })
  },
  recover:function(){
    this.setData({
      zoom_visibility:"hidden"
    })
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})