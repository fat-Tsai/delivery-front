// pages/components/goods-card.js
const api = require('../../utils/request').api
const computedBehavior = require('miniprogram-computed').behavior
Component({
  /**
   * 组件是否样式隔离
   */
  options: {
    styleIsolation: 'apply-shared'
  },
  behaviors: [computedBehavior],
  /**
   * 组件的属性列表
   */
  properties: {
    category: {
      type: Object, // 数据类型
      required: true // 必填项
    },
    type: Number,
    required: true,
    cartList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isShow: false,
    show: false,
    idx: '',
    popupCart: {
      name: '',
      dishId: '',
      setmealId: '',
      dishFlavor: '',
      amount: 0.00,
      image: '',
      number: null
    },
    setmealShow: false,
    // 商品的件数
    // count: 0
  },
  computed: {
    getCartNum(properties) {
      return properties.cartList.reduce((acc, cur) => {
        if(cur.dishId === properties.category.id) {
          return acc+cur.number
        }
        return acc
      },0)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    subCart() {
      api.shoppingCartSub(this.properties.popupCart).then(res => {
        if(res.code === 200) {
          console.log("删除购物车",res)
          this.setData({
            popupCart: res.data,
            show: false
          })
          if(res.data.number === 0) {
            this.setData({
              setmealShow: false
            })
          }
          this.triggerEvent('customevent', this.properties.popupCart)
        }else {
          console.log('删除购物车失败')
        }
      })
    },
    /**
     * 加入购物车
     */
    addCart() {
      console.log('addCart')
      this.setData({
        setmealShow: true
      })
      if(this.properties.type === 1) {
        const arr = this.properties.category.flavorList.map(item => {
          return item.value[item.isActive]
        })
        this.setData({
          ['popupCart.dishFlavor']: arr.length ? JSON.stringify(arr): '',
          ['popupCart.dishId']: this.properties.category.id
        })
      }else {
        this.setData({
          ['popupCart.setmealId']: this.properties.category.id
        })
      }
      this.setData({
        ['popupCart.name']: this.properties.category.name,
        ['popupCart.amount']: this.properties.category.price,
        ['popupCart.image']: this.properties.category.image
      })
      console.log('打印口味出来看看',this.data.popupCart)
      // 向后端发送请求
      this.properties.popupCart.id = null
      api.shoppingCartAdd(this.properties.popupCart).then(res => {
        if(res.code === 200) {
          this.setData({
            popupCart: res.data,
            show: false
          })
          // 触发父组件
          this.triggerEvent('customevent', this.properties.popupCart)
        } else {
          console.log('加入购物车失败')
        }
      })
    },
    selectApply(e) {
      // console.log(e)
      let id = e.currentTarget.id
      let datasetId = e.currentTarget.dataset.id
      this.setData({
        [`category.flavorList[${id}].isActive`]: datasetId
      })
      // console.log(this.properties.category.flavorList)
      console.log('你刚刚切换了口味',this.properties.category.flavorList[id].value[datasetId])
    },
    /**
     * 点击选规格之后，进行菜品口味选择
     */
    showDetailGoods() {
      this.setData({
        show: true
      })
    },
    onClose() {
      this.setData({
        show: false
      })
    }
  }
})
