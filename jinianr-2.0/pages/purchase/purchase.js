
var common = require('../../libs/common.js');
Page({
  data: {
    btns: ["1次=1元", "6次=5元", "15次=10元"]
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var userid = wx.getStorageSync('openid');
    var ref = wilddog.sync().ref(userid);
    ref.child('purchase').on("value", function () {

    })
  },
  select: function (e) {
    var value=e.currentTarget.id;
    var times=value.slice(0,value.indexOf("次"));
    var money=value.slice(value.indexOf("=")+1,value.indexOf("元"));
    console.log(times);
    console.log(money);
  }
})