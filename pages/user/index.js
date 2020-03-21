// pages/user/index.js
Page({
  data: {
    userinfo: null,
    // 商品收藏的数量
    collectNum: 0
  },
  onShow () {
    const userinfo = wx.getStorageSync("userinfo");
    const collectNum = wx.getStorageSync("collect").length;
    this.setData({
      userinfo,
      collectNum
    });
  }
})