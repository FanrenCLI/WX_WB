//index.js

//获取应用实例
var app = getApp()

Page({
    data: {
        contentlist: [],
        message: '',
        count: 1,
        titleauth:"",
        title:'',
    },
    bindChange: function (e) {
        this.setData({
            message: e.detail.value,
        })
    }, 
    //事件处理函数
    add: function (e) {
        var that = this;
        if (that.data.message.length != 0) {
            wx.getUserInfo({
                success: function (res) {
                    var info=res;
                    var things = {};
                    things.auth = app.globalData.name;
                    things.userimage = info.userInfo.avatarUrl;
                    things.content = that.data.message;
                    that.data.contentlist.push(things);
                    var arr = that.data.contentlist
                    that.setData({
                        contentlist: arr,
                    })
                    wx.request({
                        url: app.globalData.mainurl + "/message",
                        data: {
                            content: that.data.message,
                            auth: app.globalData.name,
                            image:info.userInfo.avatarUrl,
                            count:"topic"+that.data.count,
                        },
                        success(res){
                            wx.showToast({
                                title: "提交成功",
                                icon: "none",
                                duration: 2000
                            })
                        }
                    });
                },
                fail(res) {
                    wx.showToast({
                        title: "获取用户信息失败",
                        icon: "none",
                        duration: 2000
                    })
                }
            })
        }

        // var things={};
        // things.auth="陆杰";
        // things.image="https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83er2RuDvkxIkLq9v8cTbLUHfG80om2ca1icIf7kF0TcKS1PicRSguzXXrIOiaRzI48GYlrX8ibbDuPRVYw/132";
        // things.content=this.data.message;
        // this.data.contentlist.push(things);
        // var arr=this.data.contentlist
        // this.setData({
        //     contentlist:arr,
        // })
    },

    onLoad: function (options) {
        var that = this;
        that.setData({
            count: options.count,
            titleauth:options.auth,
            title:options.title,
        })
        wx.request({
            url:app.globalData.mainurl+"getmessage",
            data:{
                count:"topic"+that.data.count,
            },
            success(res){
                console.log(res.data);
                that.setData({
                    contentlist:res.data,
                })
            },
            fail(res){
                wx.showToast({
                    title:"请求失败",
                    icon:"none",
                    duration:2000
                })
            }
            
        })
    }
})
