var app = getApp()

Page({
    data: {
        navbar: ['学生作品', '新闻热点', "学生获奖", "国外高校"],
        currentTab: 0,
        content: [],
        count: 6,
        content0: [],
        content1: [],
        content2: [],
        content3: []
    },
    boxlink: function (e) {
        wx.navigateTo({
            url: "detail"
        })
        app.globalData.src = e.currentTarget.dataset.src;
    },
    // 导航切换监听
    navbarTap: function (e) {
        console.debug(e);
        var that = this;
        var content = [];
        that.setData({
            currentTab: e.currentTarget.dataset.idx,
        });
        switch (that.data.currentTab) {
            case 0:
                content = that.data.content0;
                break;
            case 1:
                content = that.data.content1;
                break;
            case 2:
                content = that.data.content2;
                break;
            case 3:
                content = that.data.content3;
                break;
        }
        that.setData({
            content: content,
        });
    },
    onLoad: function (res) {
        var that = this;
        wx.showToast({
            title: "查询中...",
            icon: "loading"
        })
        wx.request({
            url: app.globalData.mainurl + "allinfo",
            data: {
                count: that.data.count,
            },
            success(res) {
                wx.hideToast({});
                that.setData({
                    content0: res.data.content0,
                    content1: res.data.content1,
                    content2: res.data.content2,
                    content3: res.data.content3,
                })
            },
            fail(res) {
                wx.showToast({
                    title: "查询失败",
                    icon: "none",
                    duration: 2000
                })
            }
        });
        this.setData({
            content: this.data.content0,
        });
    },
    onReachBottom: function () {
        var that = this;
        wx.showToast({
            title: "查询中...",
            icon: "loading"
        })
        wx.request({
            url: app.globalData.mainurl + "selectone",
            data: {
                count: that.data.count,
                index: that.data.currentTab
            },
            success(res) {
                wx.hideToast({});
                switch (that.data.currentTab) {
                    case 0:
                        that.setData({
                            content0: res.data,
                        })
                        break;
                    case 1:
                        that.setData({
                            content1: res.data,
                        })
                        break;
                    case 2:
                        that.setData({
                            content2: res.data,
                        })
                        break;
                    case 3:
                        that.setData({
                            content3: res.data,
                        })
                        break;
                }

            },
            fail(res) {
                wx.showToast({
                    title: "查询失败",
                    icon: "none",
                    duration: 2000
                })
            }
        });
        this.setData({
            content: this.data.content0,
        });
    }
})