// pages/components/goods-card.js
const api = require('../../utils/request').api
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    category: {
      type: Object, // 数据类型
      required: true // 必填项
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    idx: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 加入购物车
     */
    addCart() {
      console.log('addCart')
    },
    selectApply(e) {
      console.log(e)
      let id = e.currentTarget.id
      let datasetId = e.currentTarget.dataset.id
      this.setData({
        [`category.flavorList[${id}].isActive`]: datasetId
      })
      console.log(this.properties.category.flavorList)
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
