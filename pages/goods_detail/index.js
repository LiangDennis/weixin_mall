import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  data: {
    goodsObj:{},
    isCollect: false
  },
  // 商品对象，由于goodsObj是在异步请求中，所以无法直接获取到值
  goodsInfo:{},

  onShow: function () {
    // 1. 修改onShow 多次进入 需要获取收藏值
    const pages =  getCurrentPages();
    const options = pages[pages.length-1].options;
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },

  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({url: "/goods/detail",data:{goods_id}});
    this.goodsInfo = goodsObj;
    // 2. 缓存中获取收藏 有可能是空数组 商品收藏
    const collect = wx.getStorageSync("collect")||[];
    // 3. 判断当前商品是否收藏 商品收藏
    let isCollect = collect.some(v=> v.goods_id===this.goodsInfo.goods_id);
    this.setData({
      // 优化页面只渲染的属性
      goodsObj: {
        goods_name: goodsObj.goods_name,
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, ".jpg"),
        goods_price: goodsObj.goods_price,
        pics:goodsObj.pics
      },
      isCollect
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
  },
  // 点击 收藏
  handleCollect() {
    // 1. 缓存中的收藏
    let collect = wx.getStorageSync("collect")||[];
    // 2. 是否包含该商品 以及位置
    const index = collect.findIndex(v=>v.goods_id===this.goodsInfo.goods_id);
    // 3. 是否存在
    if(index!==-1) {
      // 存在该商品
      collect.splice(index,1);
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true,
      });
    }else {
      // 不存在该商品
      collect.push(this.goodsInfo);
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true,
      });
    }
    // 4. 修改isCollect
    this.setData({
      isCollect: !this.data.isCollect
    });
    // 5. 存放回缓存中 放在最后一步，删除了或添加了都需要缓存
    wx.setStorageSync("collect", collect);
  }
})