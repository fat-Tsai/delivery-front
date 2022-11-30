const app = getApp()
const token = wx.getStorageSync('token')

const request = (method, url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.baseURL+url,
      method: method,
      data: method === 'POST' ? JSON.stringify(data) : data,
      header: {
        'token': token
      },
      success: res => {
        if(res.statusCode === 200) {
          if(res.data.code === 401) {
            // 需要刷新token
          }
          resolve(res.data)
        } else {
          reject()
        }
        // console.log('success:',res)
      },
      fail: err => {
        reject(err.data)
      }
    })
  })
}
const api = {
  getLogin: (data) => request('POST', `user/wxLogin`, data),
  getUserPhone: (data) => request('POST', `user/getPhone`, data),
  getCategoryList: () => request('GET',`category/list`),
  // getDishList: (data) => request('GET', `dish/list?categoryId=${data}`)
  getFlavorList: (data) => request('GET',`dish/getFlavor?id=${data}`)
}

module.exports = {
  api: api
}