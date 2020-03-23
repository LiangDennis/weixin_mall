/**
 * 1. 点击 “+” 触发点击事件
 *  1. 调用小程序的内置 选择图片的api
 *  2. 获取到 图片的路径 数组
 *  3. 把图片路径存入 data 变量中
 *  4. 页面就可以根据 图片数组 进行循环展示 自定义组件
 * 2. 点击 自定义组件
 *  1. 获取被点击的元素的索引
 *  2. 获取data 中的图片数组
 *  3. 根据索引 删除数组中对应的元素
 *  4. 把数组重新设置会data中
 * 
 * 3. 点击 提交 反馈内容
 *  1. 获取文本域的内容
 *    1. data 中定义变量 表示 输入框内容
 *    2. 文本域 绑定 输入事件 事件触发的时候 把输入框的值 设置会data变量中
 *  2. 合法性验证
 *  3. 验证通过 用户选择的图片 上传到专门的图片的服务器 返回图片外网的链接 前端模拟
 *    1. 遍历图片数组
 *    2. 挨个上传
 *    3. 自己再维护数组 存放 图片上传后的外网链接
 *  4. 文本域 和 外网的图片的路径 一起提交到服务器
 *  5. 清空当前页面
 */
import { showModal, showToast } from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { request } from "../../request/index.js";

Page({

  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品/商家投诉',
        isActive: false
      },
    ],
    chooseImgs: [],
    textareaValue: '1'
  },
  // 外网图片数组
  UploadImgs: [],
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
  // 点击 “+” 选择图片
  handleChooseImage() {
    // 1. 小程序内置api
    wx.chooseImage({
      // 同时选中图片的数量
      count: 9,
      // 图片的格式 原图 压缩
      sizeType: ['original','compressed'],
      // 图片的来源 相册 照相机
      sourceType: ['album','camera'],
      success: (result)=>{
        
        // 图片数组，拼接
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        });
      },
    });
  },
  // 点击 删除 图片
  async handleRevomeImg(e) {
    // 弹窗提示
    const {confirm} = await showModal({content: '是否删除图片'});
    if(confirm) {
      // 1. 删除图片 获取图片索引
      const {index} = e.detail;
      console.log(index);
      
      // 2. 获取图片数组
      // let chooseImgs = this.data.chooseImgs;
      let {chooseImgs} = this.data;
      chooseImgs.splice(index, 1);
      // 3. 重新设置 data
      this.setData({
        chooseImgs
      });
      // 4. 最后才await提醒, 否则会提前结束
      await showToast({title: "删除成功"});
    }
  },
  // 点击 图片预览
  handleImgPreview(e) {
    const {index} = e.detail;
    const {chooseImgs} = this.data;
    wx.previewImage({
      // 当前图片
      current: chooseImgs[index],
      // 图片组
      urls: chooseImgs
    });
  },
  // 输入框 输入
  hanldeTextInput (e) {
    this.setData({
      textareaValue: e.detail.value
    });
  },
  // 点击提交
  hanldeSubmit() {},
})