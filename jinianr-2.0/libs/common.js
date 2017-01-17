function getTime(select){
    var time=new Date();
    var year=time.getFullYear();
    var month=time.getMonth()+1;
    var day=time.getDate();
    var hour=time.getHours();
    var minutes=time.getMinutes();
    var mill=time.getSeconds();
    var retime;
    switch(select){
        case "年/月/日":
            retime= year+"年"+month+"月"+day;
            break;
        case "full_time":
            retime=year+"."+month+"."+day+" "+hour+"\:"+
                minutes+"\:"+mill;
            break;
    }
    return retime;
}

function getLength(o){
    var t = typeof o;
    if (t == 'string') {
        return o.length;
    } else if (t == 'object') {
        var n = 0;
        for (var i in o) {
            n++;
        }
        return n;
    }
    return false;
}

function post(url,data,method,todo,failto){
      wx.request({
        url: url,
        data:data,
        method:method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {"Content-Type":"application/json"}, 
        // 设置请求的 header
        
        success: function(res){
          // success
          todo(res);
        },
        fail: function(res) {
          // fail
          failto(res);
        },
        complete: function() {
          // complete
        }
      })
}

function agreement(msg_type,user_id,timestamp,data){
    this.msg_type=msg_type;
    this.user_id=user_id;
    if(timestamp!=null){
        this.timestamp=timestamp;
    }
    if(data!=null){
        this.data=data;
    }
}

function getAV(){
    const av=require('./av-weapp.js');
    av.init({
        appId:'8wKBIiQUIsy12p72yw29STg2-gzGzoHsz',
        appKey:'INAjvfLe0hhgjTQ50w4sg5We'
    });
    return av;
}

function setValue(key,value){
    wx.setStorage({
      key: key,
      data: value,
      success: function(res){
        // success
        console.log(res);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
}

function getValue(key,getdata){
    wx.getStorage({
      key: key,
      success: function(res){
        // success
        getdata(res);
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
}


function navigateTo(page){
    wx.navigateTo({
      url:page,
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
}

module.exports={
    getTime:getTime,
    getLength:getLength,
    post:post,
    agreement:agreement,
    getAV:getAV,
    setValue:setValue,
    getValue:getValue,
    navigateTo:navigateTo
}