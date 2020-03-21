// pages/search/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    // 是否展示取消按钮
    showBtn: false,
    inputValue: ''
  },
  // 定时器 节流
  timeId: -1,
  // 搜索框
  handleInput(e) {
    // 1. 获取值
    const {value} = e.detail;
    // 2. 合法性校验
    if(!value.trim()) {
      this.setData({
        showBtn: false,
        goods: []
      });
      return;
    }
    // 3. 发送请求
    this.setData({
      showBtn: true
    });
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      this.qsearch(value);
    }, 1000);
  },
  // 点击清除
  handleColse() {
    this.setData({
      inputValue: '',
      showBtn: false,
      goods: []
    });
  },
  // 发送请求
  async qsearch(query) {
    const res = await request({url: '/goods/qsearch', data:{query}});
    this.setData({
      goods: res
    });
  }
})