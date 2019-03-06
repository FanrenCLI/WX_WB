// pages/search/search.js
let app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classes: "",
    stu_id: "",
    search_list: [{
      url: '../search_fun/search_fun?choose=1',
      name: '课表查询',
      func: ""
    }, {
      url: '../search_fun/search_fun?choose=2',
      name: '成绩查询',
      func: "gradeInfo"
    }, {
      url: '../search_fun/search_fun?choose=3',
      name: '学生考勤',
      func: "attend"
    }, {
      url: '../search_fun/search_fun?choose=4',
      name: '授课教师信息',
      func: ""
    }, {
      url: '../search_fun/search_fun?choose=5',
      name: '考试安排',
      func: ""
    }, {
      url: '../search_fun/search_fun?choose=6',
      name: '查询6',
      func: ""
    }],
    
  },
  

  gradeInfo: function (e) {
    wx.request({
      url: app.globalData.mainurl + "grade",
      data: {
        id: app.globalData.stu_id
      },
      method: "GET",
      success: function (res) {
        if(res.data.length=0){
          wx.showToast({
            title:"查询失败",
            icon:"none",
            duration:2000
          })
        }else{
          var num_1 = Object.getOwnPropertyNames(res.data.curr).length;
          var namearr = Object.getOwnPropertyNames(res.data.curr);
          var num_2 = Object.getOwnPropertyNames(res.data.grade).length;
          var namearr_1 = Object.getOwnPropertyNames(res.data.grade);
          for (var i = 0; i < num_1 - 2; i++) {
            app.globalData.grade[i * 3] = res.data.grade[namearr_1[i * 3 + 3]];
            app.globalData.grade[i * 3 + 1] = res.data.grade[namearr_1[i * 3 + 4]];
            app.globalData.grade[i * 3 + 2] = res.data.grade[namearr_1[i * 3 + 5]];
            app.globalData.curr[i] = res.data.curr[namearr[i + 2]];
          }
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

  attend: function (e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //加载院系和专业的信息，用于选择
    wx.request({
      url: app.globalData.mainurl + "departmentAndmajor",
      data: {
        
      },
      method: "GET",
      success: function (res) {
        
        var college=res.data.college;
        var major=res.data.major;
        var result=[];
        var result1=[];
        for(var k=0;k<college.length;k++){
          // console.log(college[k].name+" "+college[k].collegeId)
          result[parseInt(college[k].collegeId)]={};
          result[parseInt(college[k].collegeId)].name=college[k].name;
          result1[parseInt(college[k].collegeId)]={};
          result1[parseInt(college[k].collegeId)].name=[];
        }
        for(var j in major){
          result1[major[j].collegeId].name.push(major[j].name);
        }
        app.globalData.college=result;
        app.globalData.major=result1;
      },
      fail(res) {
        console.log("request fail");
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: app.globalData.mainurl + 'curr',
      method: "GET",
      data: {
        major: app.globalData.major,
        classes: app.globalData.class
      },
      success: function (res) {
        var colornum = 1;
        for (var i = 0; i < res.data.length; i++) {
          app.globalData.sw_kc[i] = {};
          app.globalData.sw_kc[i].xqj = res.data[i].xqj;
          app.globalData.sw_kc[i].skjc = res.data[i].skjc;
          app.globalData.sw_kc[i].skcd = res.data[i].skcd;
          app.globalData.sw_kc[i].kcmc = res.data[i].kcmc;
          app.globalData.sw_kc[i].bg = "color" + colornum++;
          app.globalData.sw_kc[i].teacher = res.data[i].teacher;
          app.globalData.sw_kc[i].skbj = res.data[i].skbj;
          app.globalData.sw_kc[i].zhouci = res.data[i].zhouci;
          app.globalData.sw_kc[i].skdd = res.data[i].skdd;
          if (colornum > 4) {
            colornum = 1;
          }
        }

      },
      fail(res) {
        wx.showToast({
          title: "获取信息失败",
          icon: "none",
          duration: 2000
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.classes = app.globalData.class;
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