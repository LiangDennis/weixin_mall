// components/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  data: {

  },

  methods: {
    // 点击事件
    handleItemTap(e) {
      // 1.获取点击索引
      const {index} = e.currentTarget.dataset;
      // 2.触发父组件中的事件 自定义
      this.triggerEvent("tabsItemChange",{index});
    }
  }
})
