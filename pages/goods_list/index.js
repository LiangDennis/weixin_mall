
/**
 * 1. 上拉加载 商品列表js的逻辑
      1. 找到滚动条触底事件
      2. 判断还有没有下一页数据
      3. 假如没有下一页数据 弹出一个提示框
      4. 假如还有下一页数据 加载下一页数据
 */
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
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
    ],
    goodsList:[]
  },
  // 构造接口数据
  QueryParams: {
    query: '',
    cid: '',
    pagenum: 1,
    pagesize: 10,
  },
  // 总页数
  totalPage: 1,

  onLoad: function (options) {
    this.QueryParams.cid = options.cid;
    this.getGoodsList();
  },

  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({url:"/goods/search",data:this.QueryParams});
    // 获取总条数
    const total = res.total;
    // 计算总页数
    this.totalPage = Math.ceil(total / this.QueryParams.pagesize);
    this.setData({
      // 拼接数据
      goodsList:[...this.data.goodsList,...res.goods]
    });

    // 关闭刷新窗口，没有调用下拉刷新的窗口，也不会报错
    wx.stopPullDownRefresh();
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
  },

  // 滚动条触底事件
  onReachBottom() {
    // 1.判断还有没有下一页数据
    if(this.QueryParams.pagenum>=this.totalPage) {
      // 没有下一页数据
      wx.showToast({title: '没有数据了哦'});
    } else {
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  // 下拉刷新事件
  onPullDownRefresh() {
    // 1.重置数据
    this.setData({
      goodsList:[]
    });
    // 2.重置页码
    this.QueryParams.pagenum = 1;
    // 3.重新请求
    this.getGoodsList();
  },
})