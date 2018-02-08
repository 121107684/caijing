// pages/seeall/seeall.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alllist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })
    app.publicpost('/getAllCoins', 'GET', {}, alllist);
    function alllist(res) {
      // for (var i=0;i<=res.data.data.length;i++){
      //   //var seto = new String(res.data.data[i].percent_change_24h)
      //   if (res.data.data[i].percent_change_24h.indexOf("-")>0){
      //     console.log(res.data.data[i].percent_change_24h)
      //     //res.data.data[i].hasbl = true;
      //   }
      // }
      that.setData({
        alllist: res.data.data
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
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
    var that = this
    app.publicpost('/getAllCoins', 'GET', {}, alllist);
    function alllist(res) {
      that.setData({
        alllist: res.data.data
      })
    }
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