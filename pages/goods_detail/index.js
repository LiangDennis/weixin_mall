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
  handlePreviewImage(e) {
    // 1.构造要预览图片的数组
    const urls = this.goodsInfo.pics.map(v=>v.pics_mid);
    // 2.需要接收传递过来的索引值
    const {current} = e.currentTarget.dataset;
    wx.previewImage({
      current, //首先预览
      urls // 需要预览的图片数组
    });
  }
})