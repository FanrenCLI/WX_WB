let app =  getApp();

  Page({
      data:{
        content:[{auth:"fanren",content:"you will never know"},
        {auth:"lujie",content:"you will never know"},
        {auth:"lujie",content:"you will never know"},
        {auth:"lujie",content:"you will never know"},
        {auth:"lujie",content:"you will never know"}],
        happythings:[{content:"震惊！！某大学生夜间..."}],
        
      },
      biaobai:function(res){
        wx.navigateTo({
          url:"detail?choose=1"
        })
      },
      qingshi:function(res){
        wx.navigateTo({
          url:"detail?choose=2"
        })
      },
      onLoad:function(res){
        var that=this;
        wx.showToast({
          title:"查询中",
          icon:'loading'
        })
        wx.request({
          url:app.globalData.mainurl +"yule",
          data:{
            count1:5,
            count2:5,
          },
          success(res){
            wx.hideToast({})
            console.log(res.data);
            that.setData({
              content:res.data.content,
              happythings:res.data.happythings,
            })
            app.globalData.content=that.data.content;
            app.globalData.happythings=that.data.happythings;
          },
          fail(res){
            wx.showToast({
              title:'查询失败',
              icon:'none'
            })
          }
        })
      },





  })