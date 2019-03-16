let app =  getApp();

  Page({
      data:{
        src:""
      },
      onLoad:function(res){
        this.setData({
          src:app.globalData.src,
        })   
      }
  })