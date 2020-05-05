//index.js

// pages/find/find.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    postList: [],
    flag: 0, //默认最新
    bg: ""
  },

  /**
   * 获取首页轮播图数据
   */
  getSwiperList() {
    var that = this;
    wx.request({
      url:'http://mock.studyinghome.com/mock/5e5a6a78541f7920fe862139/demo/swiper',
      success(res) {
        // console.log(res);
        if (res.data.code === 0) {
          that.setData({
            swiperList: res.data.data.swiperList
          })
        }
      }
    })
  },

  /**
   * 首先加载， 默认最新
   */
  getPostList(e) {
    var that = this;
    wx.request({
      url: 'http://mock.studyinghome.com/mock/5e5a6a78541f7920fe862139/demo/postList',
      success(res) {
        //console.log(res);
        if (res.data.code === 0) {
          that.setData({
            postList: res.data.data.postList
          })
        }

      }
    })
  },

  /**
   * 点击最新按钮，获取数据
   */
  newClick: function(event) {
    console.log(event);
    var that = this;
    that.setData({
      flag: event.currentTarget.dataset.num
    });
    //传数据
    wx.request({
      url: 'https://www.studyinghome.com/mock/5e5a6a78541f7920fe862139/demo/postList',
      success(res) {
        //console.log(res);
        if (res.data.code === 0) {
          that.setData({
            postList: res.data.data.postList
          })
        }

      }
    })
  },

  /**
   * 点击高赞按钮，获取数据
   */
  zanClick: function(event) {
    console.log(event);
    var that = this;
    that.setData({
      flag: event.currentTarget.dataset.num
    });
    wx.request({
      url: 'https://www.studyinghome.com/mock/5e5a6a78541f7920fe862139/demo/postList',
      success(res) {
        if (res.data.code === 0) {
          that.setData({
            postList: res.data.data.postList
          })
        }

      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //1 获取首页轮播图数据，调用函数
    this.getSwiperList();
    //2.调用帖子列表数据的函数（最新）
    this.getPostList();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})