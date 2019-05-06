let app =  getApp();

  Page({
      data:{
        src:""
      },


      onLoad:function(options){
        var that=this;
        that.setData({
          src:options.src,
        })
      }
  })