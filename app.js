// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    // const logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)

    // 登录
    // wx.login({
    //   success: res => {
    //     if(res.code) {
    //       console.log(res.code)
    //     }else {
    //       console.log('登录失败！' + res.errMsg)
    //     }
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    baseURL: 'http://localhost:9979/'
  }
})
