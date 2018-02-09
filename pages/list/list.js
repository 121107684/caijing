// pages/list/list.js
const app = getApp();
var sliderWidth = 96;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    background: [],
    uplist:[],
    downlist:[],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 20000,
    duration: 500,
    tabs: ["涨幅榜", "跌幅榜", "市值排行"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 0,
    tt:''
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    var that = this
    this.setData({
      inputVal: e.detail.value
    });
    app.publicpost('/getSearchList/' + e.detail.value, 'GET', {},searchlist);
    function searchlist(res){
      console.log(res)
      for (var i = 0; i < res.data.data.length; i++) {
        backdata(res.data.data[i])
      }
      that.setData({
        searchlistdata: res.data.data
      });
    }
    function backdata(obj) {
      if (obj.percent_change_24h.indexOf("-") > -1) {
        obj.hasbl = true;
      } else {
        obj.hasbl = false;
      }
    }
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth/that.data.tabs.length),
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          sliderWidth: res.windowWidth / that.data.tabs.length
        });
      }
    });
    app.publicpost('/getFocusCoins','GET',{},getlist)
    app.publicpost('/getWaveList/down', 'GET', {}, downlist)
    app.publicpost('/getWaveList/up', 'GET', {}, uplist)
    app.publicpost('/getMarketCapList', 'GET', {}, caplist)
    function caplist(res){
      var fzarr = [];
      for (var i = 0; i < res.data.data.length; i++) {
        fzarr.push(backdata(res.data.data[i]))
      }
      that.setData({
        caplist: fzarr
      })
    }
    function backdata(obj){ 
      if (obj.percent_change_24h.indexOf("-") > -1) {
        obj.hasbl = true;
      }else{
        obj.hasbl = false;
      }
      return obj
    }
    function getlist(res){
      
      var fzarr = []
      for(var i=0;i<res.data.data.length;i){
        var temparr = []
        backdata(res.data.data[i])
        temparr.push(backdata(res.data.data[i]))
        temparr.push(backdata(res.data.data[i+1]))
        temparr.push(backdata(res.data.data[i+2]))
        i=i+3;
        fzarr.push(temparr)
      }
      that.setData({
        background:fzarr
      })
    }
    function uplist(res){
      that.setData({
        uplist: res.data.data
      })
      wx.stopPullDownRefresh()
    }
    function downlist(res) {
      that.setData({
        downlist: res.data.data
      })
    }
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
    var that = this
    this.setData({
      inter: setInterval(function () {
        that.onLoad()
      }, app.globalData.timelong)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
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
    this.onLoad();
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