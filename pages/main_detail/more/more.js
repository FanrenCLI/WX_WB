var app = getApp()

Page({
    data: {
        navbar: ['校园地图', '校历','问卷调查'],
        currentTab: 0,
        wjlist:[{title:"这是标题",time:"2018-12-09",src:""}],
        count:13,
    },
    choosetest:function(e){
        var src=e.currentTarget.dataset.src;
        wx.navigateTo({
          url:'detail?src='+src,
        })
      },
      onLoad:function(e){
        var that=this;
        wx.showToast({
          title:"查询中",
          icon:"loading"
        })
        wx.request({
          url:app.globalData.mainurl+"wjdc",
          data:{
            count:that.data.count,
          },
          success(res){
            that.setData({
              wjlist:res.data,
            })
          },
          fail(res){
            wx.showToast({
              title:"查询失败",
              icon:"none"
            })
          }
        })
      },
    // 导航切换监听
    navbarTap: function (e) {
        console.debug(e);
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        });
    },
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
          url: app.globalData.mainurl + 'wjdc',
          data: {
            count:that.data.count,
          },
          success(res){
            wx.hideToast({})
            that.setData({
              wjlist:res.data
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
