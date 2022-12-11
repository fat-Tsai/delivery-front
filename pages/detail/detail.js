// pages/detail/detail.js
const api = require('../../utils/request').api
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId: '',
    list: [],
    order: null
  },
  getList: function() {
    api.getOrderDetailList(this.data.orderId).then(res => {
      if(res.code === 200) {
        this.setData({
          list: res.data
        })
      }
    })
  },
  getOrder: function() {
    api.getOrderInfo(this.data.orderId).then(res => {
      if(res.code === 200) {
        this.setData({
          order: res.data
        })
        console.log(this.data.order)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      orderId: options.id
    })
    this.getList()
    this.getOrder()
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