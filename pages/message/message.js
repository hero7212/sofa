// pages/message/message.js
var util = require('../../utils/util.js'); // 转换时间插件
var im = require('../../utils/webim_wx.js'); // 腾讯云 im 包
var imhandler = require('../../utils/im_handler.js'); // 这个是所有 im 事件的 js

// 获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   * 
   * contactList
   * 会话列表（结构定义如下）：
   * friendId
   * friendName
   * friendAvatarUrl
   * msgTime
   * msg
   * unreadMsgCount
   */
  data: {
    flag: 0,
    isNoData: false, // isNoData 用于判断是否无数据列表，然后页面做出无数据列表的反应 TODO 效果未实现
    contactList: []
  },

  /**
   * tabBar样式
   */
  actNav: function(event) {
    this.setData({
      flag: event.currentTarget.dataset.num
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this;
    wx.showLoading()
    // 会话列表所需参数初始化 需将当前会话好友数据清空
    imhandler.init({
      accountMode: app.data.im.accountMode,
      accountType: app.data.im.accountType,
      sdkAppID: app.data.im.sdkAppID,
      selType: im.SESSION_TYPE.C2C,
      imId: app.data.im.imId,
      imName: app.data.im.imName,
      imAvatarUrl: app.data.im.imAvatarUrl,
      friendId: null,
      friendName: null,
      friendAvatarUrl: null,
      contactListThat: that,
      chatThat: null
    })
    app.initImParams(function cbOk() {
      // 检查是否登录返回 true 和 false,不登录则重新登录
      if (im.checkLogin()) {
        that.initRecentContactList();
        // 初始化最近会话的消息未读数（监听新消息事件）
        im.syncMsgs(imhandler.onMsgNotify());
      } else {
        imhandler.login(that, app, function() {
          that.initRecentContactList();
          // 初始化最近会话的消息未读数（监听新消息事件）
          im.syncMsgs(imhandler.onMsgNotify());
        });
      }
      wx.hideLoading()
    })
  },

  /**
   * 拉取最近联系人列表
   */
  initRecentContactList: function() {
    im.Log.warn("开始拉取最近联系人列表");
    var that = this;
    // 真正获取会话列表的方法 count: 最近的会话数 ,最大可设置为 100 只获取有价值数据
    im.getRecentContactList({
      'Count': 10
    }, function(resp) {
      if (resp.SessionItem && resp.SessionItem.length > 0) {
        var contactList = resp.SessionItem.map((item, index) => {
          return {
            "friendId": item.To_Account,
            "friendName": item.C2cNick,
            "friendAvatarUrl": item.C2cImage,
            "msgTime": util.getDateDiff(item.MsgTimeStamp * 1000),
            "msg": item.MsgShow,
            "unreadMsgCount": item.UnreadMsgCount
          }
        })
        // 设置联系人列表
        that.setData({
          contactList: contactList,
          isNoData: true
        })
        that.updateUnread()
      } else {
        that.setData({
          isNoData: false,
        })
      }
    })
    im.Log.warn("成功拉取最近联系人列表");
  },
  /**
   * 更新未读消息数
   */
  updateUnread: function() {
    var that = this
    // 还需要获取未读消息数
    var sessionMap = im.MsgStore.sessMap();
    var contactList = that.data.contactList
    for (var i in sessionMap) {
      var session = sessionMap[i]
      if (session.unread() > 0) {
        contactList = contactList.map((item, index) => {
          if (item.friendId === session.id()) {
            item.unreadMsgCount = session.unread()
          }
          return item;
        })
      }
    }
    // 设置联系人列表
    that.setData({
      contactList: contactList
    })
  },
  /**
   * go chat.wxml
   */
  linkChat: function(e) {
    wx.navigateTo({
      url: '/pages/chat/chat?friendId=' + e.currentTarget.dataset.id +
        '&friendName=' + e.currentTarget.dataset.name +
        '&friendAvatarUrl=' + e.currentTarget.dataset.image,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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