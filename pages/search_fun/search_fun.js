// pages/usercenter/usercenter.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose: 0,
    currentIndex: 0,
    cardRightIn: false,
    cardLeftIn: false,
    times: [{
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
      }]
    }],
    sw_kc: [],
    grade: [],
    curr: [],
    teacherinfo:[],
    attendInfo:[],
    // 判断导航栏列表是否显示
    meunShow: [
      { isShows: true },
    ],
    areaLise: [],
    rowLise: [],
    rowShow: [
      { isShows: true },
      { isShows: true },
      { isShows: true },
      { isShows: true },
      { isShows: true },
      { isShows: true },
      { isShows: true },
    ],
    rigShow: true,
    majorInfo: ""



    //==========================================================

  },
  InputInfo: function (e) {
    var majorInfo = e.currentTarget.dataset.major;
    this.setData({
      majorInfo: majorInfo
    })
  },
  Infoinput: function (e) {
    this.setData({
      majorInfo: e.detail.value
    })
  },
  getTeacherInfo: function (e) {
    // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
    var menuSrc = "meunShow[" + 0 + "].isShows";

    // 循环data中设置的meunShow
    for (var n = 0; n < this.data.meunShow.length; n++) {
      // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
      var menuSrcs = "meunShow[" + n + "].isShows";
      // 解决重复点击不能隐藏的问题
      if (n != 0) {
        // 初始化，每次点击时先全部隐藏，但是重复点击不会隐藏
        this.setData({
          [menuSrcs]: true
        });
      };
    };

    // 给当前点击的去反data中设置的meunShow，使之显示， 只写此处只会显示不能隐藏
    this.setData({
      [menuSrc]: !this.data.meunShow[0].isShows
    });

    var str = this.data.majorInfo;
    var that =this;
    wx.request({
      url: app.globalData.mainurl + "teacher",
      data: {
        nameormajor: str
      },
      method: "GET",
      success: function (res) {
        if(res.data.length==0){
          wx.showToast({
            title:"查询失败",
            icon:"none",
            duration:2000
          })
        }else{
          that.setData({
            teacherinfo:res.data,
          });
        }
        
      },
      fail(res) {
        wx.showToast({
          title:"查询失败",
          icon:"none",
          duration:2000
        })
      }
    })
  },
  //===============================================================
  menuClick: function (e) {

    // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
    var menuSrc = "meunShow[" + 0 + "].isShows";

    // 循环data中设置的meunShow
    for (var n = 0; n < this.data.meunShow.length; n++) {
      // 拼接 ，使我们可以获取到menuShow里面每一个isSHows
      var menuSrcs = "meunShow[" + n + "].isShows";
      // 解决重复点击不能隐藏的问题
      if (n != 0) {
        // 初始化，每次点击时先全部隐藏，但是重复点击不会隐藏
        this.setData({
          [menuSrcs]: true
        });
      };
    };

    // 给当前点击的去反data中设置的meunShow，使之显示， 只写此处只会显示不能隐藏
    this.setData({
      [menuSrc]: !this.data.meunShow[0].isShows
    });
  },

  // 区域列表事件
  rowClick: function (e) {
    // 限制第一个 '不限' 不能点击

    // 获取wxml  data-hi="{{ index }}" 传过来的索引
    var rowNum = e.currentTarget.dataset.hi;
    // 同筛选导航栏事件，因第一个为不限不可点击， 所以减一
    var rowSrc = "rowShow[" + rowNum + "].isShows";
    // 隐藏所有的三级菜单
    for (var m = 0; m < this.data.rowShow.length; m++) {
      var rowSrcs = "rowShow[" + m + "].isShows";
      this.setData({
        [rowSrcs]: true
      });
    };
    // 同上
    this.setData({
      rigShow: false,
      [rowSrc]: !this.data.rowShow[e.currentTarget.dataset.hi].isShows
    });

  },
  //===============================================================

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //=======================
    var that = this;
    that.setData({
      choose: options.choose,
      sw_kc: app.globalData.sw_kc,
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
    };
    //学生考勤功能
    wx.request({
      url:app.globalData.mainurl+"attend",
      data: {
        stuid: "1622022035"
      },
      method: "GET",
      success: function (res) {
        if(res.data.length==0){
          wx.showToast({
            title:"查询失败",
            icon:"none",
            duration:2000
          })
        }else{
          that.setData({
            attendInfo:res.data
          });
        }
       
      },
      fail(res) {
        wx.showToast({
          title:"查询失败",
          icon:"none",
          duration:2000
        })
      }
    });
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
    var that = this;
    that.setData({
      grade: app.globalData.grade,
      curr: app.globalData.curr,
      areaLise: app.globalData.college,
      rowLise: app.globalData.major,
    });
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