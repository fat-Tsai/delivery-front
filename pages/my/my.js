// pages/my/my.js
const api = require('../../utils/request').api
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: wx.getStorageSync('token') ? true : false,
    show: false,
    codeBody: {
      codeForOpenId: '',
      codeForPhone: ''
    }
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  popupShow() {
    this.setData({
      show: true
    })
  },
  gotoUserInfo() {
    console.log('跳转到用户信息页面')
  },
  /**
   * 获取用户手机号
   */
  getPhoneNumber(e) {
    // 用户授权登录
    if(e.detail.code) {
      var _that = this
      this.setData({
        ['codeBody.codeForPhone']: e.detail.code
      })
      console.log('用户确认登录')
      // 先获得openid
      wx.login({
        success: res => {
          if(res.code) {
            this.setData({
              ['codeBody.codeForOpenId']: res.code
            })
            api.getLogin(this.data.codeBody).then(res => {
              if(res.code === 200) {
                wx.setStorage({
                  key: "token",
                  data: res.data,
                  success() {
                    _that.setData({
                      isLogin: true
                    })
                    _that.setData({
                      show: false
                    })
                  }
                })
              }
            })
          } else {
            console.log('网络出错')
          }
        }
      })
    } else {
      console.log('用户取消授权登录')
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(this.data.isLogin)
    console.log(wx.getStorageSync('token'))
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