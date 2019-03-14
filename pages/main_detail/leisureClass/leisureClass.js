let app = getApp();

Page({
    data: {
        xqj: 0,
        // leisureClass:[{place:"主教楼231",number:12,seat:53},
        //               {place:"主231",number:15,seat:53},
        //               {place:"主教楼231",number:12,seat:53},
        //               {place:"主教楼231",number:12,seat:53},
        //               {place:"主教楼231",number:12,seat:53},],
        leisureClass: [],
    },
    radioChange: function (e) {
        this.setData({
            xqj: e.detail.value,
        })
        var that = this;
        wx.request({
            url: app.globalData.mainurl + "leisureRoom",
            data: {
                xqj: that.data.xqj,
            },
            success(res) {
                that.setData({
                    leisureClass: res.data,
                })
            },
            fail(res) {
                wx.showToast({
                    title: "查询失败",
                    icon: "none",
                    duration: 2000
                })
            }
        })
    },
    chooseRoom: function (e) {
        var name = e.currentTarget.dataset.place;
        var that = this;
        wx.request({
            url: app.globalData.mainurl + "intoRoom",
            data: {
                place: name,
                name: "陆杰",
                id: "1622022035",
            },
            success(res) {
                if (res.data == "success") {
                    wx.request({
                        url: app.globalData.mainurl + "leisureRoom",
                        data: {
                            xqj: that.data.xqj,
                        },
                        success(res) {
                            that.setData({
                                leisureClass: res.data,
                            })
                        },
                        fail(res) {
                            wx.showToast({
                                title: "查询失败",
                                icon: "none",
                                duration: 2000
                            })
                        }
                    })
                } else {
                    wx.showToast({
                        title: "请先离开" + res.data,
                        icon: "none",
                        duration: 2000
                    })
                }
            },
            fail(res) {
                wx.showToast({
                    title: "查询失败",
                    icon: "none",
                    duration: 2000
                })
            }
        })
    },
    leaveRoom: function (e) {
        var that = this;
        var name = e.currentTarget.dataset.place;
        wx.request({
            url: app.globalData.mainurl + "leaveRoom",
            data: {
                id: "1622022035",
                place: name,
            },
            success(res) {
                if (res.data == "success") {
                    wx.request({
                        url: app.globalData.mainurl + "leisureRoom",
                        data: {
                            xqj: that.data.xqj,
                        },
                        success(res) {
                            that.setData({
                                leisureClass: res.data,
                            })
                        },
                        fail(res) {
                            wx.showToast({
                                title: "查询失败",
                                icon: "none",
                                duration: 2000
                            })
                        }
                    })
                }
            },
            fail(res) {
                wx.showToast({
                    title: "删除失败",
                    icon: "none",
                    duration: 2000
                })
            }
        })
    }
})