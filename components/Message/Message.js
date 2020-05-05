// components/Message/Message.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 会话列表（结构定义如下）： 
     * friendId 
     * friendName 
     * friendAvatarUrl 
     * msgTime 
     * msg 
     * unreadMsgCount
     */
    'contact': {
      type: Object,
      value: {
        friendId: 0,
        friendName: "",
        friendAvatarUrl: "",
        msgTime: "",
        msg: "",
        kunreadMsgCount: 0
      },
      observer: function (newVal, oldVal) {
        // console.log(newVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
