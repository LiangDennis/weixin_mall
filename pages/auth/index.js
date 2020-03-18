// pages/auth/index.js
import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { login } from "../../utils/asyncWx.js";

Page({
  async handleGetUserInfo(e) {
    try {
      // 1. 获取用户信息
      const {encryptedData, iv, rawData, signature} = e.detail;
      // 2. 获取小程序登录成功后的code
      const {code} = await login();
      //3. 发送请求， 获取token, 如果不是企业账号是不能够成功的
      const loginParams = {encryptedData, iv, rawData, signature, code};
      // const res = await request({url: '/users/wxlogin', data: loginParams, method:'post'})
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.warn(error);
    }
  },
})