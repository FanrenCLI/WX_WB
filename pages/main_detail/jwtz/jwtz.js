let app =  getApp();

  Page({
      data:{
        tzlist:[{title:"这是标题",time:"2018-12-09",src:"http:39.105.26.229:8080/asd.html"},
        {title:"这是标题",time:"2018-12-09",src:"http:39.105.26.229:8080/asd.html"}],
        count:13,
      },

      chooseMessage:function(e){
        var src= e.currentTarget.dataset.src;
        wx.navigateTo({
          url:"detail?src="+src,
        });
      },
      onLoad:function(e){
        var that=this;
        wx.showToast({
          title:"查询中",
          icon:"loading"
        })
        wx.request({
          url:app.globalData.mainurl+"jwtz",
          data:{
            count:that.data.count,
          },
          success(res){
            that.setData({
              tzlist:res.data,
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
          url: app.globalData.mainurl + 'jwtz',
          data: {
            count:that.data.count,
          },
          success(res){
            wx.hideToast({})
            that.setData({
              tzlist:res.data
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