// pages/pay/index.js
Page({

  data: {
    address:{},
    cart: [],
    totalPrice: 0,
    totalNum: 0
  },

  onShow: function () {
    let address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart");
    // 由于是支付，所以已经是选中状态
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      totalPrice += v.goods_price * v.num;
      totalNum += v.num;
    })
    this.setData({
      address,
      cart,
      totalPrice,
      totalNum
    });
  },
})