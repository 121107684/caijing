// pages/seeall/seeall.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    alllist:[],
    cap:true,
    name: true,
    price: true,
    percent: true,
    volumn: true
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
    app.publicpost('/getSearchList/' + e.detail.value, 'GET', {}, searchlist);
    function searchlist(res) {
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    app.publicpost('/getAllCoins/cap/desc', 'GET', {}, alllist);
    function alllist(res) {
      that.setData({
        alllist: res.data.data
      })
    }
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
      }, 30000)
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
    var that = this
    app.publicpost('/getAllCoins/cap/desc', 'GET', {}, alllist);
    function alllist(res) {
      that.setData({
        alllist: res.data.data
      })
    }
  },
  titletap:function(e){
    // this.data[e.currentTarget.dataset.type] = !this.data[e.currentTarget.dataset.type];
    // var url = '/getAllCoins/' + e.currentTarget.dataset.type + "/" + (this.data[e.currentTarget.dataset.type] ? "desc" :"asc");
    // console.log(url)
    // app.publicpost(url, 'GET', {}, alllist);
    // function alllist(res) {
    //   this.setData({
    //     alllist: res.data.data
    //   })
    // }
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