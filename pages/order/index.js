// pages/order/index.js
Page({

  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      },
    ],
  },

  onShow() {
    // 1. 获取页面栈
    const pages = getCurrentPages();
    // 2. 获取当前页面栈
    let currentPage = pages[pages.length-1];
    let {type} = currentPage.options;
    console.log(type);
    this.handleInit(type -1);
  },
  handleInit(index) {
    // 修改原数组
    let {tabs} = this.data;
    tabs.forEach((v,i) => {
      index===i?v.isActive=true:v.isActive=false;
    });
    // 赋值到data中
    this.setData({
      tabs
    });
  },
  // 改变tab的时候，改变状态
  haldleTabsItemChange(e) {
    const {index} = e.detail;
    this.handleInit(index);
    // 修改原数组
    // let {tabs} = this.data;
    // tabs.forEach((v,i) => {
    //   index===i?v.isActive=true:v.isActive=false;
    // });
    // // 赋值到data中
    // this.setData({
    //   tabs
    // });
  },
})