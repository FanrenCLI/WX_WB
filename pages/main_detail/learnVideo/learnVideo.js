let app = getApp();

Page({
  data: {
    count:6,
    info:"",
    videolist:[{title:"这是测asdasasdasdasdasasdasdasdasdasd试",auth:"fanren",time:"2019-8-12",src:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"},
    {title:"这是测试",auth:"fanren",time:"2019-8-12",src:"http://39.105.26.229:8080/"}],
  },

  choosevideo:function(e){
    app.globalData.src=e.currentTarget.dataset.src;
    
    wx.navigateTo({
      url:"video?time="+e.currentTarget.dataset.time+"&auth="+e.currentTarget.dataset.auth+"&title="+e.currentTarget.dataset.title,
    })
  },
  Infoinput:function(e){
    this.setData({
      info:e.detail.value
    })
  },
  searchbyinfo:function(e){
    var that=this;
    wx.showToast({
      title:"搜索中...",
      icon:"loading"
    })
    wx.request({
      url:app.globalData.mainurl+"searchVideoByInfo",
      data:{
        info:that.data.info,
      },
      success(res){
        that.setData({
          videolist:res.data,
        })
        wx.hideToast({});
      },
      fail(res){
        wx.showToast({
          title:"搜索失败",
          icon:'none',
          duration:2000
        })
      }
    })
  },
  onLoad: function (e) {
    var that=this;
    wx.showToast({
      title:"查询中...",
      icon:"loading",

    })
    wx.request({
      url: app.globalData.mainurl + 'video',
      data: {
        count:that.data.count,
      },
      success(res){
        wx.hideToast({});
        that.setData({
          videolist:res.data
        })
        console.log(that.data.videolist)
      },
      fail(res){
        wx.showToast({
          title:"查询失败",
          icon:'none',
          duration:2000
        })
      }
    })
  },

  /**
* 页面上拉触底事件的处理函数
*/
  onReachBottom: function () {
    var that=this;
    that.setData({
      count:that.data.count+6,
    })
    wx.showToast({
      title:"查询中",
      icon:"loading"
    })
    wx.request({
      url: app.globalData.mainurl + 'video',
      data: {
        count:that.data.count,
      },
      success(res){
        wx.hideToast({})
        that.setData({
          videolist:res.data
        })
      },
      fail(res){
        wx.showToast({
          title:"查询失败",
          icon:'none',
          duration:2000
        })
      }
    })
  },
})