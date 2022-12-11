// components/order-info.js
const api = require('../../utils/request').api
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    order: {
      type: Object,
      required: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    list: [],
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getImgList: function() {
      const orderId = this.properties.order.id
      api.getOrderImgList(orderId).then(res => {
        if(res.code === 200) {
          this.setData({
            list: res.data
          })
        }
      })
    },
    toDetail: function() {
      const {status} = this.properties.order
      // 未付款，先付款
      if(status === 1) {
        this.setData({
          show: true
        })
      }else if(status ===2) {
        const orderId = this.properties.order.id
        wx.navigateTo({
          url: '../../pages/detail/detail?id='+orderId,
        })
      }
    },
    onConfirm: function() {
      console.log('点击了确认')
      const {id} = this.properties.order
      api.toPayOrder(id).then(res => {
        if(res.code === 200) {
          this.setData({
            show: false
          })
          this.triggerEvent('customevent')
        }
      })
    },
    onClose: function() {
      console.log('点击了取消')
      this.setData({
        show: false
      })
    }
  },
  attached() {
    this.getImgList()
  }
})
