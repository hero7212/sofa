// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList: []
  },

  /**
   * 获取动态的帖子列表
   */
  getPostList(){
    var that = this;
    wx.request({
      url: ' http://mock.studyinghome.com/mock/5e5a6a78541f7920fe862139/demo/postList',
      success(res) {
        console.log(res);
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
  onLoad: function (options) {
    this.getPostList();
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