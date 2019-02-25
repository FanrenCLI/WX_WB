// pages/usercenter/usercenter.js
let app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: app.globalData.name,
    ID: app.globalData.ID,
    sex: app.globalData.sex,
    stu_id: app.globalData.stu_id,
    department: app.globalData.department,
    major: app.globalData.major,
    class: app.globalData.class,
    tel: app.globalData.tel,
    qq: app.globalData.qq,
    wx: app.globalData.wx
  },

  change_tel: function (e) {
    app.globalData.change_info.id = "tel";
    app.globalData.change_info.info = this.data.tel;
    wx.navigateTo({

      url: '../info_change/info_change',
    })
  },
  change_qq: function (e) {
    app.globalData.change_info.id = "qq";
    app.globalData.change_info.info = this.data.qq;
    wx.navigateTo({
      url: '../info_change/info_change',
    })
  },
  sign_out:function(e){
    wx.redirectTo({
      url: '../index/index'
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
    // this.setData({
    //   name: app.globalData.name,
    //   ID: app.globalData.ID,
    //   sex: app.globalData.sex,
    //   stu_id: app.globalData.stu_id,
    //   department: app.globalData.department,
    //   major: app.globalData.major,
    //   class: app.globalData.class,
    //   tel: app.globalData.tel,
    //   qq: app.globalData.qq,
    //   wx: app.globalData.wx
    // })
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