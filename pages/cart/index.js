// pages/cart/index.js
Page({
  data: {

  },

  onLoad: function (options) {

  },
  // 获取地址
  handleChooseAddress() {
    // 直接调用获取地址时，当用户点击取消时 是无法再次获取地址权限了
    // wx.chooseAddress({
    //   success: (result)=>{
    //     console.log(result);
    //   },
    // });
    wx.getSetting({
      success: (result)=>{
        // 1. 判断scope值
        const scopeAddress = result.authSetting["scope.address"];
        if(scopeAddress===true||scopeAddress===undefined) {
          // 值为 true 或者undefined
          wx.chooseAddress({
            success: (result)=>{
              console.log(result);
            }
          });
        }else {
          // 值为false 用户 以前拒绝过授予权限 先诱导用户打开授权页面
          wx.openSetting({
            success: (result)=>{
              wx.chooseAddress({
                success: (result)=>{
                  console.log(result);
                }
              });
            }
          });
        }
      },
    });
  }
})