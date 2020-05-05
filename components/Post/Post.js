// components/Post/Post.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //对外属性，即如果外部的wxml文件传入数据时，会把数据设置成properties的属性
    'post': {
      type:Object,
      value: {
        post_id: 0,
        connect_id: 0,
        influ_id: 0,
        is_couchsurfer: 0,
        is_fromtrans:0,
        title: "",
        content: "",
        imgs: [],
        location:"",
        if_trans:0,
        if_show:1,
        time_stamp: "",
        key: []
      },
      observer: function (newVal, oldVal) {
        // console.log(newVal)
      }
    }
  },

  ready: function () {
    // console.log(this.properties);
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
