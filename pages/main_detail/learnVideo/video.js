let app =  getApp();

  Page({
      data:{
        src:"",
        title:'这个是标题',
        time:"2018-5-4",
        auth:"fanren"
      },
      onLoad:function(options){
        var that=this;
        that.setData({
          src:app.globalData.src,
          title:options.title,
          auth:options.auth,
          time:options.time
        })
      },
      pauseplay:function(res){
        console.log(asd);
      }
  })