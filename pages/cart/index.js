import { getSetting, openSetting, chooseAddress, showModal } from "../../utils/asyncWx";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },

  onShow: function () {
    // 获取收货地址
    const address = wx.getStorageSync("address");
    // 获取购物车数组 有可能为空数组
    const cart = wx.getStorageSync("cart")||[];
    this.setData({address});
    this.setCart(cart);
  },
  // 获取地址api
  async handleChooseAddress() {
    // 1. 获取状态
    const res1 = await getSetting();
    const scopeAddress = res1.authSetting["scope.address"];
    // 2. 判断权限状态
    try {
      if(scopeAddress===false) {
        await openSetting();
      }
      // 3. 获取地址
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      // 4. 存入缓存中
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log("");
    }
  },
  // 选中状态实现
  handleItemChange(e) {
    // 1.获取id
    const {id} = e.currentTarget.dataset;
    // 2.获取被修改的对象
    let {cart} = this.data;
    // 3.找到要修改的对象
    let index=cart.findIndex(v=>v.goods_id===id);
    // 4.状态取反
    cart[index].checked=!cart[index].checked;
    // 5. 将数组 重新设置回data中和缓存中
    this.setData({cart});
    this.setCart(cart);
  },
  // 全选 反选
  handleAllChange() {
    // let {cart} = this.data;
    // let {allChecked} = this.data;
    // 整合以上
    let {cart, allChecked} = this.data;
    allChecked = !allChecked;
    cart.forEach(v=>v.checked=allChecked);
    this.setCart(cart);
  },
  // 商品数量编辑
  async handleNumChange(e) {
    let {id, operation} = e.currentTarget.dataset;
    let {cart} = this.data;
    const index = cart.findIndex(v=>v.goods_id===id);
    // 是否删除 弹窗提示
    if(cart[index].num===1&&operation===-1) {
      const result = await showModal({content:"是否要删除？"});
      if(result.confirm){
        cart.splice(index, 1);
        this.setCart(cart);
      }
    }else {
      // 不删除
      cart[index].num += operation;
      this.setCart(cart);
    }
  },
  // 将总价格 总数量 全选 购物车 设置（重新设置），缓存购物车数据
  setCart(cart) {
    // every 数组遍历 所有为true则返回true，否则返回false，并且不再循环执行
    // 空数组调用 every方法 返回值为true
    // const allChecked = cart.length?cart.every(v=>v.checked):false;//并入到foreach中
    // 总价格，总数量
    let allChecked = true;
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {
      if(v.checked) {
        totalPrice += v.goods_price*v.num;
        totalNum += v.num;
      }else {
        allChecked = false;
      }
    });
    // 判断数组是否为空
    allChecked = cart.length!=0?allChecked:false;
    this.setData({
      cart,
      allChecked,
      totalPrice,
      totalNum
    });
    wx.setStorageSync("cart", cart);
  }
})