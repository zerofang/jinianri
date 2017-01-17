//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var common=require('./libs/common.js');
    var id=wx.getStorageSync('openid');
    if(id){
      console.log("缓存中存在");
    }else{
      console.log("获取用户标识");
      wx.login({
      success: function(res){
        // success
        var appid="wx46a34009fa3b6bc5";
        var appsecret="e8d08a3df00e95bef16930fdef4fa3ed"
        var url='https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+appsecret+'&js_code='+res.code+'&grant_type=authorization_code';
        var data={code:res.code};
        common.post(url,data,'GET',function(res){
            var openid=res.data.openid;
            wx.setStorageSync('openid', openid);
        },function(res){
          console.log(res);
        });
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    }
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },
})
