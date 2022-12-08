// pages/buy/buy.js
const api = require('../../utils/request').api
// 导入computed
const computedBehavior = require('miniprogram-computed').behavior
Page({
  /**
   * 页面的初始数据
   */
  behaviors: [computedBehavior],
  data: {
    type: 0, // 自取或外卖的标志位
    activeKey: 0, // 侧边栏
    categoryList: [],
    loading: true,
    imageURL: "../../static/logo.png",
    leftCur: 0,
    rightCur: 0,
    //box盒子高度数组
    boxheight: [],
    // 购物车列表
    cartList: [],
    // 购物车弹出层
    show: false,
    totalPrice: 0.00
  },
  computed: {
    totalPrice(data) {
      var price = 0.00
      data.cartList.map((item) => {
        price += (item.amount/100)*item.number
      })
      return price
    }
  },
  subCart(e) {
    console.log('我点击了删除购物车')
    const idx = e.target.id
    var that = this 
    api.shoppingCartSub(that.data.cartList[idx]).then(res => {
      if(res.code === 200) {
        console.log(res)
        that.data.cartList[idx].number = res.data.number
        // 待优化
        const len = that.data.cartList.length
        let arr = []
        for(let i=0;i<len;i++) {
          if(that.data.cartList[i].number) {
            arr.push(that.data.cartList[i])
          }
        }
        console.log("arr:",arr)
        this.setData({
          cartList: arr
        })
      }
    })
  },
  addCart(e) {
    console.log('我点击了添加购物车')
    console.log(e)
    console.log(e.target.id)
    const idx = e.target.id
    var that = this 
    api.shoppingCartAdd(that.data.cartList[idx]).then(res => {
      if(res.code === 200) {
        this.setData({
          [`cartList[${idx}].number`]: res.data.number
        })
      }
    })
  },
  toPay() {
    wx.navigateTo({
      url: '../pay/pay'
    })
    console.log('该跳转到支付页面了')
  },
  // 父子组件通信
  async refresh(e) {
    this.getCartList()
  },
  clearCart() {
    api.clearCart().then(res => {
      if(res.code === 200) {
        console.log('删除购物车成功')
        this.setData({
          cartList: [],
          totalPrice: 0
        })
      }
    })
  },
  onClose() {
    this.setData({
      show: false
    })
  },
  /**
   * 购物车弹出
   */
  popupShow() {
    this.setData({
      show: !this.data.show
    })
  },
  /**
   * 获取购物车列表
   */
  getCartList() {
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
  /**
   * 获取菜品分类
   */
  getCategoryList() {
    api.getCategoryList().then(res => {
      if(res.code === 200) {
        this.setData({
          categoryList: res.data
        })
      } else {
        Notify({ type: 'danger', message: res.msg || '网络错误，请稍后重试' });
      }
    })
  },
  switchChange() {
    this.setData({
      type: !this.data.type ? 1 : 0
    })
  },
  // 点击左侧分类，联动修改右侧菜品
  onChange(e) { // 修改下标值 e.detail
    let index = e.detail
    this.setData({
      activeKey: index,
      rightCur: this.data.categoryList[index].id,
      leftCur: this.data.categoryList[index].id
    })
  },
  /**
   * 右侧滚动，左侧配合
   */
  rightScroll(e) {
    let st = e.detail.scrollTop
    let boxarray = this.data.boxheight
    let _this = this
    for (var i = 0; i < boxarray.length; i++) {
      if ((st >= boxarray[i]-21) && (st < boxarray[i + 1]-21) ) { // 减去的数字可以转换为菜品分类的高度
        _this.setData({
          activeKey: i,
          leftCur: this.data.categoryList[i].id
        })
        return;
      }
    }
  },
   // 生命周期onReady(类似于mounted)
   computedHeight: function () {
    const _this = this;
    setTimeout(() => {
      //专门用来储存高度的
      let heightArr = [0]
      // 一开始的初始值
      let baseNum = 0
      const query = wx.createSelectorQuery() // 创建查询节点信息的对象
      query.selectAll('.category').boundingClientRect() // selectAll查询所有类名为category的节点; boundingClientRect
      query.selectViewport().scrollOffset()
      query.exec(function (res) {
        res[0].map(va => {
          baseNum += va.height
          heightArr.push(baseNum)
        })
        _this.setData({
          boxheight: heightArr
        })
      })
    }, 600);
    // console.log(this.data.boxheight)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取菜品分类
    this.getCategoryList();
    this.computedHeight();
    this.getCartList();
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
    // this.getTotalPrice()
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