// 同时发送异步请求的次数
let ajaxTimes = 0;
export const request = (params)=>{
  ajaxTimes++;
  // 显示加载中 效果
  wx.showLoading({
    title: "加载中",
    mask: true
  });

  // 定义公共的url
  let baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  // 图片上传到图床
  if(params.url==="http://images.ac.cn/api/upload") {
    baseUrl = '';
  }
  
  return new Promise((resolve, reject)=> {
    var reqTask = wx.request({
      ...params,
      url:baseUrl + params.url,
      success: (result)=>{
        resolve(result.data.message);
      },
      fail: (err)=>{
        reject(err);
      },
      complete: ()=>{
        ajaxTimes--;
        if(ajaxTimes===0) {
          wx.hideLoading();
        }
      }
    });
  });
}