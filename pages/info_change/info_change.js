// pages/info_change/info_change.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: app.globalData.change_info.id,
    info: app.globalData.change_info.info,
    change_info: ""
  },
  change_info_input: function (e) {
    this.setData({ change_info: e.detail.value })
  },
  save_info: function (e) {
    if (this.data.id == "tel") {
      app.globalData.tel = this.data.change_info;
    } else {
      app.globalData.qq = this.data.change_info;
    }
    let currentPages = getCurrentPages();
    let prevpage = currentPages[currentPages.length - 2];
    prevpage.setData({
      tel: app.globalData.tel,
      qq: app.globalData.qq,
    })

    wx.switchTab({
      url: "../usercenter/usercenter"
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      id: app.globalData.change_info.id,
      info: app.globalData.change_info.info,
    })
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