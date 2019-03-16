// pages/usercenter/usercenter.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose: "1",
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
    teacherinfo: [],
    attendInfo: [],
    attendcode: "",
    attendCurr: "",
    examInfo: [],
    phone: [],
    collegeCurr:[],
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




  },

  begin_attend: function (e) {
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var locationInfo = res;
        wx.request({
          url: app.globalData.mainurl + "/attendInfo",
          data: {
            code: that.data.attendcode,
            id: app.globalData.stu_id,
            name: app.globalData.name,
            role: app.globalData.ID,
            classid: that.data.attendCurr,
            lat: locationInfo.latitude,
            lon: locationInfo.longitude,
            major: app.globalData.major,
          },
          success(res) {
            if (res.data.length != 0) {
              that.setData({
                attendInfo: res.data
              });
            }
          },
          fail(res) {
            wx.showToast({
              title: "考勤失败",
              icon: "none",
              duration: 2000
            });
          }
        });
      },
      fail(res) {
        wx.showToast({
          title: "考勤失败!获取位置信息失败！",
          icon: "none",
          duration: 2000
        })
      }
    })
  },
  stu_attend1: function (e) {
    this.setData({
      attendcode: e.detail.value
    });
  },
  stu_attend2: function (e) {
    this.setData({
      attendCurr: e.detail.value
    });
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
    var that = this;
    wx.request({
      url: app.globalData.mainurl + "teacher",
      data: {
        nameormajor: str
      },
      method: "GET",
      success: function (res) {
        if (res.data.length == 0) {
          wx.showToast({
            title: "查询失败",
            icon: "none",
            duration: 2000
          })
        } else {
          that.setData({
            teacherinfo: res.data,
          });
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //=======================
    var that = this;
    that.setData({
      choose: options.choose,
    })
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
    };
    if (that.data.choose == "1" && that.data.sw_kc.length == 0) {
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
          that.setData({
            sw_kc: app.globalData.sw_kc,
          });
        },
        fail(res) {
          wx.showToast({
            title: "获取信息失败",
            icon: "none",
            duration: 2000
          })
        }
      })
    }
    //查询成绩
    if (that.data.choose == "2") {
      wx.request({
        url: app.globalData.mainurl + "grade",
        data: {
          id: app.globalData.stu_id
        },
        method: "GET",
        success: function (res) {
          if (res.data.length = 0) {
            wx.showToast({
              title: "查询失败",
              icon: "none",
              duration: 2000
            })
          } else {
            var num_1 = Object.getOwnPropertyNames(res.data.curr).length;
            var namearr = Object.getOwnPropertyNames(res.data.curr);
            var namearr_1 = Object.getOwnPropertyNames(res.data.grade);
            for (var i = 0; i < num_1 - 2; i++) {
              app.globalData.grade[i * 3] = res.data.grade[namearr_1[i * 3 + 3]];
              app.globalData.grade[i * 3 + 1] = res.data.grade[namearr_1[i * 3 + 4]];
              app.globalData.grade[i * 3 + 2] = res.data.grade[namearr_1[i * 3 + 5]];
              app.globalData.curr[i] = res.data.curr[namearr[i + 2]];
            }
          }
          that.setData({
            grade: app.globalData.grade,
            curr: app.globalData.curr
          });
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
    //学生查询考勤信息
    if (that.data.choose == "3") {
      wx.request({
        url: app.globalData.mainurl + "attend",
        data: {
          stuid: app.globalData.stu_id
        },
        method: "GET",
        success: function (res) {
          if (res.data.length == 0) {
            wx.showToast({
              title: "查询失败",
              icon: "none",
              duration: 2000
            })
          } else {
            that.setData({
              attendInfo: res.data
            });
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
    }
    //加载院系和专业的信息，用于选择
    if (that.data.choose == "4") {
      wx.request({
        url: app.globalData.mainurl + "departmentAndmajor",
        data: {
        },
        method: "GET",
        success: function (res) {
          var college = res.data.college;
          var major = res.data.major;
          console.log(res.data)
          var result = [];
          var result1 = [];
          for (var k = 0; k < college.length; k++) {
            // console.log(college[k].name+" "+college[k].collegeId)
            result[k] = {};
            result[k].name = college[k].name;
            result[k].sid = college[k].collegeId
            result1[k] = {};
            result1[k].name = [];
            result1[k].sid = college[k].collegeId;
          }
          for (var j = 0; j < major.length; j++) {
            for (var n = 0; n < college.length; n++) {
              if (result1[n].sid == major[j].collegeId) {
                result1[n].name.push(major[j].name);
              }
            }
          }
          that.setData({
            areaLise: result,
            rowLise: result1,
          });
          console.log(that.data.rowLise);
          console.log(that.data.areaLise);
        },
        fail(res) {
          console.log("request fail");
        }
      })
    }
    //查询考试安排信息
    if (that.data.choose == "5") {
      wx.request({
        url: app.globalData.mainurl + "exam",
        data: {
          major: app.globalData.major,
          classes: app.globalData.class,
        },
        method: "GET",
        success: function (res) {
          that.setData({
            examInfo: res.data
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
    }
    if (that.data.choose == "6") {
      wx.showToast({
        title: "查询中...",
        icon: "loading",
      })
      wx.request({
        url: app.globalData.mainurl + "phone",
        data: {

        },
        success(res) {
          wx.hideToast({});
          that.setData({
            phone: res.data,
          })
        },
        fail(res) {
          wx.showToast({
            title: "查询失败",
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    if (that.data.choose == "7") {
      wx.showToast({
        title:"查询中...",
        icon:"loading"
      })
      wx.request({
        url:app.globalData.mainurl+"jxdg",
        data:{
          info:app.globalData.stu_id.substring(0,7),
        },
        success(res){
          wx.hideToast({});
          var i=0;
          var result=[];
          if(res.data.collegeone.length>res.data.collegetwo){
            if(res.data.collegeone.length>res.data.collegethree.length){
              i=res.data.collegeone.length;
            }else{
              i=res.data.collegethree.length
            }
          }else{
            if(res.data.collegetwo.length>res.data.collegethree.length){
              i=res.data.collegetwo.length;
            }else{
              i=res.data.collegethree.length;
            }
          }
          if(i<res.data.collegefour.length){
            i=res.data.collegefour.length
          }
          for(var n=0;n<i;n++){
            result[n]={};
            result[n].collegeone=res.data.collegeone[n]!=null?res.data.collegeone[n]:"";
            result[n].collegetwo=res.data.collegetwo[n]!=null?res.data.collegetwo[n]:"";
            result[n].collegethree=res.data.collegethree[n]!=null?res.data.collegethree[n]:"";
            result[n].collegefour=res.data.collegefour[n]!=null?res.data.collegefour[n]:"";
          }
          that.setData({
            collegeCurr:result,
          })
        },
        fail(res){
          wx.showToast({
            title:"查询失败",
            icon:"none",
            duration:2000
          })
        }
      })
    }
    that.setData({
      curr: app.globalData.curr
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