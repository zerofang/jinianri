// pages/add/add.js
var common = require('../../libs/common.js');
var AV = common.getAV();
var time;
var title;
var content;
var list_data = {};
var path;
var length;
Page({
  data: {
    time: "",
    tempPaths: [],
    minH: "",
    mainW: "",
    modalhidden: true,
    title_length:"0",
    text_length:"0"
  },
  onLoad: function (options){   // 页面初始化 options为页面跳转所带来的参数
    var that=this;
    list_data={};
    length=options.length;
    time = common.getTime("年/月/日");
    console.log(time);
    that.setData({
      time: time
    });
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth;
        var main_width = (0.1 * width - 20) / 2;
        console.log(main_width);
        that.setData({
          minH: res.windowHeight,
          mainW: main_width
        })
      }
    })
  },
  bindinput: function (e) {
    var id = e.currentTarget.id.trim();
    var value = e.detail.value.trim();
    var that=this;
    switch(id){
      case "heading":
          that.setData({
            title_length:value.length
          });
          break;
      case "text":
          that.setData({
            text_length:value.length
          });
          break;
    }
    list_data[id] = value;
    console.log(list_data[id].length);
  },
  addimg: function () {
    var that = this;
    wx.chooseImage({
      count: 9, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        console.log(res.tempFilePaths[0]);
        path = res.tempFilePaths[0];
        list_data.img=path;
        that.setData({
          tempPaths: path
        })
      },
      fail: function () {
        // fail
        console.log("呵呵")
      },
      complete: function () {
        // complete
      }
    });
  },
  push: function () {
    var that = this;
    if(list_data.heading==""||list_data.heading==null){
          wx.showModal({
            title:"宝贝，给你的纪念日起个有意义的标题吧",
            showCancel:false
          })
      }else if(list_data.text==""||list_data.text==null){
          wx.showModal({
            title:"宝贝，你还什么都没写呢",
            showCancel:false
          })
        }else if(list_data.img==""||list_data.img==null){
          wx.showModal({
            title:"宝贝，选一张好看的图片吧",
            showCancel:false
          })
        }else {
          that.setData({
            modalhidden:false
          })
        }
  },
  confirm: function () {
    var that = this;
    console.log(common.getLength(list_data));
    if (common.getLength(list_data) ===3) {
      that.setData({
          modalhidden: true
        });
        wx.showToast({
          title:"正在上传中",
          icon:"loading",
          duration:1200,
          mask:true
        })
      var timestamp = common.getTime("full_time");
      console.log(timestamp);
      list_data.timestamp = timestamp;
      var user_id = wx.getStorageSync('openid');
      new AV.File('file', {
        blob: {
          uri: path
        },
      }).save().then(function (file) {
        list_data.img = [file.url()];
        console.log(list_data);
        var agreement = new common.agreement(1, user_id, null, list_data);
        console.log(agreement);
        common.post('https://jnr.shanlian.in',agreement, 'POST', function (res) {
          wx.setStorageSync('select', length);
        that.setData({
          modalhidden: true
        });
        setTimeout(function () {
          wx.showToast({
            title: "上传成功了哦",
            icon: "success",
            duration: 1000,
            mask: true
          })
        }, 500);
        setTimeout(function(){
            wx.navigateBack({
              delta: 1, // 回退前 delta(默认为1) 页面
              success: function(res){
                // success
              },
              fail: function() {
                // fail
              },
              complete: function() {
                // complete
              }
            })
        },2000);
      },function(res){
        wx.showToast({
          title:"网络连接失败",
          icon:"loading",
          duration:1200,
          mask:true
        })
      })
      })
    }
  },
  cancel: function () {
    var that = this;
    that.setData({
      modalhidden: true
    })
  }
})