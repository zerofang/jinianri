//index.js
//获取应用实例
var app = getApp();
var common = require('../../libs/common.js');
var spinner = false;
var add_length;
Page({
  data: {
    opacity: "",
    move: "",
    move_icon: "",
    icon_top: "",
    left_data: [],
    right_data: [],
    points: [],
    select: "",
    left_after: "",
    right_after: "",
    min: "",
    line_height: "",
    times: "",
    right_line: "",
    right_detail: "",
    btn_list: [{ option: "purchase", src: "https://dn-8wKBIiQU.qbox.me/1c2b3e1a790965a834ad", zh: "购买" },
    { option: "help", src: "https://dn-8wKBIiQU.qbox.me/b824f59d5966f714d94d", zh: "帮助" },
    { option: "feedback", src: "https://dn-8wKBIiQU.qbox.me/3766c391c6a7ce0e109f", zh: "反馈" }],
    tips_hidden: "true",
  },
  onLoad: function () {
    console.log("load");
    var that = this;
    that.setData({
      line_height: 180,
      icon_top: 180,
    })
  },
  tap_max_view: function () {
    if(spinner){
      this.setData({
      right_line: "",
      right_detail: ""
    });
    spinner=false;
    }
  },
  spinner: function () {
    var that = this;
    if (!spinner) {
      that.setData({
        right_line: "height:220rpx;opacity:1;"
      });
      setTimeout(function () {
        that.setData({
          right_detail: "right:54rpx;opacity:1;"
        })
      }, 500);
      spinner = true;
    } else {
      that.setData({
        right_line: "",
        right_detail: ""
      });
      spinner=false;
    }
  },
  choose:function(e){
      /*    
      var select=e.currentTarget.id;
      common.navigateTo('../'+select+"/"+select);
      */
      wx.showToast({
        title:"该功能暂不开放",
        icon:"loading",
        duration:1000,
        mask:true
      })
  },
  onShow: function () {
    var that = this;
    var time, title, content;
    var data_i;
    var points = [];
    var left_data = [];
    var right_data = [];
    var list_data = [];
    //登陆协议协议
    var user_id = wx.getStorageSync('openid');
    var agreement0 = new common.agreement(0, user_id);
    console.log(agreement0);
    that.setData({
      line_height: 180,
      icon_top:180,
    })
    common.post('https://jnr.shanlian.in', agreement0, 'POST', function (res) {
    
    var record = res.data.record;
    var titles = res.data.heading;
    var lastnumber=res.data.number;
    var length = record.length;
    add_length=length;
    for (var i in record) {
      var time = record[i].slice(0, record[i].lastIndexOf('.') + 2);
      console.log(time);
      var data_i = {
        time: time,
        full_time: record[i],
        title: titles[i]
      }
      points = points.concat(i + 1);
      if (i % 2 == 0) {
        left_data = left_data.concat(data_i);
      } else {
        right_data = right_data.concat(data_i);
      }
    }
    var i = length;
    var select = wx.getStorageSync('select') || (length - 1);
    that.setData({
      select:i-1,
      times: lastnumber,
      line_height: (i + 1) * 180,
      icon_top: (i + 1) * 180,
      left_data: left_data,
      right_data: right_data,
      points: points,
      select: select
    })
    setTimeout(function () {
      that.setData({
        left_after: "left_after",
        right_after: "right_after"
      })
    }, 1000);
    setTimeout(function () {
      that.setData({
        opacity: "opacity"
      })
    }, 2000);
    },function(res){
      console.log(res);
    })
  },
  select: function (e) {
    var that = this;
    var select_time = e.currentTarget.dataset.select;
    var select_id = e.currentTarget.id;
    that.setData({
      select: select_id
    });
    setTimeout(function () {
      common.navigateTo("../detail/detail?select_id=" + select_id + "&select_time=" + select_time);
    }, 1000)
  },
  add: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        opacity: "",
        line_height: "",
        icon_top: "",
        left_after: "",
        right_after: "",
      })
    }, 500)
    setTimeout(function () {
      common.navigateTo('../add/add?length='+add_length);
    }, 1200)
  },
  tips: function () {
    this.setData({
      tips_hidden: false
    })
  },
  confirm: function () {
    this.setData({
      tips_hidden: true
    })
  },
  cancel: function () {
    this.setData({
      tips_hidden: true
    })
  },
  onShareAppMessage:function(){
    return{
      title:"纪己",
      desc:"纪念自己的珍贵时光",
      path:"pages/index/index"
    }
  }
})
