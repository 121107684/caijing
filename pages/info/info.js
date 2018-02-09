// pages/info/info.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heidata:true,
    infodata:{},
    codeEXinfolist:[],
    moretext:"查看更多"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    wx.setStorageSync('datas', options)
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
      if (res.data.data.percent_change_24h.indexOf("-") > -1) {
        that.setData({
          hasbl:true
        })
      } else {
        that.setData({
          hasbl: false
        })
      }
      wx.stopPullDownRefresh()
    }

  },
  showorhide:function(){
    this.setData({
      heidata: !this.data.heidata,
      moretext: !this.data.heidata?'查看更多':'点击收起'
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
     var that = this;
     var opc = wx.getStorageSync('datas')
    this.setData({
      inter: setInterval(function () {
        that.onLoad(opc)
      }, app.globalData.timelong)
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide:function () {
    var that = this
    this.setData({
      inter: clearInterval(that.data.inter)
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    var that = this
    this.setData({
      inter: clearInterval(that.data.inter)
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    var opc = wx.getStorageSync('datas')
    this.onLoad(opc);
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
  console.log(str)
  result = str.replace(/(^\s+)|(\s+$)/g, "");
  if (is_global.toLowerCase() == "g") {
    result = result.replace(/\s/g, "");
  }
  return result;
}