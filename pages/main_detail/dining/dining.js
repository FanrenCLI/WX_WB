var app = getApp()

Page({
    data: {
        navbar: ['第一食堂', '第二食堂','第三食堂','我的菜单'],
        currentTab: 0,
        contentlist:[{title:"金汤酸菜鱼",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"},
        {title:"麻辣香锅",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"}
       ],
        contentlist1:[{title:"金汤酸菜鱼",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"},
        {title:"麻辣香锅",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"}
      ],
        contentlist2:[{title:"金汤酸菜鱼",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"},
        {title:"麻辣香锅",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"}
      
                    ],
        contentlist3:[],
        sum_price:"0.0",
        seatnum:"none",
        info:"",
        persondining:[{title:"特辣烤鱼",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"10.9"},
        {title:"麻辣香锅",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"11.9"},
        {title:"重庆火锅",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"13.9"}],
        weeklydining:[{title:"西瓜粥",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"},
        {title:"菜粥",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"},
        {title:"小米粥",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"}],
        persondining1:[{title:"干锅牛蛙",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"15.9"},
        {title:"麻辣羊肉",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"3.9"},
        {title:"重庆火锅",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"14.9"}],
        weeklydining1:[{title:"清蒸鱼头",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"},
        {title:"红枣糕点",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"},
        {title:"海鲜拼盘",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"}],
        persondining2:[{title:"特辣烤鱼",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"21.9"},
        {title:"麻辣香锅",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"24.9"},
        {title:"重庆火锅",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"16.9"}],
        weeklydining2:[{title:"清蒸鱼头",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"},
        {title:"红枣糕点",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"},
        {title:"海鲜拼盘",content:"浓郁的香味卷着鲜嫩鸡肉，口感鲜美",price:"19.9"}],
    },
    surechoose:function(e){
      var that=this;
      wx.showToast({
        title: '下单中...',
        icon: 'loading'
      });
      
      wx.request({
        url:app.globalData.mainurl+"surechoose",
        data:{
          id:app.globalData.stu_id,
        },
        method:"GET",
        success:function(res){
          that.setData({
            seatnum:res.data
          })
          wx.hideToast();
        },
        fail:function(res){
          wx.showToast({
            title:"下单失败",
            icon:"none",
            duration:2000
          })
        }
      })
    },
    infoInput:function(e){
      this.setData({
        info:e.detail.value
      })
    },
    deletTap:function(e){
      this.data.contentlist3.splice(e.target.dataset.index,1);
      this.setData({
        contentlist3:this.data.contentlist3,
        sum_price:(parseFloat(this.data.sum_price)-parseFloat(e.target.dataset.price)).toFixed(1)
      })
    },
    chooseitem:function(e){
      this.data.contentlist3.push({title:e.target.dataset.title,content:e.target.dataset.content,price:e.target.dataset.price})
      this.setData({
        contentlist3:this.data.contentlist3,
        sum_price:(parseFloat(this.data.sum_price)+parseFloat(e.target.dataset.price)).toFixed(1)
      })
    },
    // 导航切换监听
    navbarTap: function (e) {
        console.debug(e);
        this.setData({
            currentTab: e.currentTarget.dataset.idx
        });
    },
    onLoad:function(e){
      var that=this;
      wx.showToast({
        title: '查询中...',
        icon: 'loading'
      });
      
      wx.request({
        url:app.globalData.mainurl+"dining",
        data:{
          id:app.globalData.stu_id,
        },
        method:"GET",
        success:function(res){
          console.log(res.data)
          that.setData({
            contentlist:res.data.result,
            contentlist1:res.data.result1,
            contentlist2:res.data.result2,
            persondining:res.data.person,
            persondining1:res.data.person1,
            persondining2:res.data.person2
          })
          wx.hideToast();
        },
        fail:function(res){
          wx.showToast({
            title:"查询失败",
            icon:"none",
            duration:2000
          })
        }
      })
    }
})
