import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  data: {
    goodsObj:{}
  },
  // 商品对象，由于goodsObj是在异步请求中，所以无法直接获取到值
  goodsInfo:{},

  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({url: "/goods/detail",data:{goods_id}});
    this.goodsInfo = goodsObj;
    this.setData({
      // 优化页面只渲染的属性
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, ".jpg"),
        goods_price: goodsObj.goods_price,
        pics:goodsObj.pics
      }
    });
  },
  // 轮播图的预览
  handlePreviewImage(e) {
    // 1.构造要预览图片的数组
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid);
    // 2.需要接收传递过来的索引值
    const {current} = e.currentTarget.dataset;
    wx.previewImage({
      current, //首先预览
      urls // 需要预览的图片数组
    });
  },
  // 点击 加入购物车
  handleCartAdd() {
    // 1. 获取缓存中的数据，第一次为空，需要转换
    let cart = wx.getStorageSync("cart")||[];
    // 2. 判断
    let index = cart.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    if(index === -1) {
      // 3.不存在，第一次添加
      this.goodsInfo.num = 1;
      this.goodsInfo.checked = true;
      cart.push(this.goodsInfo);
    }else {
      // 4.已经存在 num++
      cart[index].num++;
    }
    // 5.重新填充缓存
    wx.setStorageSync("cart", cart);
    // 6. 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // 防止用户连续多次点击
      mask: true
    });
  }
})