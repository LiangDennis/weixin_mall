// components/UpImg/UpImg.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    src: {
      type: String,
      value: ''
    },
    index: {
      type: Number,
      value: -1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImageDelete(e) {
      // 图片索引
      const {index} = e.currentTarget.dataset;
      // 传递给父组件的的方式
      this.triggerEvent("RevomeImg",{index}, {});
    },
    handleImagePreview(e) {
      const {index} = e.currentTarget.dataset;
      this.triggerEvent("ImagePreview",{index}, {});
    }
  }
})
