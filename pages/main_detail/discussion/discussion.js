// pages/inf/inf.js
let app = getApp();
Page({
    data: {
        count: 0,
        headLineList: [{title:"这是什这是aasdasd什这是什这是什这是什这是什这是什么",auth:"fanren",time:"2018-12-5",userimage:"https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83er2RuDvkxIkLq9v8cTbLUHfG80om2ca1icIf7kF0TcKS1PicRSguzXXrIOiaRzI48GYlrX8ibbDuPRVYw/132"}],
        info:"",
    },

    loadMore: function (e) {
        var that = this;
        wx.request({
            url: app.globalData.mainurl + "discussion",
            data: {
                count: that.data.count + 6,
            },
            success(res) {
                that.setData({
                    headLineList: res.data
                });
            },
            fail(res) {
                wx.showToast({
                    title: "查询失败",
                    icon: "none",
                    duration: 2000
                })
            }
        });
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
          url:app.globalData.mainurl+"searchTopicByInfo",
          data:{
            info:that.data.info,
          },
          success(res){
            that.setData({
                headLineList:res.data,
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
    //创建话题
    buildtopic: function (e) {
        wx.navigateTo({
            url: "buildtopic",
        })
    },
    onLoad: function (options) {
        var that = this;
        if (options.count != null) {
            that.setData({
                count: 6 + options.count,
            });
        } else {
            that.setData({
                count: 6
            })
        }

        wx.request({
            url: app.globalData.mainurl + "/discussion",
            data: {
                count: that.data.count,
            },
            success(res) {
                that.setData({
                    headLineList: res.data
                });
            },
            fail(res) {
                wx.showToast({
                    title: "查询失败",
                    icon: "none",
                    duration: 2000
                })
            },
        });
    },
    jumpDetails: function (e) {
        wx.navigateTo({
            url: "topicdetail?count="+e.currentTarget.dataset.count+"&auth="+e.currentTarget.dataset.auth+"&title="+e.currentTarget.dataset.title,
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '微信小程序联盟',
            desc: '最具人气的小程序开发联盟!',
            path: '/page/user?id=123'
        }
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    }
})