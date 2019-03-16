let app = getApp();

Page({
    data: {
        contentlist: [{ auth: "fanren", content: "zhshi smzhshi sm" }],
        choose: '',
        count1:0,
        count2:0,
        happythings:[{ auth: "fanren", content: "zhshi smzhshi sm" }],
    },
    onLoad: function (options) {
        this.setData({
            choose: options.choose,
            contentlist:app.globalData.content,
            happythings:app.globalData.happythings,
            count1:5,
            count2:5,
        })
        switch (this.data.choose) {
            case '1':
                wx.setNavigationBarTitle({ title: '表白墙' });
                break;
            case '2':
                wx.setNavigationBarTitle({ title: '今日趣事' });
                break;
        }
    },
    onReachBottom: function () {
        var that=this;
        if(that.data.choose==1){
            that.setData({
                count1:that.data.count1+5,
                count2:0,
            })
        }else{
            that.setData({
                count1:0,
                count2:that.data.count2+5,
            })
        }
        wx.showToast({
          title:"查询中",
          icon:'loading'
        })
        wx.request({
          url:app.globalData.mainurl +"yule",
          data:{
            count1:that.data.count1,
            count2:that.data.count2,
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