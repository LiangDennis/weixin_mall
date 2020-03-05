// pages/goods_list/index.js
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      },
    ]
  },

  onLoad: function (options) {
    console.log(options);
  },

  // tabs改变 从子组件传递过来的
  haldleTabsItemChange(e) {
    const {index} = e.detail;
    // 修改原数组
    let {tabs} = this.data;
    tabs.forEach((v,i) => {
      index===i?v.isActive=true:v.isActive=false;
    });
    // 赋值到data中
    this.setData({
      tabs
    });
  }
})