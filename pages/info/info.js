// pages/info/info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heidata:true,
    infodata:{},
    codeEXinfolist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    wx.setNavigationBarTitle({
      title: options.id//页面标题为路由参数
    })
    app.publicpost('/getCoinExchangeList/' + options.id + "/" + Trim(options.title,'g'), 'GET', {}, codeEXinfo)
    app.publicpost('/getCoinDetails/' + options.id + "/" + Trim(options.title, 'g'), 'GET', {}, codeinfo)
    // app.publicpost('/getCoinExchangeList/BTC/Bitcoin', 'GET', {}, codeEXinfo)
    // app.publicpost('/getCoinDetails/BTC/Bitcoin', 'GET', {}, codeinfo)
    function codeEXinfo(res){
      that.setData({
        codeEXinfolist: res.data.data
      })
    }
    function codeinfo(res){
      that.setData({
        infodata:res.data.data
      })
    }

  },
  showorhide:function(){
    this.setData({
      heidata: !this.data.heidata
    })
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
function Trim(str, is_global) {
  var result;
  result = str.replace(/(^\s+)|(\s+$)/g, "");
  if (is_global.toLowerCase() == "g") {
    result = result.replace(/\s/g, "");
  }
  return result;
}