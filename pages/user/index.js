// pages/user/index.js
Page({
  data: {
    userinfo: null
  },
  onShow () {
    const userinfo = wx.getStorageSync("userinfo");
    this.setData({
      userinfo
    });
  }
})