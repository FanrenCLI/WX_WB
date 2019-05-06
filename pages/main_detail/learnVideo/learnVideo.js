let app = getApp();

Page({
  data: {
    flag:0,
    count:6,
    info:"",
    videolist:[{title:"这是测asdasasdasdasdasasdasdasdasdasd试",auth:"fanren",time:"2019-8-12",src:"http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"},
    {title:"这是测试",auth:"fanren",time:"2019-8-12",src:"http://39.105.26.229:8080/"}],
    personvideo:[{title:"java入门",auth:"Fanrencli",time:"2019-4-10",src:"http://39.105.26.229:8080/"},
    {title:"Java高级",auth:"Fanrencli",time:"2019-4-10",src:"http://39.105.26.229:8080/"},
    {title:"Java网络编程",auth:"Fanrencli",time:"2019-4-10",src:"http://39.105.26.229:8080/"}],
    weeklyvideo:[{title:"诗歌散文精选",auth:"Fanrencli",time:"2019-4-10",src:"http://39.105.26.229:8080/"},
    {title:"电子机械操作教程",auth:"Fanrencli",time:"2019-4-10",src:"http://39.105.26.229:8080/"},
    {title:"树莓派入门实践",auth:"Fanrencli",time:"2019-4-10",src:"http://39.105.26.229:8080/"}],
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
        if(res.data.length>0){
          that.setData({
            videolist:res.data,
            flag:1
          })
          wx.hideToast({});
        }else{
          that.setData({
            flag:0
          })
          wx.showToast({
            title:"查询无...",
            icon:"none",
            duration:2000
          })
        }
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