//app.js
App({
  data: {
    im: {
      sdkAppID: 1400357801, // 用户标识接入 SDK 的应用 ID，必填
      accountType: 36862, // 帐号体系集成中的 accountType，必填
      accountMode: 0, //帐号模式，0 - 独立模式 1 - 托管模式
      imId: null, // 用户的 id
      imName: null, // 用户的 im 名称
      imAvatarUrl: null, // 用户的 im 头像 url
      userSig: null // 用户通过 imId 向后台申请的签名值 sig
    }
  },

  globalData: {
    userInfo: null //有string nickName string avatarUrl
  },

  /**
   * 小程序开启
   */
  onLaunch: function() {
    //云开发环境初始化
    wx.cloud.init({
      env: "sofak-yun-prczq" //环境id
    })
    //------im-------
    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

  },


  /**
   * 初始化 im 参数，返回成功回调
   */
  initImParams: function(cbOk) {
    var that = this
    // 登录 初始化 im 参数
    // 注意：如果首次使用，后台需要创建【腾讯 im】账号
    wx.login({
      success: res => {
        //--
        var appid = 'wx745bb531c1033a58'
        var secret = '89b2c3fed4a8051b620a456eceb3aed5fb527a815590400078bd55a839ee3c41'
        var uri = '?appid=' + appid + '&secret=' + secret + '&js_code=' + res.code + '&grant_type=authorization_code'
        var url = 'https://api.weixin.qq.com/sns/jscode2session' + uri
        //--
        wx.request({
          url: url,
          method: 'GET',
          success: res => {
            // 通过 openid 获取【腾讯 im】签名值
            var generatedSigUrl = 'http://localhost:8080/generatedSig'
            var header = {
              "Content-Type": "application/x-www-form-urlencoded"
            };
            var 
            data = {
              "identifier": res.data.openid   //userID，用户登录即时通信 IM 时使用的用户名，即您 App 里的用户 ID。
            }
            that.data.im.imId = res.data.openid // ocGnM4nO9kZf6WANSo7H5GGBZVk4，即userID (userSig)
            //---------
            wx.request({
              url: generatedSigUrl,
              header: header,
              method: "POST",
              data: data,
              success: res => {
                // 初始化 im 数据 初始化完毕再返回回调
                that.data.im.userSig = res.data
                // 初始化 im 数据
                that.data.im.imName = '从前慢'  //userInfo.nickName 
                that.data.im.imAvatarUrl = 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1055388296,1425226147&fm=26&gp=0.jpg'  //userInfo.avatarUrl

                cbOk()
              }
            })
          }
        })
      }
    })

  }






})