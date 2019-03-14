let app = getApp();


Page({
    data: {
        title: "",
        textcontent: "",
        userimage: "",
    },

    title_input: function (e) {
        this.setData({
            title: e.detail.value
        })
    },
    content_input: function (e) {
        this.setData({
            textcontent: e.detail.value,
        })
    },
    uploadContent: function (e) {
        var that = this;
        if (this.data.title.length > 15) {
            wx.showToast({
                title: "标题超过指定字数",
                icon: "none",
                duration: 2000
            })
        } else if (this.data.textcontent > 200) {
            wx.showToast({
                title: "内容超过指定字数",
                icon: "none",
                duration: 2000
            })
        } else {
            wx.getUserInfo({
                success: function (res) {
                    var avatarUrl = 'userInfo.avatarUrl';
                    that.setData({
                        userimage: res.userInfo.avatarUrl,
                    })
                    wx.request({
                        url: app.globalData.mainurl + "uploadContent",
                        data: {
                            title: that.data.title,
                            auth: app.globalData.name,
                            content: that.data.textcontent,
                            userimage: that.data.userimage,
                        },
                        success(res) {
                            wx.showToast({
                                title: "上传成功",
                                icon: "none",
                                duration: 2000
                            })
                        },
                        fail(res) {
                            wx.showToast({
                                title: "上传失败",
                                icon: "none",
                                duration: 2000
                            })
                        }
                    });
                },
                fail(res) {
                    wx.showToast({
                        title:"获取用户信息失败",
                        icon:"none",
                        duration:2000
                    })
                }
            })

        }
    },
    onLoad: function (e) {

    }
})
