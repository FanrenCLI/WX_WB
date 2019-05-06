let app =  getApp();

  Page({
      data:{
        resource:[{resourceName:"asdasd",uploaderName:"fanren",uploadTime:'2018-2-12'}],
        info:'',
      },
      Infoinput:function(e){
        this.setData({
          info:e.detail.value
        })
      },
      searchbyinfo:function(e){
        var that=this;
        wx.showToast({
          title:"搜索中...",
          icon:"loading"
        })
        wx.request({
          url:app.globalData.mainurl+"searchResourceByInfo",
          data:{
            info:that.data.info,
          },
          success(res){
            that.setData({
              resource:res.data,
            })
            wx.hideToast({});
          },
          fail(res){
            wx.showToast({
              title:"搜索失败",
              icon:'none',
              duration:2000
            })
          }
        })
      },
      downloadfile:function(e){
        console.log(e.currentTarget.dataset.url)
        wx.downloadFile({
          // 示例 url，并非真实存在
          url: e.currentTarget.dataset.url,
          // url:"http://39.105.26.229:8080/asd.html",
          success(res) {
            const filePath = res.tempFilePath;
            wx.saveFile({
              tempFilePath: filePath,
              success(res) {
                console.log(res.savedFilePath)
                wx.openDocument({
                  filePath:res.savedFilePath,
                  success(res) {
                    console.log('打开文档成功')
                  },
                  fail(res){
                    console.log("fail")
                  }
                })
              }
            });
            
          }
        })
        
      },
      onLoad:function(e){
        var that=this;
        wx.showToast({
          title:"查询中...",
          icon:"loading"
        })
       wx.request({
         url:app.globalData.mainurl+"downloadurl",
         data:{

         },
         success(res){
          that.setData({
            resource:res.data,
          })
          console.log(that.data.resource)
         },
         fail(res){
          wx.showToast({
            title:"查询失败",
            icon:"none",
            duration:2000
          })
         }
       })
      },

  })
