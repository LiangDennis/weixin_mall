import { request } from "../../request/index.js";
// pages/category/index.js
Page({

  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 点击态
    currentIndex: 0,
    // 右侧内容的滚动条距离顶部的距离
    scrollTop: 0,
  },
  Cates:[],

  onLoad: function (options) {
    /**
     * 1. 先判断本地存储是否有数据
     * 2. 没有数据，发送新请求获取数据
     * 3. 假如有数据，***同时，数据没有过期，那么就使用缓存的数据
     */
    const Cates = wx.getStorageSync("cates");
    if(!Cates) {
      this.getCates();
    }else {
      // 有旧的数据 定义过期时间 5分钟1000*60*5 测试10s
      if(Date.now() - Cates.time>1000*60*5) {
        // 重新发请求
        this.getCates();
      }else {
        // 可以使用旧的数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map(v=>v.cat_name);
        // 构造右边的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        });
      }
    }
  },

  // 获取分类数据
  getCates() {
    request({url: 'https://api-hmugo-web.itheima.net/api/public/v1/categories'}).then(res=> {
      this.Cates = res.data.message;

      // 缓存数据 存入本地存储
      wx.setStorageSync("cates", {time:Date.now(), data:this.Cates});

      // 构造左边的菜单数据
      let leftMenuList = this.Cates.map(v=>v.cat_name);
      // 构造右边的商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent
      });
    });
  },
  // 左侧菜单栏的点击事件
  handleItemTap(e) {
    /**
     * 1.获取到点击事件的索引值
     * 2.将索引值设置currentIndex
     * 3.根据不同的索引来渲染右侧商品内容
     * 4.上面的初始化阶段也不用删除
     */
    // 熟练使用ES6的方式获取数据
    const {index} = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent,
      // 重新设置 右侧内容的scroll-view距离顶部的距离
      scrollTop:0
    });

  },
})