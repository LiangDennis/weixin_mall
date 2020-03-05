## 优购项目实战

#### 技术选型
  1.腾讯的 wepy       类似vue
  2.美团的 mpvue      类似vue
  3.京东的 taro       类似react
  4.滴滴的 chameleon  
  5.uni-app          类似vue
  由于小程序还不是很稳定，还处于快速迭代当中，所以使用原生的小程序框架，小程序的框架叫MINA

#### 借鉴文档的编排方式

#### 目录结构
  styles 存放公共样式
  component 存放组件
  lib 存放第三方库
  utils 自己的帮助库
  request 自己的接口帮助库

#### 页面
  首页 index
  分类页面 category
  商品列表页面 goods_list
  商品详情页面 goods_detail
  购物车页面 cart
  收藏页面 collect
  订单页面 order
  搜索页面 search
  个人中心页面 user
  意见反馈页面 feedback
  登录页面 login
  授权页面 auth
  结算页面 pay
  
  采用列式编程取出里面的英文复制在json中，同时在小程序工具中的app.json文件中“空格，保存”让小程序工具自动生成页面

#### 字体图标
  在阿里图标库中寻找代码--添加至项目--生成在线地址--打开地址--复制代码--在styles中创建图标样式--在app.wxss中全局引入
  需要注意的是这些字体图标都是存在了外网上，而不是本地图标

#### 搭建tabbar页面

#### 初始化页面样式
  微信不识别通配符*
  主体颜色
    1.less 中存在变量
    2.原生的css和wxss都支持变量
  统一字体
  统一title

  #### 首页
    1.获取轮播图数据
    2.轮播图swiper和swiper-item的使用
    3.this.setData({swiperList: res})的使用
    4.域名校验的修改，同时在小程序后台修改
    5.轮播图的html结构
    6.swiper标签默认宽度和高度
      100% * 150px
      图片标签宽度和高度
      320px * 240px
      设计图和轮播图
      1. 先看一下原图的宽高 750 * 340
      2. 让图片高度自适应 宽度等于100%
      3. 让swiper标签的高度变成和图片一样高，否则当页面发生变化时，swiper大小仍然是150px
      4. 由于750rpx也是小程序的100%的宽度，所以可以根据750这个数值宽度进行等比例转换。
   
#### 优化请求，promise实现，最终实现async await
  1.  export const request = (params)=>{
        return new Promise((resolve, reject)=> {
          var reqTask = wx.request({
            ...params,
            success: (result)=>{
              resolve(result);
            },
            fail: (err)=>{
              reject(err);
            }
          });
        });
      }

#### 导航数据

#### 楼层数据
  1. wx:for绑定的wx:key值必须是一个确定的值，不能是一个对象，而且还要不同
  2. 楼层样式
     1. 使用&:nth-last-child(-n+4)表示从后面往前面取，去后四个标签
     2. 使用less的计算计算出后四个image的高度
     3. 子组件使用浮动，父组件应该清除浮动，可用overflow：hidden的方式简单清除浮动
     4. 总结：善于利用less的计算方式，善于利用nth-child的使用即css3的使用，同时要根据一个原图的宽高进行计算

#### 分类页面
  1. 分成三个步骤实现：UI与数据的对应关系，点击切换效果，优化：缓存
  2. 数据的获取，在data外创建一个变量，将异步获取到的数据存放在这个变量中。
  3. 熟练使用数组的方法，map获取到具体的值
  4. 页面的布局方式，page高度的设置以及calc()的使用
  5. less配合calc的使用需要使用~号
  6. 父元素设置了伸缩盒子，那么其子项的高度默认是100%
  7. scroll-view的使用 scroll-x，scroll-y属性
  8. 100% 的设置是不让page的内容过长而产生滚动，而是在scroll-view中才产生滚动
  9. for循环中使用只是一个一维的字符串数组的数据时，可以使用wx:key="*this"绑定key值的方式
  10. 右边分类中的头部设置其高度为左边一个菜单的高度，这里强调的是注意设计稿
  11. 右边分类中的内容（非头部）使用flex布局和flex-wrap：wrap设置成换行
  12. 同时将里面的内容设置成可以点击的元素navigator，宽度为33.33%
  13. 点击切换
      1. 创建一个active类，active类中有一个border-left: 5rpx solid currentColor;其中currentColor代表当前字体的颜色，可以建立一个重点突出的样式结构。
      2. 在js中再创建一个currentIndex，当这个currentIndex===index时使用这个类样式
      3. 绑定点击事件，并且通过data-index的方式传递参数，熟练使用ES6的方式获取dataset中的数据，如：const index = e.currentTarget.dataset;并且使用const还是let都很有讲究
      4. 点击事件的流程
         1. 获取到点击事件的索引值
         2. 将索引值设置currentIndex
         3. 根据不同的索引来渲染右侧商品内容
         4. 上面的初始化阶段也不用删除
  14. 商品数据的缓存效果
      1.  为什么？因为接口返回的数据量太大，为了优化用户体验，所以就要做一个缓存效果。
      2.  思路：
          1.  在打开页面的时候，做一个判断，判断本地存储中有没有旧的数据
          2.  如果没有就发送新请求
          3.  假如有旧的数据，并且旧的数据没有过期，此时就使用本地存储中的旧数据
      3. 怎么存储呢？
         1. 数据格式：{time:Date.now(),data[...]}
         2. new Date()获取的是一种格式的时间，Date.now()获取的是时间戳
         3. 小程序的本地存储技术：wx.getStorageSync("key")
         4. web端的本地存储和小程序的本地存储的区别
            1. 写的方式不一样，web端是localStorage.setItem(key,value),localStorage.getItem(key);小程序是,wx-setStorageSync(key,value),wx-getStorageSync(key);
            2. ***web端不论存入的是什么类型的数据，最终都会先调用一下toString()方法，把数据变成字符串再存入进去
            3. ***小程序不存在类型转换的这个操作的，存什么类型的数据，获取的时候就是什么类型。
  15. 在当前菜单的内容区拉到最后，点击另一个菜单时，内容区没有回到最上面。
      1.  使用scroll-view标签中的scroll-top属性可以快速实现需求
      2.  同时使用变量scrollTop管理scroll-top的值
      3.  当点击事件发生的时候设置scrollTop的值为0
      4.  注意，直接给scroll-top设置为固定值是不会起作用的。

#### 优化接口代码 提取公共接口路径 使用async，await 将res.data.message提取出来
  1. 在request中定义公共接口路径
  2. 修改页面请求接口的路径
  3. 在请求前拼接路径
  4. 使用async，await语法
     1. 勾选ES6转ES5
     2. 下载 https://github.com/LiangDennis/regenerator/blob/master/packages/regenerator-runtime/runtime.js
     3. 在小程序中创建新文件夹lib/runtime/runtime.js
     4. 在使用async的页面的js文件中都引入（不能全局引入）：import regeneratorRuntime from '../../lib/runtime/runtime.js'
     5. 删除runtime中最后的try-catch块
     6. 注意：在一些老机型中有可能不起作用

#### 小程序编译模式的使用
  1. 可以对特定的页面使用编译模式，提高开发效率
  2. 编译时候还可以设定参数

#### 一些在vscode上使用快速生成css的用法，会有提示，直接enter
  1. d:flex --- display: flex;
  2. jc:cen --- justify-content: center;
  3. ai:cen --- align-items: center;

#### 商品列表页面
  1. 在商品分类中跳转，在navigator中使用url="/pages/goods_list/index?cid={{item.cat_id}}"的方式跳转并传递cid参数
  2. 在onload的生命周期方法中使用其定义的参数options可以获取到传递的数据
  3. 实现
     1. 自定义组件
        1. 自定义tabs组件
        2. 定义样式类和并获取从父组件传递过来的值，父组件传值方式tabs="{{tabs}}"
        3. 定义点击事件bindtap="handleItemTap"，设置参数data-index="{{index}}"
        4. 组件js中的方法获取索引值e.currentTarget.dataset
        5. 触发父组件的事件 自定义，this.triggerEvent("eventName",{data});
        6. 父组件中通过bindeventName的方式自定义一个方法
        7. 这个方法中index在e.detail中
        8. 缓存data中的tabs数据方式：let {tabs} = this.data;使用foreach的方式设置isActive的值，最后setdata
        9. 插槽
           1.  在子组件中使用slot标签
           2.  在父组件中使用block标签和wx:if,wx:elif的方式定义不同的区域
        10. 内容过长时使用省略符号表示
            1.  display: -webkit-box;
                overflow: hidden;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
     2. 上拉加载，下拉刷新

