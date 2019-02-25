// pages/usercenter/usercenter.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose: 0,
    currentIndex:0,
    cardRightIn: false,
    cardLeftIn: false,
    times: [ {
      name: '1',
      class2: ''
    }, {
      name: '2',
      class2: ''
    }, {
      name: '3',
      class2: ''
    }, {
      name: '4',
      class2: ''
    }, {
      name: '5',
      class2: ''
    }, {
      name: '6',
      class2: ''
    }, {
      name: '7',
      class2: ''
    }, {
      name: '8',
      class2: ''
    }, {
      name: '9',
      class2: ''
    }, {
      name: '10',
      class2: ''
    }, {
      name: '11',
      class2: ''
    }, {
      name: '12',
      class2: ''
    }],
    week_kecheng: [{
      index: 1,
      week_day: [{
        week: '一'
      }, {
        week: '二'
      }, {
        week: '三'
      }, {
        week: '四'
      }, {
        week: '五'
      }],
      sw_kc: [ {
        "xqj": 3,//星期几
        "skjc": 2,//上课节次
        "skcd": 3,//上课长度
        "kcmc": "空间数据结构",
        "bg": 'qianlan'
      }]
    }],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      choose: options.choose,
      kechengs: that.data.week_kecheng[0]
    });
    switch (that.data.choose) {
      case "1":
        wx.setNavigationBarTitle({ title: '课表查询' });
        break;
      case "2":
        wx.setNavigationBarTitle({ title: '成绩查询' });
        break;
      case "3":
        wx.setNavigationBarTitle({ title: '学生考勤' });
        break;
      case "4":
        wx.setNavigationBarTitle({ title: '授课教师信息' });
        break;
      case "5":
        wx.setNavigationBarTitle({ title: '考试安排' });
        break;
      case "6":
        wx.setNavigationBarTitle({ title: '查询6' });
        break;
    }
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

  }
})