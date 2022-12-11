// pages/pay/pay.js
const api = require('../../utils/request').api
const computedBehavior = require('miniprogram-computed').behavior
// import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '', // 页面手机号
    radio: '1', // 支付方式
    cartList: [],
    message: '', // 订单备注
    // 弹窗dialog,用来确认是否付款
    show: false,
    // 自取或者外卖
    type: '',
    orderParam: null
  },
  behaviors: [computedBehavior],
  computed: {
    totalPrice(data) {
      var price = 0.00
      data.cartList.map((item) => {
        price += (item.amount/100)*item.number
      })
      return price
    }
  },
  onConfirm: function() {
    const {id} = this.data.orderParam
      api.toPayOrder(id).then(res => {
        if(res.code === 200) {
          this.setData({
            show: false
          })
          // 跳转到商品详情页
            wx.navigateTo({
              url: `../detail/detail?id=${id}`,
            })
          // }
        }
      })
  },
  onClose: function() {
    this.setData({
      show: false
    })
  },
  pay: function() {
    const params = {
      type: this.data.type,
      addressBookId: '',
      payMethod: this.data.radio,
      amount: this.data.totalPrice,
      phone: this.data.value,
      remark: this.data.message
    }
    console.log('你点击了付款')
    // 后端生成订单
    api.addOrder(params).then(res => {
      if(res.code === 200) {
        this.setData({
          orderParam: res.data,
          // 询问是否付款
          show: true
        })
      }
    })
  },
  getPhone: function(code) {
    api.getPhone(code).then(res=> {
      if(res.code === 200) {
        this.setData({
          value: res.data
        })
      }
    })
  },
  getPhoneNumber: function(e) {
    let {code} = e.detail
    this.getPhone(code)
  },
  getCartList: function() {
    api.getShoppingCartList().then(res => {
      if(res.code === 200) {
        this.setData({
          cartList: res.data
        })
      }else {
        console.log('获取购物车列表失败')
      }
    })
  },
  chooseTime: function() {
    console.log('点击了取餐时间')
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getCartList()
    this.getPhone()
    this.setData({
      type: options.type ? 1 : 2
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})