const app = getApp()
// const token = wx.getStorageSync('token')
const token = wx.getStorageSync("token")

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
  getFlavorList: (data) => request('GET',`dish/getFlavor?id=${data}`),
  shoppingCartAdd: (data) => request('POST',`cart/add`,data),
  shoppingCartSub: (data) => request('POST',`cart/sub`,data),
  getShoppingCartList: () => request('GET',`cart/list`),
  clearCart: () => request('POST',`cart/clear`),
  getPhone: () => request('GET',`user/phone`),
  addOrder: (data) => request('POST',`order/submit`,data),
  getOrderList: () => request('GET',`order/list`),
  getOrderImgList: (data) => request('GET',`orderDetail/imgList?orderId=${data}`),
  toPayOrder: (data) => request('POST',`order/pay?id=${data}`),
  getOrderDetailList: (data) => request('GET',`orderDetail/list?orderId=${data}`),
  getOrderInfo: (data) => request('GET',`order?orderId=${data}`)
}

module.exports = {
  api: api
}