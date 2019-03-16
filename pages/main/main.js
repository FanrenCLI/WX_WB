let app = getApp();

Page({
  data: {
    "index_list": [{
      "url": "../main_detail/learnVideo/learnVideo",
      "img": "video.png",
      "name": '学习视频',
      "id": 0,
      "dis": ''
    }, {
      "url": "../main_detail/jxkp/jxkp",
      "img": "jiaoxue.png",
      "name": '教学考评',
      "id": 1,
      "dis": ''
    }, {
      "url": "../main_detail/resource/resource",
      "img": "resource.png",
      "name": '资源下载',
      "id": 2,
      "dis": ''
    }, {
      "url": "../main_detail/jwtz/jwtz",
      "img": "tongzhi.png",
      "name": '教务通知',
      "id": 3,
      "dis": ''
    }, {
      "url": "../main_detail/wjdc/wjdc",
      "img": "wenjuan.png",
      "name": '问卷调查',
      "id": 4,
      "dis": ''
    }, {
      "url": "../main_detail/discussion/discussion",
      "img": "shequ.png",
      "name": '社区讨论',
      "id": 5,
      "dis": ''
    }, {
      "url": "../main_detail/leisureClass/leisureClass",
      "img": "classes.png",
      "name": '空闲教室',
      "id": 6,
      "dis": ''
    }, {
      "url": "../main_detail/more/more",
      "img": "more.png",
      "name": '更多',
      "id": 7,
      "dis": ''
    }],
    weather:{},
    daytimes:45
  },
  happyblock:function(res){
    wx.navigateTo({
      url:"../main_detail/happyblock/happyblock",
    })
  },
  learnblock:function(res){
    wx.navigateTo({
      url:"../main_detail/learnblock/learnblock"
    })
  },
  onLoad:function(res){
    var that=this;
    wx.request({
      url:"http://wthrcdn.etouch.cn/weather_mini?city=南通",
      success(res){
        var backdata=res.data.data.forecast[0];
        var weather={};
        weather.date=backdata.date.substring(3);
        weather.temperature=backdata.low.substring(3)+"~"+backdata.high.substring(3);
        weather.wind=backdata.fengxiang;
        weather.status=backdata.type;
        weather.ganmao=res.data.data.ganmao;
        weather.winddegree=backdata.fengli.substring(9,backdata.fengli.indexOf("级")+1);
        that.setData({
          weather:weather,
        })
      }
    })
  },
})