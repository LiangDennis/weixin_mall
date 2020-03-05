import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
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
  async getSwiperList() {
    // request({
    //   url: "/home/swiperdata"
    // }).then(result => {
    //   let {message} = result.data;
    //   this.setData({
    //     swiperList: message
    //   });
    // });
    const res = await request({url:"/home/swiperdata"});
    this.setData({
      swiperList: res
    });
  },
  // 导航数据
  async getNavList() {
    // request({
    //   url: "/home/catitems"
    // }).then(result => {
    //   let {message} = result.data;
    //   this.setData({
    //     catesList: message
    //   });
    // });
    const res = await request({url: "/home/catitems"});
    this.setData({
      catesList: res
    });
  },
  // 楼层数据
  async getFloorList() {
    // request({
    //   url: "/home/floordata"
    // }).then(result => {
    //   let {message} = result.data;
    //   this.setData({
    //     floorList: message
    //   });
    // });
    const res = await request({url: "/home/floordata"});
    this.setData({
      floorList: res
    });
  }
})