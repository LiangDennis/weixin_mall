import { request } from "../../request/index.js";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    catesList: [],
    // 楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getNavList();
    this.getFloorList();
  },

  // 轮播图数据
  getSwiperList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata"
    }).then(result => {
      let {message} = result.data;
      this.setData({
        swiperList: message
      });
    });
  },
  getNavList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/catitems"
    }).then(result => {
      let {message} = result.data;
      this.setData({
        catesList: message
      });
    });
  },
  getFloorList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/home/floordata"
    }).then(result => {
      let {message} = result.data;
      this.setData({
        floorList: message
      });
    });
  }
})