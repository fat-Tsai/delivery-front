// pages/my/my.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    imgList: [
      {
        id: 1,
        imgURL: '../../static/images/my_bg.jpg'
      },{
        id: 2,
        imgURL: '../../static/images/bg1.png'
      },{
        id: 3,
        imgURL: '../../static/images/bg2.png'
      }],
    array: [{
      message: 'foo',
    }, {
      message: 'bar'
    }]
  },
  test() {
    wx.request({
      url: 'http://localhost:9979/user/test',
      method: 'POST',
      data: {
        code: '123'
      },
      success: res => {
        if(res.code === 200) {
          console.log(res.msg)
        }
      }
    })
  },
  // 事件处理函数
  
  onLoad() {
    
  },
})
